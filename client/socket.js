// socket.js - conecta ao servidor Socket.IO
// Ajuste a URL abaixo para o domínio do seu servidor (Fly app)
const SERVER_URL = window.SERVER_URL || (location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://SEU_DOMINIO_FLY_IO');
const socket = io(SERVER_URL, { transports: ['websocket'] });


// eventos utilitários
socket.on('connect', () => console.log('Conectado ao servidor', socket.id));
socket.on('disconnect', () => console.log('Desconectado'));


// export
window.gameSocket = socket;