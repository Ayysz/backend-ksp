'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_permohonan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      t_permohonan.belongsTo(models.m_pegawai, {
        foreignKey: 'pimpinan_id',
      });
      t_permohonan.belongsTo(models.m_pegawai, {
        foreignKey: 'staff_id',
      });
    }
  }
  t_permohonan.init({
    pinjam_id: DataTypes.INTEGER,
    pimpinan_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'm_pegawai',
        key: 'id'
      }
    },
    staff_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'm_pegawai',
        key: 'id'
      }
    },
    tanggal_persetujuan: DataTypes.DATEONLY,
    alasan: DataTypes.TEXT,
    is_waiting: DataTypes.BOOLEAN,
    is_approve: DataTypes.BOOLEAN,
    is_active: DataTypes.BOOLEAN,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 't_permohonan',
    freezeTableName: true,
  });
  // auto input to log permohonan after data created
  t_permohonan.afterCreate(async (t_permohonan, options) => {
      // after refactor
        const{
          is_approve,
          is_waiting
        } = t_permohonan;
        let piece = statusCheck(t_permohonan, is_approve,is_waiting);
        const reqData ={
          no_pinjam: t_permohonan.id,
          ...piece,
          tanggal_permohonan: t_permohonan.tanggal_persetujuan,
          createdAt: new Date()
        };   
        
        await sequelize.models.log_permohonan.create(reqData);
  
  });
  return t_permohonan;
};

const statusCheck = (t_permohonan, is_approve, is_waiting) => {
  let piece;
  switch(true){
    case(is_approve === true && is_waiting === false):
      return piece = {
        status: 'ditinjau',
        oleh: 'staff',
        nama_pegawai: t_permohonan.staff_id,
      };
    break;
    case(is_approve === false && is_waiting === false):
      return piece = {
        status: 'disetujui',
        oleh: 'pimpinan',
        nama_pegawai: t_permohonan.pimpinan_id,
      };
    break;
    case(is_approve === false && is_waiting === true):
      return piece = {
        status: 'ditinjau',
        oleh: 'pimpinan',
        nama_pegawai: t_permohonan.pimpinan_id,
      };
    break;
    case(is_approve === true && is_waiting === true):
      return piece = {
        status: 'ditolak',
        oleh: 'pimpinan',
        nama_pegawai: t_permohonan.pimpinan_id,
      }
    break;
    default:
      return piece = {
        status: 'ditinjau',
        oleh: 'staff',
        nama_pegawai: t_permohonan.staff_id,
      }
    break;
  }
}

    // before refactor
    // if(
    //   is_approve === true &&
    //   is_waiting === false 
    // ){
    //     const status  = 'ditinjau';
    //     await sequelize.models.log_permohonan.create({
    //       no_pinjam: t_permohonan.pinjam_id,
    //       status: status,
    //       oleh: 'staff',
    //       nama_pegawai: t_permohonan.staff_id,
    //       tanggal_permohonan: t_permohonan.tanggal_persetujuan,
    //       createdAt: new Date()
    //     });
    //   }else if (
    //     is_approve === false &&
    //     is_waiting === true
    //     ){
    //     const status  = 'ditinjau';
    //     await sequelize.models.log_permohonan.create({
    //       no_pinjam: t_permohonan.pinjam_id,
    //       status: status,
    //       oleh: 'pimpinan',
    //       nama_pegawai: t_permohonan.pimpinan,
    //       tanggal_permohonan: t_permohonan.tanggal_persetujuan,
    //       createdAt: new Date()
    //     });
    //   }else if(is_approve === true 
    //     && is_waiting === true){
    //     const status  = 'ditolak';
    //     await sequelize.models.log_permohonan.create({
    //       no_pinjam: t_permohonan.pinjam_id,
    //       status: status,
    //       oleh: 'pimpinan',
    //       nama_pegawai: t_permohonan.pimpinan_id,
    //       tanggal_permohonan: t_permohonan.tanggal_persetujuan,
    //       createdAt: new Date()
    //     });
        
    //   }else{
    //     const status  = 'disetujui';
    //     await sequelize.models.log_permohonan.create({
    //       no_pinjam: t_permohonan.pinjam_id,
    //       status: status,
    //       oleh: 'pimpinan',
    //       nama_pegawai: t_permohonan.pimpinan_id,
    //       tanggal_permohonan: t_permohonan.tanggal_persetujuan,
    //       createdAt: new Date()
    //     });
    //   }