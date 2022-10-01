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
      t_permohonan.belongsTo(models.t_pinjam, {
        foreignKey: 'pinjam_id'
      })
    }
  }
  t_permohonan.init({
    pinjam_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 't_pinjam',
        key: 'id'
      }
    },
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
        let piece = await statusCheck(sequelize.models.m_pegawai ,t_permohonan, is_approve,is_waiting);
        const result = await sequelize.models.t_pinjam.findOne({where: {id: t_permohonan.pinjam_id}});
        const no_pinjam = result.dataValues.no_pinjam;
        const reqData ={
          no_pinjam,
          ...piece,
          tanggal_permohonan: t_permohonan.tanggal_persetujuan,
          createdAt: new Date()
        };   
        
        await sequelize.models.log_permohonan.create(reqData);
        
      });
      
    // auto input to log permohonan after data update
    t_permohonan.afterUpdate(async (data, opt) => {
      console.log('update data coi')
      const{
        is_approve,
        is_waiting
      } = data;
      const {
        m_pegawai,
        t_permohonan
      } = sequelize.models;
      let piece = await statusCheck( m_pegawai, data, is_approve, is_waiting, t_permohonan);
      const result = await sequelize.models.t_pinjam.findOne({where: {id: data.pinjam_id}});
      const no_pinjam = result.dataValues.no_pinjam;
      const reqData ={
        no_pinjam,
        ...piece,
        tanggal_permohonan: t_permohonan.tanggal_persetujuan,
        createdAt: new Date()
      };   
      
      await sequelize.models.log_permohonan.create(reqData);

    })
  return t_permohonan;
};

const statusCheck = async (models, t_permohonan, isA, isW, models2) => {
  let nama_pegawai, data;
  switch(true){
    case(isW === true && isA === false):
      data = await findPegawai(models, t_permohonan.staff_id);
      nama_pegawai = data.dataValues.nama;
      return {
        status: 'ditinjau',
        oleh: 'staff',
        nama_pegawai,
      };
    break;
    case(isW === false && isA === false):
      data = await findPegawai(models, t_permohonan.staff_id);
      const update = await pinjamanApprove(models2, t_permohonan.pinjam_id);
      nama_pegawai = data.dataValues.nama;
      return {
        status: 'disetujui',
        oleh: 'pimpinan',
        nama_pegawai
      };
    break;
    case(isW === false && isA === true):
      data = await findPegawai(models, t_permohonan.staff_id);
      nama_pegawai = data.dataValues.nama;
      return{
        status: 'ditinjau',
        oleh: 'pimpinan',
        nama_pegawai
      };
    break;
    case(isW === true && isA === true):
      data = await findPegawai(models, t_permohonan.staff_id);
      nama_pegawai = data.dataValues.nama;
      return{
        status: 'ditolak',
        oleh: 'pimpinan',
        nama_pegawai
      }
    break;
    default:
      data = await findPegawai(models, t_permohonan.staff_id);
      nama_pegawai = data.dataValues.nama;
      return{
        status: 'ditinjau',
        oleh: 'staff',
        nama_pegawai
      }
    break;
  }
}

const findPegawai = async(m,id) => {
  try {
      const data = await m.findOne({where: {id}});
      return data;
  } catch (e) {
   console.log(e) 
  }
};

const pinjamanApprove = async (m, id) => {
  try {
    const [updatedRows] = await m.update({is_approve: 1},{where:{id}});
  } catch (e) {
    next(e)
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