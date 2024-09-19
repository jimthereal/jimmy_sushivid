'use strict'

const statusDisplay = document.getElementById('status');
const countField = document.getElementById('numberTurns');
const startBox = document.getElementById('startBox');
const playField = document.getElementById('field');
const player1_name = document.getElementById('player1_name');
const player2_name = document.getElementById('player2_name');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

let gameActive = true;
let currentPlayer = 'X';
let gameState = [];
let cols, rows, steps, counter = 0;

const winMessage = () => `${currentPlayer} has won!`;
const nobodyWinsMessage = () => 'It\'s a draw!';

// ----------------------------GAME START----------------------------

// Function to check & limit input values
let checkInput = (input) => {
    input = +input;
    input = (input < 3)
        ? 3 : (input > 10)
            ? 10 : input;
    return input;
}

// Create game board (Matrix) with rows and columns
// Initialize each cell with 0
let createMatrix = () => {
    let arr; // Array to hold each row of matrix
    for (let i = 0; i < rows; i++) {
        arr = [];
        for (let j = 0; j < cols; j++) {
            arr[j] = 0;
        }
        gameState[i] = arr;
    }
    console.log(gameState); // Log gameState for debugging purposes
}

// Visually draw the game field based on matrix dimensions
let drawField = () => {
    let cellSize = window.innerHeight * 0.5 / cols; // Calculate size of each cell relative to window height
    let box = document.createElement('div'); // Create a container for the field
    box.setAttribute('id', 'container'); // Set id to 'container'

    let cell, row;
    for (let i = 0; i < rows; i++) {
        row = document.createElement('div'); // New row div
        row.className = 'row';
        for (let j = 0; j < cols; j++) {
            cell = document.createElement('div'); // New cell div
            cell.setAttribute('id', `${i}_${j}`);
            cell.className = 'cell';
            // Set cell dimensions & font size based on calculated cell size
            cell.style.width = cell.style.height = cell.style.lineHeight = `${cellSize}px`;
            cell.style.fontSize = `${cellSize / 16}em`;
            row.appendChild(cell); // Add cell to current row
        }
        box.appendChild(row); // Add row to container
    }
    playField.appendChild(box); // Add entire container to field
}

// Start game - Initialize player names, dimensions, game field
let handleStart = () => {
    // Defaulting player names if no names provided
    player1.innerHTML = player1_name.value === '' ? 'Player \'X\'' : player1_name.value;
    player2.innerHTML = player2_name.value === '' ? 'Player \'O\'' : player2_name.value;
    
    // Check values of columns, rows, steps
    cols = checkInput(document.getElementById('columns').value);
    rows = checkInput(document.getElementById('rows').value);
    steps = checkInput(document.getElementById('steps').value);
    
    createMatrix();
    drawField();

    startBox.className = 'hidden'; // Hide the start box once started
    handlePlayerSwitch();

    // Detect clicks using Event Listeners
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleClick));
}


// ----------------------------WINNING ALGORITHM----------------------------

let isWinning = (x, y) => {
    let winner = currentPlayer === 'X' ? 1 : 2,
        length = steps * 2 - 1, // Total number of cells that will be check
        radius = steps - 1, // How far to check in each direction
        // In Tic Tac Toe, the check is limited by the grid size
        countWinMoves, winCoordinates;

    // Vertical, only "i" should increment
    countWinMoves = 0;
    winCoordinates = [];
    for (let i = x - radius, k = 0; k < length; k++, i++) {
        // Fixed 'y' as constant
        // e.g. Check from (0, 1) to (2, 1)
        if (i >= 0 && i < rows && y >= 0 && y < cols && gameState[i][y] === winner && gameActive) {
            winCoordinates[countWinMoves++] = [i, y];
            if (countWinMoves === steps) {
                winActions(winCoordinates);
                return;
            }
        } else {
            countWinMoves = 0;
            winCoordinates = [];
        }
    }

    // Horizontal, only "j" should increment
    countWinMoves = 0;
    winCoordinates = [];
    for (let j = y - radius, k = 0; k < length; k++, j++) {
        // Fixed 'x' as constant
        if (x >= 0 && x < rows && j >= 0 && j < cols && gameState[x][j] === winner && gameActive) {
            winCoordinates[countWinMoves++] = [x, j];
            if (countWinMoves === steps) {
                winActions(winCoordinates);
                return;
            }
        } else {
            countWinMoves = 0;
            winCoordinates = [];
        }
    }

    // "\" (top-left to bottom-right)
    countWinMoves = 0;
    winCoordinates = [];
    for (let i = x - radius, j = y - radius, k = 0; k < length; k++, i++, j++) { // Increment both 'i' 'j' for "\"
        if (i >= 0 && i < rows && j >= 0 && j < cols && gameState[i][j] === winner && gameActive) {
            winCoordinates[countWinMoves++] = [i, j];
            if (countWinMoves === steps) {
                winActions(winCoordinates);
                return;
            }
        } else {
            countWinMoves = 0;
            winCoordinates = [];
        }
    }

    // "/" (top-right to bottom-left)
    countWinMoves = 0;
    winCoordinates = [];
    for (let i = x - radius, j = y + radius, k = 0; k < length; k++, i++, j--) { // Increment 'i', decrement 'j'
        if (i >= 0 && i < rows && j >= 0 && j < cols && gameState[i][j] === winner && gameActive) {
            winCoordinates[countWinMoves++] = [i, j];
            if (countWinMoves === steps) {
                winActions(winCoordinates);
                return;
            }
        } else {
            countWinMoves = 0;
            winCoordinates = [];
        }
    }
}

// ----------------------------GAME ONGOING----------------------------

// Change both players' background colors to indicate whose turn
let handlePlayerSwitch = () => {
    if (currentPlayer === 'X') {
        player1.style.background = '#8458B3';
        player2.style.background = '#d0bdf4';
    } else {
        player1.style.background = '#d0bdf4';
        player2.style.background = '#8458B3';
    }
}

// Check draw
let isMovesLeft = () => {
    if (counter === cols * rows) {
        statusDisplay.innerHTML = nobodyWinsMessage();
        gameActive = false;
    }
}

// Update after every clicks happen
let handleClick = (event) => {
    let clickedIndex = event.target.getAttribute('id').split('_');
    let i = +clickedIndex[0];
    let j = +clickedIndex[1];

    // Game ends
    if (gameState[i][j] !== 0 || !gameActive) {
        return;
    }

    gameState[i][j] = (currentPlayer === 'X') ? 1 : 2;
    event.target.innerHTML = currentPlayer;
    countField.innerHTML = `${++counter}`;

    isWinning(i, j); // Check win first
    // Only check for draw if no win was found
    if (gameActive) {
        isMovesLeft();
    }

    // Switch players' turn
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    handlePlayerSwitch();
}

// ----------------------------RESULTS----------------------------

// Display winner
function winActions(winner) {
    console.log(winner);

    gameActive = false;
    statusDisplay.innerHTML = winMessage();
    statusDisplay.style.color = '#139de2';

    let cell;
    for (let i = 0; i < winner.length; i++) {
        cell = document.getElementById(`${winner[i][0]}_${winner[i][1]}`);
        cell.style.color = '#139de2';
    }
}

// ----------------------------RESET----------------------------

let handlePlayAgain = () => {
    gameActive = true;
    currentPlayer = 'X';
    counter = 0;
    countField.innerHTML = '0';
    statusDisplay.innerHTML = '';
    statusDisplay.style.color = 'black';
    player1.style.background = player2.style.background = '#d0bdf4';
    playField.removeChild(document.getElementById('container'));
    handleStart();
}

let handleRestart = () => {
    gameActive = true;
    currentPlayer = 'X';
    counter = 0;
    countField.innerHTML = '0';
    statusDisplay.innerHTML = '';
    statusDisplay.style.color = 'black';
    player1.style.background = player2.style.background = '#d0bdf4';
    player1_name.value = player2_name.value = '';
    player1.innerHTML = player2.innerHTML = '-';
    startBox.className = 'sidebar';
    playField.removeChild(document.getElementById('container'));
}

document.querySelector('#start').addEventListener('click', handleStart);
document.querySelector('#playAgain').addEventListener('click', handlePlayAgain);
document.querySelector('#restart').addEventListener('click', handleRestart);