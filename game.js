const config = {
type: Phaser.AUTO,
width: 800,
height: 600,
parent: 'game',
scene: {
preload, create, update
}
};


const game = new Phaser.Game(config);
let players = {};
let localId = null;


function preload(){}


function create(){
this.add.text(10, 10, 'Multiplayer boilerplate', { font: '18px monospace' });


const socket = window.gameSocket;


socket.on('connect', () => {
localId = socket.id;
});


// quando o servidor enviar estado de todos os jogadores
socket.on('state', (state) => {
// state = { players: { id: {x,y} } }
players = state.players;
});


// enviar movimento do jogador a cada frame (exemplo simples)
this.input.keyboard.on('keydown', (e) => {
const speed = 5;
const dir = { x: 0, y: 0 };
if (e.key === 'ArrowUp') dir.y = -speed;
if (e.key === 'ArrowDown') dir.y = speed;
if (e.key === 'ArrowLeft') dir.x = -speed;
if (e.key === 'ArrowRight') dir.x = speed;
if (dir.x !==0 || dir.y !==0) socket.emit('move', dir);
});
}


function update(){
const scene = this;
// redesenhar frame: simples círculos representando jogadores
scene.children.removeAll();
scene.add.text(10, 10, 'Multiplayer boilerplate', { font: '18px monospace' });
for (const [id, p] of Object.entries(players || {})){
const color = id === localId ? 0x00ff00 : 0xffffff;
const g = scene.add.graphics();
g.fillStyle(color, 1);
g.fillCircle(p.x || 400, p.y || 300, 12);
scene.add.text((p.x||400)-10, (p.y||300)-30, id === localId ? 'Você' : id.slice(0,4), { font: '12px monospace' });
}
}
