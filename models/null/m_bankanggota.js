'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_bankAnggota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_bankAnggota.belongsTo(models.m_bank, {
        foreignKey: 'bank_id',
      });
      
      m_bankAnggota.belongsTo(models.m_anggota, {
        foreignKey: 'anggota_id'
      });
    }
  }
  m_bankAnggota.init({
    anggota_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'm_anggota',
        key: 'id'
      }
    },
    bank_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'm_bank',
        key: 'id'
      }
    },
    is_active: {
      type:DataTypes.BOOLEAN,
      defaultValue: 1,
    }
  }, {
    sequelize,
    modelName: 'm_bankAnggota',
    freezeTableName: true
  });
  return m_bankAnggota;
};