const { createProforma, viewsProforma, sumaProforma } = require("../controllers/proforma.controllers")

module.exports = (app) => {
    app.post('/api/createProforma', createProforma);
    app.get('/api/proformas', viewsProforma);
    app.get('/api/sumProformas', sumaProforma)
}