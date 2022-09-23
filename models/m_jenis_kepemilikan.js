'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_jenis_kepemilikan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_jenis_kepemilikan.hasOne(models.m_bank, {
        foreignKey: 'jenis_kepemilikan_id',
        as: 'jenisKepemilikan'
      });
    }
  }
  m_jenis_kepemilikan.init({
    kepemilikan: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'm_jenis_kepemilikan',
    freezeTableName: true,
  });
  return m_jenis_kepemilikan;
};