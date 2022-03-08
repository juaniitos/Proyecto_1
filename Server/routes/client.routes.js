const { registerClient, viewClients, viewClientsNoActive, searchClients, updateClients, eliminarClient } = require ('../controllers/client.controllers');

module.exports = (app) => {
    app.post('/api/clientRegister', registerClient);
    app.get('/api/clients', viewClients);
    app.get('/api/clients/noActive', viewClientsNoActive);
    app.get('/api/clients/:_id', searchClients);
    app.put('/api/clients/update/:_id', updateClients);
    app.delete('/api/clients/delete/:_id', eliminarClient);
}