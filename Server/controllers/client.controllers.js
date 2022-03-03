const Client = require('../models/clients.models');

module.exports.registerClient = (req, res) => {
    const client = req.body;
    Client.create(client)
    .then(data => res.json({data: null, message: null, error: false}))
    .catch(error => res.json({data: null, message: error, error: false}))
}
