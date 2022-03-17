const { createVenta, viewsVenta, sumaVenta } = require("../controllers/venta.controllers")

module.exports = (app) => {
    app.post('/api/createOrdenVenta', createVenta);
    app.get('/api/ventas', viewsVenta);
    app.get('/api/sumVentas', sumaVenta)
}