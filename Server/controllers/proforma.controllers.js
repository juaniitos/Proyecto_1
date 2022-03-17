const Proforma = require ("../models/proforma.models");

module.exports.createProforma = (req , res) => {
    console.log("Funciona createProforma")
    console.log(req.body)
    Proforma.create(req.body)    
    .then(data => res.json({data: data, message: null, error: false}))
    .catch(error => res.json({data: null, message: "Algo salió mal en la creación de la venta", error: false}))
};
module.exports.viewsProforma = (req, res) => {
    console.log("Funciona viewsProforma")
    Proforma.find({})
    .then(allProforma => res.json({proformas: allProforma}))
    .catch(error => res.json ({data: null, message: "Algo salió mal en la creación de la venta", error: false}))
};
module.exports.sumaProforma = (req, res) => {
    console.log("Funciona sumaProforma")
    Proforma.aggregate([{ 
        $group: { 
            _id: null, 
            total: { 
                $sum: "$total" 
            }
        } }])
    .then(allSumProforma => res.json({totalProformas: allSumProforma}))
    .catch(error => res.json ({data: null, message: "Algo salió mal en la creación de la venta", error: false}))
};
