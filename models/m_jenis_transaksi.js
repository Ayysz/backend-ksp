'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_jenis_transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_jenis_transaksi.hasOne(models.t_transaksi, {
        foreignKey: 'jenis_transaksi_id'
      });
    }
  }
  m_jenis_transaksi.init({
    jenis_transaksi: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'm_jenis_transaksi',
    freezeTableName: true,
  });
  return m_jenis_transaksi;
};