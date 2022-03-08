const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const ClientSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es requerido"]
    },
    apellido: {
        type: String,
        required: [true, "El apellido es requerido"]
    },
    ruc: {
        type: Number,
        minlength: 10,
        required: [true, "El ruc es requerido"]
    },
    email: {
        type: String,
        required: [true, "El email es requerido"],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/, "El formato del email es inválido"],
        unique: true
    },
    saldo: {
        type: Number,
        required: [true, "El saldo pendiente es requerido"]
    },
    activo: {
        type: Boolean
    },
    inactivo: {
        type: Boolean
    }
}, {timestamps: true});

const Client = mongoose.model("Client", ClientSchema);
ClientSchema.plugin(uniqueValidator, { message: 'Error; el email {VALUE} ya está en uso.' });

module.exports = Client;