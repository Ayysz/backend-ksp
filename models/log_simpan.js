'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class log_simpan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  log_simpan.init({
    no_simpan: DataTypes.STRING,
    id_simpan: DataTypes.INTEGER,
    anggota_id: DataTypes.INTEGER,
    tanggal_simpan: DataTypes.DATE,
    jumlah: DataTypes.FLOAT,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'log_simpan',
    freezeTableName: true,
    timestamps: false,
  });
  return log_simpan;
};