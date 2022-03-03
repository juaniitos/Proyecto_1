const { createProducts, viewsProducts, searchProducts, updateProducts } = require("../controllers/products.controllers");


module.exports = (app) => {
    app.post('/api/createProduct', createProducts);
    app.get('/api/products', viewsProducts);
    app.get('/api/products/:_id', searchProducts);
    app.put('/api/products/update/:_id', updateProducts);
}