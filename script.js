const Gameboard = (function() {
    const boardSize = 9;
    const board = Array(boardSize).fill(null);

    return { boardSize, board };
})();

const GameController = (function() {
    // Check if board is full
    const boardIsFull = () => {
        if (Gameboard.board.every(item => typeof item === 'string')) {
            return true;
        }
        return false;
    };

    // Check whose turn it is to play
    const takeTurn = () => {
        const count = Gameboard.board.filter(item => item !== null).length;

        if (count % 2 === 0) {
            gameIsWon(playerX.symbol)
            playerX.playMove(0);
        } else {
            gameIsWon(playerO.symbol);
            playerO.playMove(1);
        }
    }

    const gameIsWon = (symbol) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (const condition of winConditions) {
            if (condition.every(item => item === symbol)) {
                console.log(`Player ${symbol} has won the game!`)
                return true;
            }
        }
    }

    return { boardIsFull, takeTurn, gameIsWon };
})();

function createPlayer(player) {
    const symbol = player;

    const prompt = require('prompt-sync')();

    // Get index input and place on board
    const playMove = () => {
        const index = parseInt(prompt(`Player ${symbol}, enter your move (0-8): `), 10);

        // Validate input
        if (isNaN(index) || index < 0 || index > Gameboard.boardSize) {
            console.error('Invalid input. Please enter a number between 0 and 8.')
            return;
        }

        if (Gameboard.board[index] !== null) {
            console.error('Cell already occupied. Choose a different cell.');
            return;
        }

        Gameboard.board[index] = symbol;
        console.log(`Player ${symbol} placed at index ${index}`);
        console.log(Gameboard.board);
    }

    return { playMove }
}

const playerX = createPlayer('X');
const playerO = createPlayer('O');

while (!GameController.boardIsFull()) {
    GameController.takeTurn();
} 