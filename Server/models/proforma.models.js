const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProformaSchema = new mongoose.Schema({
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    product: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    contador: {
        type: Number,
        // required: [true]
    },
    cantidades: [
        {
            type: Number,
            // required: true
        }
    ],
    precio: {
        type: Number,
        // required: true
    },
    subtotal: {
        type: Number,
        // require: true
    },
    impuesto: {
        type: Number,
        // required: true
    },
    total: {
        type: Number,
        // required: true
    }
}, {timestamps: true})

const Proforma = mongoose.model("Proforma", ProformaSchema);

module.exports = Proforma;