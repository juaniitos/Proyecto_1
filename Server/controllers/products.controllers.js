const Product = require("../models/products.models");

module.exports.createProducts = (req, res) => {
    console.log("Funciona createProducts!")
    /* const productos = req.body; */
    Product.create(req.body)
    .then( data => res.json({data: null, message: null, error: false}))
    .catch ( error => res.json({ data: null, message: "Algo salió mal en la creación createProducts", error: false}));
};

module.exports.viewsProducts = (req, res) => {
    console.log("Funciona viewsProducts!")
    Product.find({}).sort({codigo: 1})
    .then(allProducts => res.json({products: allProducts}))
    .catch(err => res.json({ message: "Algo salió mal viewsProducts", err }));
};


module.exports.viewsProductsDestacado = (req, res) => {
    console.log("Funciona viewsProducts!")
    Product.find({destacado: true}).sort({codigo: 1})
    .then(productsDestacados => res.json({products: productsDestacados}))
    .catch(err => res.json({ message: "Algo salió mal viewsProducts", err }));
};

module.exports.searchProducts = (req, res) => {
    console.log("Funciona searchProducts")
    Product.findById({_id: req.params._id})
    .then(encontrado => res.json({product: encontrado}))
    .catch(err => res.json({message: "Algo salió mal searchProducts", err}))
};

module.exports.updateProducts = (req, res) => {
    console.log("Funciona UPDATE!!!")
    console.log(req.body, req.params._id);
    const product = req.body;
    // product.estado = 'ACTUALIZADO';
    Product.findByIdAndUpdate({_id: req.params._id}, product, {new: true, runValidators: true})
    .then(data => res.json ({data: data, product, message: null, error: false}))
    .catch(error => res.json ({data: product, message: error, error: true}))
};

module.exports.eliminarProduct = (req, res) => {
    console.log('Funciona DELETE!!!')
    Product.findByIdAndDelete({_id: req.params._id})
        .then(result => res.json({message: 'Producto eliminado', result: result}))
        .catch(err => res.json({message: 'Algo salió mal', error: err}));
};


