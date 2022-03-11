const { register, login, changePassword } = require ('../controllers/users.controllers');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/user', register);
    app.post('/api/login', login);
    app.put('api/changePassword', authenticate, changePassword)
}