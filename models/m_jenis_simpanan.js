'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_jenis_simpanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_jenis_simpanan.belongsTo(models.t_simpan, {
        foreignKey: 'jenis_simpanan_id'
      });
    }
  }
  m_jenis_simpanan.init({
    jenis_simpanan: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'm_jenis_simpanan',
    freezeTableName: true,
  });
  return m_jenis_simpanan;
};