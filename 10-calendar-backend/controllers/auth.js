const { response } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exists with the same email'
            })
        }
        user = new User(req.body);
        //Encryptar pass
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        // Save
        await user.save();
        const token = await generateJWT(user.id, user.name)
        res.status(201).json({
            ok: true,
            msg: 'register',
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please contact admin'
        })
    }
}

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;
    // Error handling
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User dont exists with the same email'
            })
        }
        // COnfirm password
        const validPasword = bcrypt.compareSync(password, user.password);
        if (!validPasword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrect'
            });
        }
        // Generate json web token
        const token = await generateJWT(user.id, user.name)

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            msg: 'login',
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please contact admin'
        })
    }


};

const renewToken = async (req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    // new JSON web token
    const token = await generateJWT(uid, name)

    res.json({
        ok: true,
        msg: 'renew',
    })
};


module.exports = {
    createUser,
    loginUser,
    renewToken
};