const mongoose = require('mongoose');

const VentaSchema = new mongoose.Schema({
    nombre: {
        type: Text,
        required: [true, "El nombre es requerido"]
    },
    apellido: {
        type: Text,
        required: [true, "El apellido es requerido"]
    },
    id: {
        type: Number,
        required: [true, "El id es requerido"]
    },
    codigo: {
        type: Text,
        required: true
    },
    descripcion: {
        type: Text,
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
})

const Venta = mongoose.model("Product", VentaSchema);

module.exports = Venta;