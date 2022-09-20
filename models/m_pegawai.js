'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_pegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_pegawai.belongsTo(models.m_jabatan, {
        foreignKey: 'jabatan_id'
      });
    }
  }
  m_pegawai.init({
    no_pegawai: {
      type: DataTypes.STRING(13),
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        len: {
          msg: 'Masukan maksimal 13 digit angka',
          args: [1,13],
        }
      }
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    no_hp: {
      type:DataTypes.STRING(13),
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        len: {
          msg: 'Masukan maksmial 13 digit angka nomor telepon',
          args: [1,13]
        }
      }
    },
    no_ktp: {
      type: DataTypes.STRING(16),
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        len: {
          msg: 'Masukan maksimal 16 digit angka',
          args: [1,16]
        }
      }
    },
    gender: DataTypes.ENUM('pria', 'wanita'),
    tanggal_lahir: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        notEmpty: true,
        notNull: true,
      }
    },
    tempat_lahir: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        isEmail: {
          msg: 'Masukan email yang valid'
        }
      }
    },
    jabatan_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'm_jabatan',
        key: 'id',
      }
    },
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'm_pegawai',
    freezeTableName: true
  });
  return m_pegawai;
};