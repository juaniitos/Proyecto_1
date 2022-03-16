const { createProforma, viewsProforma } = require("../controllers/proforma.controllers")

module.exports = (app) => {
    app.post('/api/createProforma', createProforma);
    app.get('/api/proformas', viewsProforma)
}