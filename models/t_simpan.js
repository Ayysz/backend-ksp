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
        foreignKey: 'jenis_simpanan_id'
      });

      t_simpan.belongsTo(models.m_anggota, {
        foreignKey: 'anggota_id',
        as: 'anggota'
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
    jangka_simpan: DataTypes.DATEONLY,
    anggota_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'm_anggota',
        key: 'id'
      }
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    jumlah: DataTypes.DOUBLE,
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

  });

  // add data values before update
  t_simpan.beforeUpdate(async (t_simpan, opt) => {
    console.log(t_simpan.dataValues); // new values
    console.log(t_simpan._previousDataValues); // current values

    t_simpan.dataValues.jumlah += t_simpan.dataValues.jumlah;
    return console.log(t_simpan.dataValues.jumlah += t_simpan.dataValues.jumlah)
  });

  return t_simpan;
};