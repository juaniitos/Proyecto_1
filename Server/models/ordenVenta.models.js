const mongoose = require('mongoose');

const VentaSchema = new mongoose.Schema({
    contador: {
        type: Number,
        required: [true]
    },
    nombre: {
        type: String,
        required: [true, "El nombre es requerido"]
    },
    apellido: {
        type: String,
        required: [true, "El apellido es requerido"]
    },
    id: {
        type: Number,
        required: [true, "El id es requerido"]
    },
    codigo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        require: true
    },
    impuesto: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const Venta = mongoose.model("Venta", VentaSchema);

module.exports = Venta;