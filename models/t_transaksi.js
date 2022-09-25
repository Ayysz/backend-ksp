'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      t_transaksi.hasOne(models.m_jenis_transaksi, {
        foreignKey: 'jenis_transaksi_id'
      });
      t_transaksi.belongsTo(models.m_anggota, {
        foreignKey: 'anggota_id',
        as: 'anggota'
      })
      t_transaksi.belongsTo(models.m_bank, {
        foreignKey: 'bank_id'
      })
    }
  }
  t_transaksi.init({
    no_transaksi: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        isUUID: 4
      }
    },
    anggota_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'm_anggota',
        key: 'id'
      }
    },
    jenis_transaksi_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'm_jenis_transaksi',
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
    tanggal_transaksi: DataTypes.DATEONLY,
    jumlah: DataTypes.DOUBLE,
    is_active: DataTypes.BOOLEAN,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 't_transaksi',
    freezeTableName: true,
  });
  return t_transaksi;
};