'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_attachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  t_attachment.init({
    file_name: DataTypes.STRING,
    refrence_table: {
      type: DataTypes.ENUM('transaksi','pinjam','simpan')
    },
    refrence_id: {
      type: DataTypes.INTEGER
    },
    anggota_id: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 't_attachment',
    freezeTableName: true,
  });
  return t_attachment;
};