// server.js - Node + Express + Socket.IO
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';


const app = express();
const server = http.createServer(app);


const io = new Server(server, {
cors: {
origin: '*', // em produção limite ao domínio do seu front
methods: ['GET', 'POST']
}
});


let players = {};


io.on('connection', (socket) => {
console.log('connected', socket.id);
// cria jogador com posição central
players[socket.id] = { x: 400, y: 300 };


// envia estado inicial
socket.emit('state', { players });
socket.broadcast.emit('state', { players });


socket.on('move', (dir) => {
const p = players[socket.id];
if (!p) return;
p.x = Math.max(0, Math.min(800, (p.x || 400) + dir.x));
p.y = Math.max(0, Math.min(600, (p.y || 300) + dir.y));
// broadcast do estado (simples: envia todo o estado)
io.emit('state', { players });
});


socket.on('disconnect', () => {
delete players[socket.id];
io.emit('state', { players });
});
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('Server listening on', PORT));