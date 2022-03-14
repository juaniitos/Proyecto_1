const { createVenta, viewsVenta } = require("../controllers/venta.controllers")

module.exports = (app) => {
    app.post('/api/createOrdenVenta', createVenta);
    app.get('/api/ventas', viewsVenta)
}