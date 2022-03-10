const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    userId: {
        sparse: true,
        type: String,
        unique: true
    },
    nombre: {
        type: String,
        required: [true, "El nombre es requerido"]
    },
    apellido: {
        type: String,
        required: [true, "El apellido es requerido"]
    },
    email: {
        type: String,
        required: [true, "El email es requerido"],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/, "El email es inválido"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La clave es requerida"],
        minlength: [4, "La clave debe tener mínimo 8 caracteres"]
    }
}, {timestamps: true});

UserSchema.virtual('confirmPassword')
.get( () => this._confirmPassword )
.set ( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Las claves no son iguales')
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
    });
});

const User = mongoose.model("User", UserSchema);
UserSchema.plugin(uniqueValidator, { message: 'Error; el email {VALUE} ya está en uso.' });

module.exports = User;