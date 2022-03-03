const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/sistemaContableJD", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Conexión establecida a la base de datos"))
    .catch(err => console.log("No se pudo establecer conexión a la base de datos", err));