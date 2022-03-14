const Venta = require ("../models/ordenVenta.models");

module.exports.createVenta = (req , res) => {
    console.log("Funciona createVenta")
    Venta.create(req.body)
    .then(data => res.json({data: null, message: null, error: false}))
    .catch(error => res.json({data: null, message: "Algo salió mal en la creación de la venta", error: false}))
};
module.exports.viewsVenta = (req, res) => {
    console.log("Funciona viewsVenta")
    Venta.find({})
    .then(allVenta => res.json({venta: allVenta}))
    .catch(error => res.json ({data: null, message: "Algo salió mal en la creación de la venta", error: false}))
}