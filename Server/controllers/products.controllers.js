const Product = require("../models/products.models");

module.exports.createProducts = (req, res) => {
    console.log("Funciona createProducts!")
    /* const productos = req.body; */
    Product.create(req.body)
    .then( data => res.json({data: null, message: null, error: false}))
    .catch ( error => res.json({ data: null, message: "Algo salió mal en la creación createProducts", error: false}));
}

module.exports.viewsProducts = (req, res) => {
    console.log("Funciona viewsProducts!")
    Product.find()/* .sort({"progress.date_unlocked:1"}) */
    .then(allProducts => res.json({product: allProducts}))
    .catch(err => res.json({ message: "Algo salió mal viewsProducts", err }));
}

module.exports.searchProducts = (req, res) => {
    console.log("Funciona searchProducts")
    Product.findById({_id: req.params._id})
    .then(encontrado => res.json({product: encontrado}))
    .catch(err => res.json({message: "Algo salió mal searchProducts", err}))
}

module.exports.updateProducts = (req, res) => {
    console.log("Funciona UPDATEE!!!")
    console.log(req.body, req.params._id);
    const product = req.body;
    product.estado = 'ACTUALIZADO';
    Product.findByIdAndUpdate({_id: req.params._id}, product)
    .then(data => res.json ({data: data, product, message: null, error: false}))
    .catch(error => res.json ({data: product, message: error, error: true}))
}
/* module.exports.updatePetsId = (req, res) => {
    console.log("Funciona UPDATEE!!!")
    console.log(req.body, req.params._id);
    const pet = req.body;
    pet.estado = 'ACTUALIZADO';
    Pets.findByIdAndUpdate({_id: req.params._id}, pet)
    .then(data => res.json( { data: data, pet, message: null, error: false}))
    .catch(error => res.json( { data: pet, message: error, error: true}))
} */