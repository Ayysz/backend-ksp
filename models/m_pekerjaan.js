'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_pekerjaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_pekerjaan.belongsTo(models.m_anggota, {
        foreignKey: 'pekerjaan_id'
      });
    }
  }
  m_pekerjaan.init({
    pekerjaan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'm_pekerjaan',
    freezeTableName: true
  });
  return m_pekerjaan;
};