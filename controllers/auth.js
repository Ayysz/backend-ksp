'use strict'

require('dotenv').config();
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Models = require('../models'); // require from index.js in models
const user = Models.m_akun; // get model m_akun from Models
const controller = {};

const { errRes } = require('../helper/helper');
const { sequelize } = require('../models');
const expiration = process.env.JWT_EXPIRATION_TIME_MS;
const secretKey = process.env.JWT_SECRET;
const roleId = {
    1: 'Admin',
    2: 'Pimpinan',
    3: 'Staff',
    4: 'Member'
};

// mencari data email
const findOnly = async (param) => {
    const data = await user.findOne({
        raw: true,
        where: param
    });

    return data;
}

const getAll = async () => {
    const data = await User.findAll({
        raw: true,
    });

    return data;
}

// cek data user sebelum login
controller.checkUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await findOnly({email: email.toLowerCase()});

        // cek hasil apakah ada email sesuai dengan yang didatabase
        if (result !== null){
            
            // cek apakah password sama
            const verify = await bycrypt.compare(password, result.password);
            
            if(verify){

                // console.log(result);

                // membuat object User untuk menampung data yang berhasil ditemukan dari database
                const User = {
                    email: result.email,
                    password: result.password,
                    role: result.role_id
                } 
                // menyimpan data dari request body ke dalam data locals.user
                res.locals.user = User;
                next();
                
            }else{
                errRes(res, 400, 'Password Salah');
            }
            
        }else{
            errRes(res, 400, 'Email Salah');
        }
    } catch (e) {
        next(e);
    }
};

// login controller
controller.login = async (req, res) => {
    try {
        let user;

        if(res.locals.user){
            user = res.locals.user
        } else {
            errRes(req, 400, 'User tidak ditemukan')
        }

        const payload = {
            data: user,
            expiration: Date.now() + parseInt(expiration),
        }

        // membuat jwt token
        const token = jwt.sign(JSON.stringify(payload), secretKey);

        // memberikan response dengan set cookie sekaligus
        res
            .cookie('jwt', token, config.jwt.options)
            .status(200)
            .json({
                status: 'success',
                message: 'Kamu berhasil login :D'
            });

    } catch (e) {
        next(e)
    }
}

// controller sign up
controller.signUp = async (req, res, next) => {
    try {
        const {faker} = require('@faker-js/faker');
        const {email, password} = req.body;
        const reqData = {
            email,
            password,
            role_id: faker.helpers.arrayElement([1,2,3,4]),
            is_active: 1
        };

        // cek apakah email sudah terdaftar
        const check = await findOnly({email: email.toLowerCase()});
        if(check !== null){
            return errRes(res, 400, 'Email telah terdaftar, silahkan gunakan email lain');
        }else{
            const hasil = await user.create(reqData);
            // console.log(hasil);
            const newRecord = hasil._options.isNewRecord;
            if(newRecord){
                return res.status(201)
                .json({
                    status: 'Success',
                    message: 'Sukses menambah data baru',
                    data: hasil.dataValues
                })
            }
        }


    } catch (e) {
        next(e)
    }
}

// controller logout
controller.logOut = async (req, res, next) => {
    try {
        if(req.cookies['jwt']){
            return res
                .clearCookie('jwt')
                .status(200)
                .json({
                    status: 'Success',
                    message: 'Yah kamu logout, bye, jangan lupa dateng lagi ya :)'
                });

        }else{
            return errRes(res, 401, 'Token Invalid');
        }
    } catch (e) {
        next(e)
    }
};

// untuk tes route apakah cookie bisa atau tidak
controller.protected = (req, res, next) => {
    try {
        return res.status(200).json({
            status: 'success',
            message: 'ini khusus pengguna rahasia'
        });
    } catch (e) {
        next(e)
    }
};

// getAll data akun
controller.getAll = async (req, res, next) => {
    try {
        const result = await getAll();

        return !result ? 
        res.status(200).json({
            status: 'Success',
            message: 'Data ditemukan',
            data: result
        }):
        res.status(400).json({
            status: 'Error',
            message: 'Data kosong tidak ditemukan',
            data: result
        });
        

    } catch (e) {
        next(e)
    }
}

// khusus untuk admin
controller.adminOnly = (req, res, next) => {
    
    const User = req.user.data;
    console.log(User.role < 4);
    if(roleId[User.role] !== 'Admin') {
        return errRes(res, 401, 'Access denied your role is enough to acces this routes');
    }else{
        console.log('lanjutttt======');
        // jika role mencukupi maka lanjut
        next();
    }
}
controller.haloAdmin = (req, res, next) => {
    const User = req.user.data;
    return res.status(200).json({
            status: 'success',
            message: `Selamat datang admin ${User.email}` 
        })
}

// khusus untuk staff
controller.staffOnly = (req, res, next) => {
  try {
    const User = req.user.data;
    if(roleId[User.role] === 'member'){
        return errRes(res, 401, 'Kamu bukan staff gaboleh masuk')
    }else{
        next()
    }
  } catch (e) {
    next(e)
  }  
};
controller.haloStaff = (req, res ,next) => {
    const User = req.user.data;
    return res.status(200).json({
        status: 'success',
        message: 'Selamat datang staff',
        email: User.email
    });
};

// member only
controller.memberOnly = (req, res, next) => {
    try {
        const User = req.user.data;
        if(parseInt(User.role) > 5){
            return errRes(res, 401, 'Kamu siapa gak kedaftar di role')
        }else{
            next()
        }
    } catch (e) {
        next(e)
    }
};

// info account in cookies
controller.info = (req, res, next) => {
    try {
        const {email, password, role} = req.user.data;

        console.log('Info Akun kamu')
        console.table(req.user.data);

        return res.status(200)
        .json({
            status: 'Success',
            message: 'Info akun kamu dari cookies',
            data: {
                email,
                password,
                role
            }
        })

    } catch (e) {
        next(e)
    }
};

module.exports = {controller};