"use strict";

const d = new Date();
const { faker } = require("@faker-js/faker");
const { Op } = require("sequelize");
const Models = require("../models");
const sequelize = Models.sequelize;
const transaksi = Models.t_transaksi;
const attachment = Models.t_attachment;
const anggota = Models.m_anggota;
const pinjam = Models.t_pinjam;
const simpan = Models.t_simpan;
const controller = {};
const { dltFile } = require("../helper/fileDelete");
const { number } = require("../helper/helper");

const isDone = async (id, jumlah) => {
  const data = await pinjam.findOne({ where: { id }, raw: true });
  console.log(data);
  if (parseFloat(data.jumlah) === parseFloat(jumlah) 
      || parseFloat(jumlah) >= parseFloat(data.jumlah) ) {
    return 1;
  } else {
    return 0;
  }
};

// getAll data transaksi
controller.getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const offside = limit * page;

    const config1 = {
      where: {
        [Op.or]: [{ anggota_id: { [Op.like]: `%${search}%` } }],
      },
    };
    const config2 = {
      ...config1,
      offset: offside,
      limit,
      order: [["id", "ASC"]],
      include: {
        model: anggota,
        as: "anggota",
        attributes: {
          exclude: ["id", "createdAt", "updatedAt", "is_active"],
        },
      },
    };

    const totalRows = await transaksi.count(config1);
    const totalPages = Math.ceil(totalRows / limit);

    const result = await transaksi.findAll(config2);

    if (result.length === 0) {
      throw { statusCode: 400, message: "Data transaksi tidak ditemukan" };
    }
    return res.status(200).json({
      status: "Success",
      message: "Data transaksi ditemukan",
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPages: totalPages,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

// post data transaksi
controller.post = async (req, res, next) => {
  let transaction;
  try {
    // membuat transaksi
    transaction = await sequelize.transaction();

    // mengambil data dari cookies dan mencari data anggota
    const email = req.user.data.email;
    const data = await anggota.findOne({ where: { email } });

    // jika data tidak ditemukan throw error
    if (!data) {
      if (req.file?.filename) await dltFile(req.file.filename);
      throw {
        statusCode: 400,
        message: "anggota tidak ditemukan, silahkan daftar terlebih dahulu",
      };
    }

    // console.log(data)
    const User = data.dataValues.nama;
    const no_transaksi = await number(transaksi, "T");

    const jumlah =  parseFloat(req.body.jumlah);

    // get data for post
    const reqData = {
      no_transaksi,
      anggota_id: parseInt(data.dataValues.id),
      pinjaman_id: parseInt(req.body.pinjaman_id) || null,
      jenis_simpanan_id: parseInt(req.body.jenis_simpanan_id) || null,
      jenis_transaksi_id: parseInt(req.body.jenis_transaksi_id),
      bank_id: parseInt(req.body.bank_id),
      tanggal_transaksi: d.toLocaleDateString("en-CA"),
      jumlah,
      created_by: User,
      updated_by: User,
    };

    // jika jenis transaksi adalah pengembalian
    if(reqData.jenis_transaksi_id === 2){
      reqData.jenis_simpanan_id = null;
      // check is_approve true to next payment
      const isA = await pinjam.findOne({where: {id:reqData.pinjaman_id}})
      console.log(isA.is_approve);
      if(isA) if(!isA.dataValues.is_approve) throw {statusCode: 400, message: `Belum bisa melakukan transaksi pinjaman id ${reqData.pinjaman_id} belum di setujui`};

      const sumJumlah = parseFloat( await transaksi.sum('jumlah', {where: {pinjaman_id: reqData.pinjaman_id}}) ) + jumlah;
      console.log(parseFloat( await transaksi.sum('jumlah', {where: {pinjaman_id: reqData.pinjaman_id}}) ) );
      console.log(sumJumlah);
      // check is_done t_pinjaman
      const is_done = await isDone(reqData.pinjaman_id, sumJumlah);
      console.log(`is_done ${is_done}`)

      if(is_done) await pinjam.update({is_done},{where: {id:reqData.pinjaman_id}, transaction})
    }

    // jika jenis transaksi adalah penarikan
    if(reqData.jenis_transaksi_id === 1){
      reqData.pinjaman_id = null;
      
      // check saldo simpanan 
      const saldo = await simpan.sum('jumlah', {
        where: {
          jenis_simpanan_id: reqData.jenis_simpanan_id,
          anggota_id: reqData.anggota_id,
          is_done: 1,
        }
      });

      if (reqData.jumlah > saldo){
        throw {statusCode: 400, message: 'Saldo kamu tidak mencukupi untuk melakukan penarikan', payload:saldo}
      }

    }

    const result = await transaksi.create(reqData, { transaction });

    // reqData for photo
    const photo = {
      file_name: req.file.filename,
      refrence_table: "transaksi",
      refrence_id: result.dataValues.id,
      anggota_id: reqData.anggota_id,
    };
    const savePhoto = await attachment.create(photo, { transaction });

    if (!result) {
      if (req.file?.filename) await dltFile(req.file.filename);
      throw { statusCode: 400, message: "Gagal menambah transaksi baru" };
    }

    await transaction.commit();

    return res.status(201).json({
      status: "Success",
      message: "Berhasil menambah transaksi baru",
      data: result.dataValues,
    });
  } catch (e) {
    if (transaction) {
      if (req.file?.filename) await dltFile(req.file.filename);
      await transaction.rollback();
      next(e);
    }
  }
};

// edit data transaksi
controller.edit = async (req, res, next) => {
  let transaction;
  try {
    const { id } = req.params;

    transaction = await sequelize.transaction();

    const email = req.user.data.email;
    const data = await anggota.findOne({ where: { email } });
    // jika data tidak ditemukan throw error
    if (!data)
      throw {
        statusCode: 400,
        message: "anggota tidak ditemukan, silahkan daftar terlebih dahulu",
      };

    const User = data.dataValues.nama;
    const jumlah =  parseFloat(req.body.jumlah);

    // mencari data lama
    const old = await transaksi.findOne({ where: { id } });

    if (!old)
      throw {
        statusCode: 400,
        message: "Data tidak ditemukan masukan id yang benar",
      };
    const refrence_id = old.dataValues.id;

    // mencari data t_attachment
    const srcData = await attachment.findOne({
      where: {
        [Op.and]: [{ refrence_id }, { refrence_table: "transaksi" }],
      },
    });
    if (!srcData)
      throw { statusCode: 400, message: "attachment tidak ditemukan" };
    console.log(srcData);

    // get data for edit
    const reqData = {
      jenis_transaksi_id: req.body.jenis_transaksi_id,
      bank_id: req.body.bank_id,
      tanggal_transaksi: d.toLocaleDateString("en-CA"),
      jumlah,
      updated_by: User,
    };

    // jika jenis transaksi adalah pengembalian
    if(reqData.jenis_transaksi_id === 2){
      // check is_approve true to next payment
      const isA = await pinjam.findOne({where: {id:reqData.pinjaman_id}})
      if(isA) if(!isA.dataValues.is_approve) throw {statusCode: 400, message: `Belum bisa melakukan transaksi pinjaman id ${reqData.pinjaman_id} belum di setujui`};


      // check is_done t_pinjaman
      const is_done = await isDone(reqData.pinjaman_id, jumlah);
      console.log(`is_done ${is_done}`)

      if(is_done) await pinjam.update({is_done},{where: {id:reqData.pinjaman_id}, transaction})
    }

    // update transaksi
    const [terupdate] = await transaksi.update(
      reqData,
      { where: { id } },
      { transaction }
    );
    if (!terupdate)
      throw {
        statusCode: 400,
        message: "Gagal menupdate data silahkan cek id nya terlebih dahulu",
      };

    // cek apakah file update ditambahkan atau tidak
    if (req.file?.filename) {
      const photo = {
        file_name: req.file.filename,
        refrence_table: "transaksi",
        refrence_id,
        anggota_id: old.dataValues.anggota_id,
      };

      // update t_attachment
      const [updatedRows] = await attachment.update(
        photo,
        {
          where: {
            [Op.and]: [
              { refrence_id },
              { refrence_table: photo.refrence_table },
            ],
          },
        },
        { transaction }
      );
      if (!updatedRows)
        throw { statusCode: 400, message: "Gagal mengupdate data attachment" };

      // menghapus file pada src
      await dltFile(srcData.dataValues.file_name);
    }

    // commit transaction
    await transaction.commit();

    return res.status(200).json({
      status: "Success",
      message: "Berhasil mengupdate data transaksi",
      id_transaksi: id,
    });
  } catch (e) {
    if (transaction) {
      await transaction.rollback();
      next(e);
    }
  }
};

controller.destroy = async (req, res, next) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const { id } = req.params;

    // mencari data lama
    const old = await transaksi.findOne({ where: { id } });

    if (!old)
      throw {
        statusCode: 400,
        message: "Data tidak ditemukan masukan id yang benar",
      };

    const refrence_id = old.dataValues.id;

    // mencari data t_attachment
    const srcData = await attachment.findOne({
      where: {
        [Op.and]: [
            { refrence_id }, 
            { refrence_table: "transaksi" }
        ],
      },
    });

    // destroy data
    const status1 = !!(await attachment.destroy(
      { where: { id: srcData.dataValues.id } },
      { transaction }
    ));
    const status2 = !!(await transaksi.destroy({ where: { id } }));
    const statusAll = {
      status1: status1,
      status2: status2,
    };
    console.table(statusAll);

    if (!status1 && !status2)
      throw { statusCode: 400, message: "Gagal mendelete file pada database" };

    // menghapus data pada file src
    const check = await dltFile(srcData.dataValues.file_name);

    if (check) {
      await transaction.commit();

      return res.status(200).json({
        status: "Success",
        message: "Berhasil delete data pada database dan folder",
        id_transaksi: id,
      });
    }
  } catch (e) {
    if (transaction) {
      await transaction.rollback();
      next(e);
    }
  }
};

module.exports = controller;
