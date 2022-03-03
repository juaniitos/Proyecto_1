const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        //match: [/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/, "El email es inválido"],
        unique: [true, "El email ya está en uso"]
    }
}, {timestamps: true});

const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;