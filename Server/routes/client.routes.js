const { registerClient } = require ('../controllers/client.controllers');

module.exports = (app) => {
    app.post('/api/clientRegister', registerClient);
}