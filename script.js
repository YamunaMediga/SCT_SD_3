const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const solveButton = document.getElementById('solve-btn');
const clearButton = document.getElementById('clear-btn');
const levelButtons = Array.from(document.querySelectorAll('#level-group button'));

let currentLevel = 'easy';

const puzzleBoards = {
    easy: [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ],
    medium: [
        [0, 2, 0, 6, 0, 8, 0, 0, 0],
        [5, 8, 0, 0, 0, 9, 7, 0, 0],
        [0, 0, 0, 0, 4, 0, 0, 0, 0],

        [3, 7, 0, 0, 0, 0, 5, 0, 0],
        [6, 0, 0, 0, 0, 0, 0, 0, 4],
        [0, 0, 8, 0, 0, 0, 0, 1, 3],

        [0, 0, 0, 0, 2, 0, 0, 0, 9],
        [0, 0, 0, 5, 0, 0, 0, 3, 7],
        [0, 0, 0, 4, 0, 0, 0, 6, 0]
    ],
    hard: [
        [0, 0, 0, 0, 0, 0, 0, 0, 6],
        [0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 5, 0, 0, 0],

        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],

        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
};

function createBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const input = document.createElement('input');
            input.className = 'cell';
            input.maxLength = 1;
            input.inputMode = 'numeric';
            input.setAttribute('data-row', row);
            input.setAttribute('data-col', col);
            input.addEventListener('input', handleInput);
            boardElement.appendChild(input);
        }
    }
}

function handleInput(event) {
    const input = event.target;
    const value = input.value.replace(/[^1-9]/g, '');
    input.value = value;
    input.classList.toggle('prefilled', Boolean(value));
}

function getBoardFromInputs() {
    const board = [];
    for (let row = 0; row < 9; row++) {
        board[row] = [];
        for (let col = 0; col < 9; col++) {
            const input = boardElement.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            const value = input.value.trim();
            board[row][col] = value === '' ? 0 : Number(value);
        }
    }
    return board;
}

function setBoard(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const input = boardElement.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            const value = board[row][col];
            input.value = value === 0 ? '' : value;
            input.classList.toggle('prefilled', value !== 0);
        }
    }
}

function isValidPlacement(board, row, col, value) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === value || board[i][col] === value) return false;
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
            if (board[r][c] === value) return false;
        }
    }
    return true;
}

function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let value = 1; value <= 9; value++) {
                    if (isValidPlacement(board, row, col, value)) {
                        board[row][col] = value;
                        if (solveSudoku(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function validateInitialBoard(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const value = board[row][col];
            if (value === 0) continue;
            for (let c = 0; c < 9; c++) {
                if (c !== col && board[row][c] === value) return false;
            }
            for (let r = 0; r < 9; r++) {
                if (r !== row && board[r][col] === value) return false;
            }
            const boxRow = Math.floor(row / 3) * 3;
            const boxCol = Math.floor(col / 3) * 3;
            for (let r = boxRow; r < boxRow + 3; r++) {
                for (let c = boxCol; c < boxCol + 3; c++) {
                    if ((r !== row || c !== col) && board[r][c] === value) return false;
                }
            }
        }
    }
    return true;
}

function solvePuzzle() {
    const board = getBoardFromInputs();
    if (!validateInitialBoard(board)) {
        statusElement.textContent = 'This puzzle has conflicting values.';
        statusElement.className = 'status error';
        return;
    }

    const workingBoard = board.map((row) => [...row]);
    const solved = solveSudoku(workingBoard);

    if (!solved) {
        statusElement.textContent = 'This puzzle has no solution.';
        statusElement.className = 'status error';
        return;
    }

    setBoard(workingBoard);
    statusElement.textContent = 'Puzzle solved successfully!';
    statusElement.className = 'status success';
}

function loadLevel(level) {
    currentLevel = level;
    setBoard(puzzleBoards[level]);
    statusElement.textContent = `${level.charAt(0).toUpperCase() + level.slice(1)} puzzle loaded.`;
    statusElement.className = 'status';

    levelButtons.forEach((button) => {
        const isActive = button.dataset.level === level;
        button.classList.toggle('active-level', isActive);
        button.classList.toggle('secondary', !isActive);
    });
}

solveButton.addEventListener('click', solvePuzzle);
clearButton.addEventListener('click', () => {
    setBoard(Array.from({ length: 9 }, () => Array(9).fill(0)));
    statusElement.textContent = 'Board cleared. Enter a new puzzle.';
    statusElement.className = 'status';
});

levelButtons.forEach((button) => {
    button.addEventListener('click', () => loadLevel(button.dataset.level));
});

createBoard();
loadLevel(currentLevel);
