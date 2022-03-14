const { viewUsers, register, login, changePassword } = require ('../controllers/users.controllers');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/users', authenticate, viewUsers);
    app.post('/api/user', register);
    app.post('/api/login', login);
    app.put('/api/changePassword', authenticate, changePassword)
}