const Gameboard = (function() {
    const board = [];

    return { board };
})();

const GameController = (function() {
    
});

function createPlayer(player) {
    const symbol = player;

    const playMove = (index) => {
        Gameboard.board.splice(index, 0, symbol);
    }

    return { playMove }
}

const playerX = createPlayer('X');
const playerO = createPlayer('O');

playerX.playMove(0);
playerO.playMove(7);

console.log(Gameboard.board);