import sequelize from "../config/db.js";
import { Op } from "sequelize";

import { vnpay } from "../config/vnpay.js";
import dateFormat from "dateformat";
import sortObject from "../utils/sortObject.js";
import querystring from "qs";
import crypto from "crypto";
import createError from "../utils/createError.js";

import Order from "../models/order.model.js";
import CartDetails from "../models/cartdetail.model.js";
import Documents from "../models/document.model.js";
import PaymentMethod from "../models/paymentmethod.model.js";
import OrderDetails from "../models/orderdetail.model.js";

function deleteZombieOrder(orderId) {
  setTimeout(async function () {
    const findOrder = await Order.findOne({ where: { Ma_don_hang: orderId, Trang_thai_thanh_toan: 0 } });
    if (findOrder) {
      await OrderDetails.destroy({ where: { Don_hang_id: findOrder.id } });
      await Order.destroy({ where: { Ma_don_hang: orderId, Trang_thai_thanh_toan: 0 } });
    }
  }, 2 * 60 * 1000);
}

export const postCheckout = async (req, res, next) => {
  try {
    const tt = await PaymentMethod.findOne({
      where: {
        Ma_phuong_thuc_thanh_toan: req.body.Phuong_thuc_thanh_toan,
      },
    });

    const userOrder = await Order.create({
      Ma_don_hang: 462342,
      Tong_don_hang: req.body.Tong_don_hang,
      Dia_chi_nhan_hang: req.body.Dia_chi_nhan_hang,
      Trang_thai_thanh_toan: 0,
      Nguoi_dung_id: req.user.id,
      Phuong_thuc_thanh_toan_id: tt.id,
    });

    const userCartItem = await CartDetails.findAll({
      where: { Nguoi_dung_id: req.user.id },
      required: false,
      include: [{ model: Documents }],
    });

    if (userOrder) {
      userCartItem.map(async (item) => {
        await OrderDetails.create({
          So_luong: item.So_luong,
          Gia: item.Tai_lieu.Gia,
          Don_hang_id: userOrder.id,
          Tai_lieu_id: item.Tai_lieu_id,
        });
        await CartDetails.destroy({ where: { id: item.id } });
        const thisDocumentDetails = await Documents.findOne({ where: { id: item.Tai_lieu_id } });
        await thisDocumentDetails.update({ So_luong: thisDocumentDetails.So_luong - item.So_luong });
      });
    }
    return res.status(200).json();
  } catch (err) {
    next(err);
  }
};

export const createvnpay = async (req, res, next) => {
  var ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  var tmnCode = vnpay.vnp_TmnCode;
  var secretKey = vnpay.vnp_HashSecret;
  var vnpUrl = vnpay.vnp_Url;
  var returnUrl = vnpay.vnp_ReturnUrl;

  var date = new Date();
  var createDate = dateFormat(date, "yyyymmddHHMMss");
  var orderId = dateFormat(date, "HHMMss");
  var amount = req.body.amount;
  var bankCode = req.body.bankCode;

  var orderInfo = req.body.orderDescription;
  var orderType = req.body.orderType;
  var locale = req.body.language;
  if (locale === null || locale === "") {
    locale = "vn";
  }
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_OrderType"] = orderType;
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  var signData = querystring.stringify(vnp_Params, { encode: false });
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  const tt = await PaymentMethod.findOne({
    where: {
      Ma_phuong_thuc_thanh_toan: req.body.Phuong_thuc_thanh_toan,
    },
  });

  const userOrder = await Order.create({
    Ma_don_hang: orderId,
    Tong_don_hang: req.body.Tong_don_hang,
    Dia_chi_nhan_hang: req.body.Dia_chi_nhan_hang,
    Trang_thai_thanh_toan: 0,
    Nguoi_dung_id: req.user.id,
    Phuong_thuc_thanh_toan_id: tt.id,
  });

  deleteZombieOrder(orderId);

  const userCartItem = await CartDetails.findAll({
    where: { Nguoi_dung_id: req.user.id },
    required: false,
    include: [{ model: Documents }],
  });

  if (userOrder) {
    userCartItem.map(async (item) => {
      await OrderDetails.create({
        So_luong: item.So_luong,
        Gia: item.Tai_lieu.Gia,
        Don_hang_id: userOrder.id,
        Tai_lieu_id: item.Tai_lieu_id,
      });
      await CartDetails.destroy({ where: { id: item.id } });
      // const thisDocumentDetails = await Documents.findByPk(item.Tai_lieu_id);
      // await thisDocumentDetails.update({ So_luong: thisDocumentDetails.So_luong - item.So_luong });
    });
  }

  res.json({ success: true, url: vnpUrl });
};

export const vnpay_ipn = async (req, res, next) => {
  var vnp_Params = req.query;
  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  var secretKey = vnpay.vnp_HashSecret;
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    var orderId = vnp_Params["vnp_TxnRef"];
    var rspCode = vnp_Params["vnp_ResponseCode"];
    const findOrder = await Order.findOne({ where: { Ma_don_hang: orderId, Trang_thai_thanh_toan: 0 } });
    if (findOrder) {
      const orderDetail = await OrderDetails.findAll({
        where: { Don_hang_id: findOrder.id },
      });
      await Order.update({ Trang_thai_thanh_toan: 1 }, { where: { Ma_don_hang: orderId } });

      if (orderDetail) {
        orderDetail.map(async (item) => {
          const thisDocumentDetails = await Documents.findByPk(item.Tai_lieu_id);
          await thisDocumentDetails.update({ So_luong: thisDocumentDetails.So_luong - item.So_luong });
        });
      }
    }

    if (rspCode !== "00") return res.redirect("http://localhost:5173");

    return res.redirect("http://localhost:5173/");
  } else {
    res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
  }
};

export const vnpay_return = async (req, res, next) => {
  var vnp_Params = req.query;
  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  var tmnCode = vnpay.vnp_TmnCode;
  var secretKey = vnpay.vnp_HashSecret;

  var signData = querystring.stringify(vnp_Params, { encode: false });
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
    res.json("success", { code: vnp_Params["vnp_ResponseCode"] });
  } else {
    res.json("success", { code: "97" });
  }
};