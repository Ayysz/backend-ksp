'use strict';
const bycrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_akun extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_akun.belongsTo(models.m_role, {
        foreignKey: 'role_id'
      })
    }
  }
  m_akun.init({
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: {
          msg: 'Harap masukan Email yang valid'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: {
          args: [8,100],
          msg: 'Masukan minimal password 8 karakter'
        }
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      defaultValue: 4,
      validate: {
        notEmpty: true,
        isNumeric: {
          msg: 'Harap masukan hanya angka'
        }
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'm_akun',
    freezeTableName: true,
  });

  m_akun.beforeBulkCreate(async (m_akuns, options) => {
    for(const m_akun of m_akuns){
      const {
        password
      } = m_akun;
      const hashed = await bycrypt.hash(password, 10);
      m_akun.password = hashed;
    }
  });
  
  // hash password before create
  m_akun.beforeCreate (async (m_akun, options) => {
      const { password } = m_akun;
      const hashed = await bycrypt.hash(password, 10);
      return m_akun.password = hashed;
  });

  // lowercase email before create
  // m_akun.beforeCreate()

  return m_akun;
};