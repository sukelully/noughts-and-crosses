const Gameboard = (function () {
    const boardSize = 9;
    const board = Array(boardSize).fill(null);
    const boardDiv = document.getElementById('gameboard');

    // Setup grid
    for (let i = 0; i < boardSize; i++) {
        const btn = document.createElement('button');
        btn.classList.add('cell');
        btn.dataset.index = i;
        btn.addEventListener('click', () => {
            GameController.takeTurn(btn.dataset.index, btn);
        });
        boardDiv.appendChild(btn);
    }

    // Display board in console
    const displayBoard = () => {
        let display = '';
        for (let i = 0; i < board.length; i++) {
            display += board[i] || '-';
            if ((i + 1) % 3 === 0) display += '\n';
            else display += ' ';
        }
        console.log(display);
    };

    // Instantiate player
    const createPlayer = (player) => {
        const symbol = (player === 'X' ? '&#10005;' : '&#11096;');
        const playMove = (index) => {
            Gameboard.board[index] = symbol;
            Gameboard.displayBoard();
        };

        return { symbol, playMove };
    }

    return { boardSize, board, displayBoard, createPlayer };
})();

const GameController = (function () {
    let gameOver = false;
    const turnStatusIndicator = document.getElementById('turn-status');
    const gameStatusIndicator = document.getElementById('game-status');

    // Board is full, game ended in a draw
    const boardIsFull = () => {
        gameOver = true;
        gameStatusIndicator.innerHTML = `It's a draw!`
        return Gameboard.board.every(item => typeof item === 'string');
    };

    // A win condition is active
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
                turnStatusIndicator.innerHTML = '';
                gameStatusIndicator.innerHTML =`${symbol} wins!`;
                gameOver = true;
                return true;
            }
        }
        return false;
    };

    const takeTurn = (index, btn) => {
        const count = Gameboard.board.filter(item => item !== null).length;

        if (Gameboard.board[index] !== null) {
            console.error('Invalid choice: Cell is already occupied.');
            return;
        }

        if (gameOver) {
            return;
        }

        if (count % 2 === 0) {
            playerX.playMove(index);
            turnStatusIndicator.innerHTML = `${playerO.symbol}'s turn`;
            btn.innerHTML = `${playerX.symbol}`;
            if (gameIsWon(playerX.symbol)) return;
        } else {
            playerO.playMove(index);
            btn.innerHTML = `${playerO.symbol}`;
            if (gameIsWon(playerO.symbol)) return;
            turnStatusIndicator.innerHTML = `${playerX.symbol}'s turn`;
        }
    }

    const restartGame = () => {
        const cells = Array.from(document.getElementsByClassName('cell'));
        cells.forEach(cell => cell.innerHTML = '');
        gameOver = false;
        Gameboard.board = Array(Gameboard.boardSize).fill(null);
        turnStatusIndicator.innerHTML = `${playerX.symbol}'s turn`;
        gameStatusIndicator.innerHTML = '';
    }

    const restartBtn = document.getElementById('restart');
    restartBtn.addEventListener('click', restartGame);

    return { boardIsFull, takeTurn, turnStatusIndicator };
})();

const playerX = Gameboard.createPlayer('X');
const playerO = Gameboard.createPlayer('O');