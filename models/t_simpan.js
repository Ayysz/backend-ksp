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
    }
  }
  t_simpan.init({
    no_simpan: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        isUUID: 4
      }
    },
    tanggal_simpan: DataTypes.DATEONLY,
    anggota_id: DataTypes.INTEGER,
    jumlah: DataTypes.DOUBLE,
    jenis_simpanan_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'm_jenis_simpanan',
        key: 'id'
      }
    },
    is_active: DataTypes.BOOLEAN,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 't_simpan',
    freezeTableName: true,
  });
  return t_simpan;
};