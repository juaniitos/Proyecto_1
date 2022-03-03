const User = require('../models/users.models');
const jwt = require('jsonwebtoken');
const {secret} = require('../config/jwt.config');
const bcrypt = require('bcrypt');

module.exports.register = (req, res) => {
    const user = req.body;
    User.create(user)
    .then(data => res.json({data: null, message: null, error: false}))
    .catch(error => res.json({data: null, message: error, error: false}))
}

module.exports.login = (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (user === null) {
            res.json({ msg: "Usuario y/o clave inválido", error: false})
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then(passwordIsValid => {
                if (passwordIsValid) {
                    const datos = {
                        _id: user._id,
                        name: user.nombre + ' ' + user.apellido,
                        email: user.email 
                    };
                    console.log("LLEGUE!")
                    const newJWT = jwt.sign(datos, secret);
                    console.log("FUNCIONOOO!!")
                    res.cookie("usertoken", newJWT, secret, {
                        httpOnly: true
                    }).json({data: datos, msg: "sucesss!", error: false});
                } else {
                    res.json({ msg: "Usuario y/o clave inválido", error: true})
                } 
            })
        }
    }).catch (err => res.json(err));
};