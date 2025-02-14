"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Nguoi_dungs", [
      {
        Email: "admin@gmail.com",
        Mat_khau: "$2b$05$onCUDPjiyN3jbwk/mIx1VOtZDzxM76G6tNgXxVrYt.cR/TG1Rxw9W",
        Ho_ten: "Nguyen Quan Trị",
        Dia_chi: "Cần Thơ",
        Gioi_tinh: "Nam",
        CCCD: "089021000876",
        So_dien_thoai: "0399384673",
        Vai_tro: "QuanTri",
        Quyen_su_dung: "1",
        Email_da_xac_thuc: "1",
        Ma_xac_thuc_email: "123456",
        Lop_id: null,
      },
      // giang vien
      {
        Email: "nngvinh@gmail.com",
        Mat_khau: "$2b$05$onCUDPjiyN3jbwk/mIx1VOtZDzxM76G6tNgXxVrYt.cR/TG1Rxw9W",
        Ho_ten: "Nguyễn Nhị Gia Vinh",
        Dia_chi: "Cần Thơ",
        Gioi_tinh: "Nam",
        CCCD: "089021000876",
        So_dien_thoai: "0399323794",
        Vai_tro: "GiangVien",
        Quyen_su_dung: "1",
        Email_da_xac_thuc: "1",
        Ma_xac_thuc_email: "123456",
        Lop_id: null,
      },
      {
        Email: "hmtri@gmail.com",
        Mat_khau: "$2b$05$onCUDPjiyN3jbwk/mIx1VOtZDzxM76G6tNgXxVrYt.cR/TG1Rxw9W",
        Ho_ten: "Hoàng Minh Trí",
        Dia_chi: "Cần Thơ",
        Gioi_tinh: "Nam",
        CCCD: "089021000876",
        So_dien_thoai: "0399309873",
        Vai_tro: "GiangVien",
        Quyen_su_dung: "1",
        Email_da_xac_thuc: "1",
        Ma_xac_thuc_email: "123456",
        Lop_id: null,
      },
      {
        Email: "ltdiem@gmail.com",
        Mat_khau: "$2b$05$onCUDPjiyN3jbwk/mIx1VOtZDzxM76G6tNgXxVrYt.cR/TG1Rxw9W",
        Ho_ten: "Lê Thị Diễm",
        Dia_chi: "Cần Thơ",
        Gioi_tinh: "Nữ",
        CCCD: "089021000876",
        So_dien_thoai: "0399301234",
        Vai_tro: "GiangVien",
        Quyen_su_dung: "1",
        Email_da_xac_thuc: "1",
        Ma_xac_thuc_email: "123456",
        Lop_id: null,
      },
      {
        Email: "hptoan@gmail.com",
        Mat_khau: "$2b$05$onCUDPjiyN3jbwk/mIx1VOtZDzxM76G6tNgXxVrYt.cR/TG1Rxw9W",
        Ho_ten: "Huỳnh Phụng Toàn",
        Dia_chi: "Cần Thơ",
        Gioi_tinh: "Nam",
        CCCD: "089021000876",
        So_dien_thoai: "0399301234",
        Vai_tro: "GiangVien",
        Quyen_su_dung: "1",
        Email_da_xac_thuc: "1",
        Ma_xac_thuc_email: "123456",
        Lop_id: null,
      },
      {
        Email: "hvtu@gmail.com",
        Mat_khau: "$2b$05$onCUDPjiyN3jbwk/mIx1VOtZDzxM76G6tNgXxVrYt.cR/TG1Rxw9W",
        Ho_ten: "Hồ Văn Tú",
        Dia_chi: "Cần Thơ",
        Gioi_tinh: "Nam",
        CCCD: "089021000876",
        So_dien_thoai: "0399346234",
        Vai_tro: "GiangVien",
        Quyen_su_dung: "1",
        Email_da_xac_thuc: "1",
        Ma_xac_thuc_email: "123456",
        Lop_id: null,
      },
      {
        Email: "pthngan@gmail.com",
        Mat_khau: "$2b$05$onCUDPjiyN3jbwk/mIx1VOtZDzxM76G6tNgXxVrYt.cR/TG1Rxw9W",
        Ho_ten: "Phạm Trương Hồng Ngân",
        Dia_chi: "Cần Thơ",
        Gioi_tinh: "Nam",
        CCCD: "089021000876",
        So_dien_thoai: "0399309876",
        Vai_tro: "GiangVien",
        Quyen_su_dung: "1",
        Email_da_xac_thuc: "1",
        Ma_xac_thuc_email: "123456",
        Lop_id: null,
      },
      {
        Email: "thviet@gmail.com",
        Mat_khau: "$2b$05$onCUDPjiyN3jbwk/mIx1VOtZDzxM76G6tNgXxVrYt.cR/TG1Rxw9W",
        Ho_ten: "Trần Hoàng Việt",
        Dia_chi: "Cần Thơ",
        Gioi_tinh: "Nam",
        CCCD: "089021000876",
        So_dien_thoai: "0399309123",
        Vai_tro: "GiangVien",
        Quyen_su_dung: "1",
        Email_da_xac_thuc: "1",
        Ma_xac_thuc_email: "123456",
        Lop_id: null,
      },
      // sinhvien
      {
        Email: "hntdienit@gmail.com",
        Mat_khau: "$2b$05$onCUDPjiyN3jbwk/mIx1VOtZDzxM76G6tNgXxVrYt.cR/TG1Rxw9W",
        Ho_ten: "Thanh Điền",
        Dia_chi: "Cần Thơ",
        Gioi_tinh: "Nam",
        CCCD: "089021000876",
        So_dien_thoai: "0399323794",
        Vai_tro: "SinhVien",
        Quyen_su_dung: "1",
        Email_da_xac_thuc: "1",
        Ma_xac_thuc_email: "123456",
        Lop_id: 1,
      },
      {
        Email: "dien060620010@gmail.com",
        Mat_khau: "$2b$05$onCUDPjiyN3jbwk/mIx1VOtZDzxM76G6tNgXxVrYt.cR/TG1Rxw9W",
        Ho_ten: "Việt Thắng",
        Dia_chi: "Cần Thơ",
        Gioi_tinh: "Nam",
        CCCD: "089021000876",
        So_dien_thoai: "0399323794",
        Vai_tro: "SinhVien",
        Quyen_su_dung: "1",
        Email_da_xac_thuc: "1",
        Ma_xac_thuc_email: "123456",
        Lop_id: 1,
      },
      {
        Email: "dienb1910055@student.ctu.edu.vn",
        Mat_khau: "$2b$05$onCUDPjiyN3jbwk/mIx1VOtZDzxM76G6tNgXxVrYt.cR/TG1Rxw9W",
        Ho_ten: "Hữu Đan",
        Dia_chi: "Cần Thơ",
        Gioi_tinh: "Nam",
        CCCD: "089021000876",
        So_dien_thoai: "0399323794",
        Vai_tro: "SinhVien",
        Quyen_su_dung: "1",
        Email_da_xac_thuc: "1",
        Ma_xac_thuc_email: "123456",
        Lop_id: 1,
      },
      {
        Email: "phi123@student.ctu.edu.vn",
        Mat_khau: "$2b$05$onCUDPjiyN3jbwk/mIx1VOtZDzxM76G6tNgXxVrYt.cR/TG1Rxw9W",
        Ho_ten: "Hoàng Phi",
        Dia_chi: "Cần Thơ",
        Gioi_tinh: "Nam",
        CCCD: "089021000876",
        So_dien_thoai: "0399323794",
        Vai_tro: "SinhVien",
        Quyen_su_dung: "1",
        Email_da_xac_thuc: "1",
        Ma_xac_thuc_email: "123456",
        Lop_id: 1,
      },
      {
        Email: "bao123@student.ctu.edu.vn",
        Mat_khau: "$2b$05$onCUDPjiyN3jbwk/mIx1VOtZDzxM76G6tNgXxVrYt.cR/TG1Rxw9W",
        Ho_ten: "Thiên Bảo",
        Dia_chi: "Cần Thơ",
        Gioi_tinh: "Nam",
        CCCD: "089021000876",
        So_dien_thoai: "0399323794",
        Vai_tro: "SinhVien",
        Quyen_su_dung: "1",
        Email_da_xac_thuc: "1",
        Ma_xac_thuc_email: "123456",
        Lop_id: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Nguoi_dungs", null, {});
  },
};
