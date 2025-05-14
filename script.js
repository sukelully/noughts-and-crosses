const Gameboard = (function() {
    const boardSize = 1;
    const board = Array(boardSize).fill(null);

    return { boardSize, board };
})();

const GameController = (function() {
    // Check if board is full
    const boardIsFull = () => {
        if (Gameboard.board.every(el => typeof el === 'string')) {
            return true;
        }
        return false;
    };

    return { boardIsFull };
})();

function createPlayer(player) {
    const symbol = player;

    const playMove = (index) => {
        if (index > Gameboard.boardSize) {
            console.error('ERROR: Tried to play a move at an index larger than the size of the board.')
            return;
        }
        Gameboard.board[index] = symbol;
    }

    return { playMove }
}

const playerX = createPlayer('X');
const playerO = createPlayer('O');

playerX.playMove(0);
playerO.playMove(3);

console.log(GameController.boardIsFull());
console.log(Gameboard.board);