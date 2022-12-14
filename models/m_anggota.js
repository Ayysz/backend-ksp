'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_anggota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_anggota.hasMany(models.m_bank, {
        foreignKey: 'anggota_id',
        as: 'bank'
      });

      m_anggota.belongsTo(models.m_pekerjaan, {
        foreignKey: 'pekerjaan_id'
      });

      m_anggota.hasMany(models.t_transaksi, {
        foreignKey: 'anggota_id',
        as: 'anggota'
      });
      
      m_anggota.hasMany(models.t_simpan, {
        foreignKey: 'anggota_id',
        hooks: true
      });
      
      m_anggota.hasMany(models.t_pinjam, {
        foreignKey: 'anggota_id'
      });
    }
  }
  m_anggota.init({
    no_anggota: {
      type: DataTypes.STRING(13),
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    nama: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Masukan nama '
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
          msg: 'Masukan maksimal 16 digit angka no_ktp',
          args: [1,16]
        }
      }
    },
    no_hp: {
      type: DataTypes.STRING(13),
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        len: {
          msg: 'Masukan maksimal 13 digit angka no_hp',
          args: [1,13]
        }
      }
    },
    gender: DataTypes.ENUM('pria', 'wanita'),
    tanggal_lahir: {
      type: DataTypes.DATEONLY,
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
          args: true,
          msg: 'Masukan email yang valid'
        }
      }
    },
    pekerjaan_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'm_pekerjaan',
        key: 'id'
      }
    },
    is_waiting: DataTypes.BOOLEAN,
    is_approve: DataTypes.BOOLEAN,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'm_anggota',
    freezeTableName: true,
  });
  
  return m_anggota;
};