const { register, login } = require ('../controllers/users.controllers');

module.exports = (app) => {
    app.post('/api/user', register);
    app.post('/api/login', login);
}