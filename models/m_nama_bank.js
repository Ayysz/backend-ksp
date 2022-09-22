'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_nama_bank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_nama_bank.hasOne(models.m_bank, {
        foreignKey: 'nama_bank_id'
      })
    }
  }
  m_nama_bank.init({
    nama_bank: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'm_nama_bank',
    freezeTableName: true,
  });
  return m_nama_bank;
};