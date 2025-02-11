const express = require('express')
const routes = require('./routes/rotas')
const day = require('./middleware/day')
const app = express()
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
app.use(express.json())

app.use(day)

app.use(routes)

app.post('/bloquear/:lab', (req, res) => {
    const lab = req.params.lab;
    io.emit("bloquear", { message: `O laboratório ${lab} foi bloqueado!` });
    res.send({ success: true, lab });
});

app.get('/exibir', function(req, res){
    res.sendFile(__dirname + "/public/index.html")
})

io.on('connection', (socket) => {
    console.log('Um cliente conectou-se');
});

app.listen(3000, () => {
    console.log('Server running in port 3000')
})