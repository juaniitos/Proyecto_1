const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: [true, "El código es requerido"]
    },
    descripcion: {
        type: String,
        required: [true, "La descripción es requerido"]
    },
    precio: {
        type: Number,
        required: [true, "El precio es requerido"]
    },
    cantidad: {
        type: Number,
        required: [true, "La cantidad es requerida"]
    },
    marca: {
        type: String
    },
    caracteristicas: {
        type: String
    },
    costo: {
        type: Number,
        required: [true, "El costo del producto es requerida"]
    },
    imgUrl: {
        type: String
    },
}, {timestamps: true});

const Product = mongoose.model("Product", ProductsSchema);

module.exports = Product;