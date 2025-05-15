const Gameboard = (function () {
    let index;
    const boardSize = 9;
    const board = Array(boardSize).fill(null);
    const boardDiv = document.getElementById('gameboard');


    // Setup grid
    for (let i = 0; i < boardSize; i++) {
        const btn = document.createElement('button');
        btn.classList.add('cell');
        btn.dataset.index = i;
        btn.addEventListener('click', () => {
            GameController.takeTurn(btn.dataset.index);
        });
        boardDiv.appendChild(btn);
    }

    const displayBoard = () => {
        let display = '';
        for (let i = 0; i < board.length; i++) {
            display += board[i] || '-';
            if ((i + 1) % 3 === 0) display += '\n';
            else display += ' ';
        }
        console.log(display);
    };

    const createPlayer = (symbol) => {
        const playMove = (index) => {
            Gameboard.board[index] = symbol;
            Gameboard.displayBoard();
            // console.log(Gameboard.board);
            console.log(index);
            console.log(symbol);
        };
    
        return { symbol, playMove };
    }

    return { boardSize, board, displayBoard, createPlayer };
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

    const takeTurn = (index) => {
        const count = Gameboard.board.filter(item => item !== null).length;

        if (count % 2 === 0) {
            playerX.playMove(index)
        } else {
            playerO.playMove(index);
        }
    }

    return { boardIsFull, gameIsWon, takeTurn };
})();

const playerX = Gameboard.createPlayer('X');
const playerO = Gameboard.createPlayer('O');

// Game loop
console.log('Welcome to Tic-Tac-Toe!\n');
Gameboard.displayBoard();

// while (true) {
//     playerX.playMove();
//     if (GameController.gameIsWon(playerX.symbol)) break;
//     if (GameController.boardIsFull()) {
//         console.log('\nIt\'s a draw!');
//         break;
//     }

//     playerO.playMove();
//     if (GameController.gameIsWon(playerO.symbol)) break;
//     if (GameController.boardIsFull()) {
//         console.log('\nIt\'s a draw!');
//         break;
//     }
// }
