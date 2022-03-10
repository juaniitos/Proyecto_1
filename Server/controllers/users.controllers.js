const User = require('../models/users.models');
const jwt = require('jsonwebtoken');
const {secret} = require('../config/jwt.config');
const bcrypt = require('bcrypt');

module.exports.register = (req, res) => {
    const user = req.body;
    User.create(user)
    .then(data => res.json({data: null, message: null, error: false}))
    .catch(error => res.json({data: null, message: error, error: false}))
};

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

// export const changePassword = async (req, res) => {
//     const { email, oldPassword, newPassword } = req.body
//     User.findOne({ email: email })
//       .then(oldUser => {
//         if (!oldUser) return res.status(404).send("User does not exist")
//         oldUser.comparePassword(oldPassword, (err, isMatch) => {
//           if (err) {
//             return res.status(401).send("Unauthorized")
//           }
//           if (isMatch) {
//             // change to new password
//             oldUser.password = newPassword
//             oldUser
//               .save()
//               .then(newUser => {
//                 res.status(200).send(newUser)
//               })
//               .catch(err => {
//                 const message = err.message
//                 res.status(500).json({
//                   status: "change password failed",
//                   msg: message
//                 })
//               })
//           } else {
//             return res.status(401).send("Invalid old password")
//           }
//         })
//       })
//       .catch(err => {
//         res.status(500).send(err)
//       })
//   }

module.exports.changePassword = (req, res) => {
    User.findOne({ _id: userId })
    .then(user => {
      const secret = user.password + "-" + user.createdAt
      const payload = jwt.decode(token, secret)
      if (payload.userId === user.id) {
        bcrypt.genSalt(10, function(err, salt) {
          if (err) return
          bcrypt.hash(password, salt, function(err, hash) {
            if (err) return
            User.findOneAndUpdate({ _id: userId }, { password: hash })
              .then(() => res.status(202).json("Password changed accepted"))
              .catch(err => res.status(500).json(err))
          })
        })
      }
    })
    .catch(() => {
      res.status(404).json("Invalid user")
    })
};
