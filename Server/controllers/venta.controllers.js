const Venta = require ("../models/ordenVenta.models");

module.exports.createVenta = (req , res) => {
    console.log("Funciona createVenta")
    console.log(req.body)
    Venta.create(req.body)    
    .then(data => res.json({data: data, message: null, error: false}))
    .catch(error => res.json({data: null, message: "Algo salió mal en la creación de la venta", error: false}))
};
module.exports.viewsVenta = (req, res) => {
    console.log("Funciona viewsVenta")
    Venta.find({})
    .then(allVenta => res.json({ventas: allVenta}))
    .catch(error => res.json ({data: null, message: "Algo salió mal en la creación de la venta", error: false}))
};
module.exports.sumaVenta = (req, res) => {
    console.log("Funciona sumaVenta")
    Venta.aggregate([{ 
        $group: { 
            _id: null, 
            total: { 
                $sum: "$total" 
            }
        } }])
    .then(allSumVenta => res.json({totalVentas: allSumVenta}))
    .catch(error => res.json ({data: null, message: "Algo salió mal en la creación de la venta", error: false}))
};



