'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class log_permohonan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  log_permohonan.init({
    no_pinjam: DataTypes.INTEGER,
    status: DataTypes.STRING,
    oleh: DataTypes.STRING,
    nama_pegawai: DataTypes.STRING,
    tanggal_permohonan: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'log_permohonan',
    freezeTableName: true,
    timestamps: false,
  });
  return log_permohonan;
};