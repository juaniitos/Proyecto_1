const Client = require('../models/clients.models');

module.exports.registerClient = (req, res) => {
    const client = req.body;
    Client.create(client)
    .then(data => res.json({data: null, message: null, error: false}))
    .catch(error => res.json({data: null, message: error, error: false}))
}

module.exports.viewClients = (req, res) => {
    console.log("Funciona viewsClients!")
    Client.find({}).sort({apellido: 1})
    .then(allClients => res.json({clients: allClients}))
    .catch(err => res.json({ message: "Algo salió mal viewClients", err }));
};

module.exports.viewClientsActive = (req, res) => {
    console.log("Funciona viewClientsActive!")
    Client.find({activo: true}).sort({apellido: 1})
    .then(allClientsActive => res.json({clients: allClientsActive}))
    .catch(err => res.json({ message: "Algo salió mal viewClients", err }));
};

module.exports.viewClientsNoActive = (req, res) => {
    console.log("Funciona viewClientsNoActive!")
    Client.find({activo: false}).sort({apellido: 1})
    .then(allClientsNoActive => res.json({clients: allClientsNoActive}))
    .catch(err => res.json({ message: "Algo salió mal viewClients", err }));
};

module.exports.searchClients = (req, res) => {
    console.log("Funciona searchClients")
    Client.findById({_id: req.params._id})
    .then(encontrado => res.json({client: encontrado}))
    .catch(err => res.json({message: "Algo salió mal searchClients", err}))
};

module.exports.updateClients = (req, res) => {
    console.log("Funciona UPDATE!!!")
    console.log(req.body, req.params._id);
    const client = req.body;
    Client.findByIdAndUpdate({_id: req.params._id}, client, {new: true, runValidators: true})
    .then(data => res.json ({data: data, client, message: null, error: false}))
    .catch(error => res.json ({data: client, message: error, error: true}))
};

module.exports.eliminarClient = (req, res) => {
    console.log('Funciona DELETE!!!')
    Client.findByIdAndDelete({_id: req.params._id})
        .then(result => res.json({message: 'Cliente eliminado', result: result}))
        .catch(err => res.json({message: 'Algo salió mal', error: err}));
};
