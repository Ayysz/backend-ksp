'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_jabatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part o  ff Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_jabatan.hasOne(models.m_pegawai, {
          foreignKey: 'jabatan_id',
      });
    }
  }
  m_jabatan.init({
    jabatan: DataTypes.STRING,
    desc: DataTypes.TEXT,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'm_jabatan',
    freezeTableName: true,
  });
  return m_jabatan;
};
