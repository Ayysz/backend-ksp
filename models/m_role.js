'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_role.hasOne(models.m_akun,{
        foreignKey: 'role_id'
      });
    }
  }
  m_role.init({
    role: DataTypes.STRING,
    desc: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true,
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: true,
      }
    }
  }, {
    sequelize,
    modelName: 'm_role',
    freezeTableName: true
  });
  return m_role;
};