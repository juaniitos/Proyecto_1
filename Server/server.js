const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

require('./config/mongoose.config');

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./routes/users.routes')(app);
require('./routes/client.routes')(app);
require('./routes/products.routes')(app);
require('./routes/venta.routes')(app);
// require('./routes/accounting.routes')(app);

const server = app.listen( port, () => console.log(`Escuchando en el puerto ${port}`));

const io = require('socket.io')(server);

io.on("connection", socket => {
    // console.log(socket.id);
    // socket.emit("your_id", socket.id);
    socket.on("send_message", body => {
        console.log(body);
        io.emit("message_" + body.receptor, body)
    });
})