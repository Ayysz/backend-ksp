'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_pinjam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      t_pinjam.belongsTo(models.m_anggota, {
        foreignKey: 'anggota_id'
      });
      t_pinjam.hasOne(models.t_transaksi, {
        foreignKey: 'pinjaman_id'
      })
    }
  }
  t_pinjam.init({
    no_pinjam: {
      type: DataTypes.STRING(13),
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    anggota_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'm_anggota',
        key: 'id'
      }
  },
    jumlah: DataTypes.DOUBLE,
    tujuan: DataTypes.TEXT,
    tanggal_pinjam: DataTypes.DATEONLY,
    tanggal_pengembalian: DataTypes.DATEONLY,
    is_done: DataTypes.BOOLEAN,
    is_approve: DataTypes.BOOLEAN,
    is_active: DataTypes.BOOLEAN,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 't_pinjam',
    freezeTableName: true,
  });
  return t_pinjam;
};