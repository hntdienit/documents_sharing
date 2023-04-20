import sequelize from "../config/db.js";
import { Op } from "sequelize";

import createError from "../utils/createError.js";

import Documents from "../models/document.model.js";
import Users from "../models/user.model.js";

export const newDocument = async (req, res, next) => {
  try {
    let data;
    if (req.body.Cong_Khai == "true") {
      if (req.body.LopHP == "true") {
        data = {
          Ten_tai_lieu: req.body.Ten_tai_lieu,
          Mo_ta_tai_lieu: req.body.Mo_ta_tai_lieu,
          Url: `${req.protocol}://${req.get("host")}/files/${req.files[0].filename}`,
          Cong_khai: true,
          Lop_hoc_phan_id: req.body.LopHPId,
          Nguoi_dung_id: req.user.id,
        };
      } else {
        data = {
          Ten_tai_lieu: req.body.Ten_tai_lieu,
          Mo_ta_tai_lieu: req.body.Mo_ta_tai_lieu,
          Url: `${req.protocol}://${req.get("host")}/files/${req.files[0].filename}`,
          Cong_khai: true,
          Lop_hoc_phan_id: null,
          Nguoi_dung_id: req.user.id,
        };
      }
    } else {
      data = {
        Ten_tai_lieu: req.body.Ten_tai_lieu,
        Mo_ta_tai_lieu: req.body.Mo_ta_tai_lieu,
        Url: `${req.protocol}://${req.get("host")}/files/${req.files[0].filename}`,
        Cong_khai: false,
        Lop_hoc_phan_id: req.body.LopHPId,
        Nguoi_dung_id: req.user.id,
      };
    }

    const newDocument = new Documents(data);

    const saveDocument = await newDocument.save();
    res.status(201).json(saveDocument);
  } catch (err) {
    next(err);
  }
};

export const pagination = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.keyword || "";
    const offset = limit * page;
    const totalRows = await Documents.count({
      where: {
        [Op.or]: [
          {
            Ten_tai_lieu: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            Mo_ta_tai_lieu: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });

    const totalPage = Math.ceil(totalRows / limit);
    const result = await Documents.findAll({
      where: {
        [Op.or]: [
          {
            Ten_tai_lieu: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            Mo_ta_tai_lieu: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });

    res.json({
      result: result,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (err) {
    next(err);
  }
};

export const singleDocument = async (req, res, next) => {
  try {
    const document = await Documents.findByPk(req.params.id);
    const userDocument = await Users.findByPk(document.Nguoi_dung_id);
    if (!document) {
      return next(createError(404, "Tài liệu bạn tìm không tồn tại!"));
    }
    if (!userDocument) {
      return next(createError(404, "Thông tin chủ sở hữu không tồn tại!"));
    }
    const singledocument = {
      Tai_lieu: document,
      Nguoi_dung: {
        Ho_ten: userDocument.Ho_ten,
      },
    };
    res.status(200).json(singledocument);
  } catch (err) {
    next(err);
  }
};

export const editDocument = async (req, res, next) => {
  try {
    await Documents.update(
      {
        Ten_tai_lieu: req.body.Ten_tai_lieu,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.status(201).json("sua thanh cong");
  } catch (err) {
    next(err);
  }
};

export const deleteDocument = async (req, res, next) => {
  try {
    await Documents.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(201).json("xoa thanh cong");
  } catch (err) {
    next(err);
  }
};
