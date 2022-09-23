'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_bank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_bank.belongsTo(models.m_nama_bank, {
        foreignKey: 'nama_bank_id',
        as: 'namaBank'
      })
      m_bank.belongsTo(models.m_jenis_kepemilikan, {
        foreignKey: 'jenis_kepemilikan_id',
        as: 'jenisKepemilikan'
      })
      m_bank.hasOne(models.m_anggota, {
        foreignKey: 'bank_id'
      })
    }
  }
  m_bank.init({
    nama_bank_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'm_nama_bank',
        key: 'id',
        as: 'namaBank'
      },
      validate: {
        notEmpty: true,
        notNull: true,
        isInt: true
      }
    },
    nama_pemilik_bank: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      },
    },
    jenis_kepemilikan_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'm_jenis_kepemilikan',
        key: 'id',
        as: 'jenisKepemilikan',
      },
      validate: {
        notEmpty: true,
      }
    },
    no_rek: {
      type: DataTypes.STRING(16),
      validate: {
        len: {
          msg: 'Masukan maksimal 16 digit angka',
          args: [1,16],
        },
        notEmpty: true
      }
    },
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'm_bank',
    freezeTableName: true,
  });
  return m_bank;
};