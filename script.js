const boardSize = 9;
const boardDiv = document.getElementById('gameboard');

// Setup grid
for (let i = 0; i < boardSize; i++) {
    const btn = document.createElement('button');
    btn.classList.add('cell');
    btn.dataset.index = i;
    boardDiv.appendChild(btn);
}

const Gameboard = (function () {
    const board = Array(boardSize).fill(null);

    const displayBoard = () => {
        let display = '';
        for (let i = 0; i < board.length; i++) {
            display += board[i] || '-';
            if ((i + 1) % 3 === 0) display += '\n';
            else display += ' ';
        }
        console.log(display);
    };

    return { boardSize, board, displayBoard };
})();

const GameController = (function () {
    const boardIsFull = () => {
        return Gameboard.board.every(item => typeof item === 'string');
    };

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
        ];

        for (const condition of winConditions) {
            if (condition.every(index => Gameboard.board[index] === symbol)) {
                console.log(`\nPlayer ${symbol} has won the game!`);
                return true;
            }
        }
        return false;
    };

    return { boardIsFull, gameIsWon };
})();

function createPlayer(symbol) {
    const playMove = () => {
        while (true) {
            // const index = parseInt(prompt(`Player ${symbol}, enter your move (0-8): `), 10);

            if (isNaN(index) || index < 0 || index >= Gameboard.boardSize) {
                console.error('Invalid input. Please enter a number between 0 and 8.');
                continue;
            }

            if (Gameboard.board[index] !== null) {
                console.error('Cell already occupied. Choose a different cell.');
                continue;
            }

            Gameboard.board[index] = symbol;
            Gameboard.displayBoard();
            break;
        }
    };

    return { symbol, playMove };
}

const playerX = createPlayer('X');
const playerO = createPlayer('O');

// Game loop
console.log('Welcome to Tic-Tac-Toe!\n');
Gameboard.displayBoard();

while (true) {
    playerX.playMove();
    if (GameController.gameIsWon(playerX.symbol)) break;
    if (GameController.boardIsFull()) {
        console.log('\nIt\'s a draw!');
        break;
    }

    playerO.playMove();
    if (GameController.gameIsWon(playerO.symbol)) break;
    if (GameController.boardIsFull()) {
        console.log('\nIt\'s a draw!');
        break;
    }
}
