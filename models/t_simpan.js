'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_simpan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      t_simpan.hasOne(models.m_jenis_simpanan, {
        foreignKey: 'jenis_simpanan_id',
        hooks: true,
      });

      t_simpan.belongsTo(models.m_anggota, {
        foreignKey: 'anggota_id',
        as: 'anggota',
        hooks: true,
      })
    }
  }
  t_simpan.init({
    no_simpan: {
      type: DataTypes.STRING(13),
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    tanggal_simpan: DataTypes.DATEONLY,
    jangka_simpan: DataTypes.STRING,
    anggota_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'm_anggota',
        key: 'id'
      }
    },
    jumlah: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Masukan nilai jumlah'
        }
      }
    },
    total: DataTypes.DOUBLE, //total untuk simpanan berjangka 
    jenis_simpanan_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'm_jenis_simpanan',
        key: 'id'
      }
    },
    is_done: DataTypes.BOOLEAN,
    is_active: DataTypes.BOOLEAN,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 't_simpan',
    freezeTableName: true,
  });

  // create log_simpan after input
  t_simpan.afterCreate(async (t_simpan, opt) => {
    console.log('Nambahin log simpanan nich')
  });

  t_simpan.afterUpdate(async (t_simpan, opt) => {

  });

  // add data values before update
  t_simpan.beforeUpdate(async (t_simpan, opt) => {
    let stat = 0;
    const {id, total, jumlah} = t_simpan;
    const old = await sequelize.models.t_simpan.findOne({where: {id}});
    const data = parseFloat(jumlah) + parseFloat(old.dataValues.jumlah);

    if ( parseFloat(total) === parseFloat(data) ) stat = 1;

    return t_simpan.jumlah = data, 
            t_simpan.is_done = stat;
  });

  return t_simpan;
};