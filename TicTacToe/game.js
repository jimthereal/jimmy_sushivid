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

const winMessage = () => '${currentPlayer} has won!';
const nobodyWinsMessage = () => 'It\'s a draw!';

// ----------------------------GAME START----------------------------
let checkInput = (input) => {
    input = +input;
    input = (input < 3)
        ? 3 : (input > 10)
            ? 10 : input;
    return input;
}

let createMatrix = () => {
    let arr;
    for (let i = 0; i < rows; i++) {
        arr = [];
        for (let j = 0; j < cols; j++) {
            arr[j] = 0;
        }
        gameState[i] = arr;
    }
    console.log(gameState);
}

let drawField = () => {
    let cellSize = window.innerHeight * 0.5 / cols;
    let box = document.createElement('div');
    box.setAttribute('id', 'container');

    let cell, row;
    for (let i = 0; i < rows; i++) {
        row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < cols; j++) {
            cell = document.createElement('div');
            cell.setAttribute('id', '${i}_${j}');
            cell.className = 'cell';
            cell.style.width = cell.style.height = cell.style.lineHeight = '${cellSize}px';
            cell.style.fontSize = '${cellSize / 16}em';
            row.appendChild(cell);
        }
        box.appendChild(row);
    }
    playField.appendChild(box);
}

let handleStart = () => {
    player1.innerHTML = player1_name.value === '' ? 'Player \'X\'' : player1_name.value;
    player2.innerHTML = player2_name.value === '' ? 'Player \'O\'' : player2_name.value;
    cols = checkInput(document.getElementById('columns').value);
    rows = checkInput(document.getElementById('columns').value);
    
}