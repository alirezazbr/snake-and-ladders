// script.js

// Create the game board
const board = document.getElementById("board");
const diceResultDisplay = document.getElementById("diceResult");
const player1PositionDisplay = document.getElementById("player1Position");
const player2PositionDisplay = document.getElementById("player2Position");
const currentPlayerDisplay = document.getElementById("currentPlayer");

let player1Position = 1;
let player2Position = 1;
let currentPlayer = 1;

const snakesAndLadders = {
  4: 14,
  9: 31,
  17: 7,
  20: 38,
  28: 84,
  40: 59,
  51: 67,
  63: 81,
  64: 60,
  89: 26,
  95: 75,
  99: 78,
};

const ladders = [
  { start: 4, end: 14 },
  { start: 9, end: 31 },
  { start: 20, end: 38 },
  { start: 28, end: 84 },
  { start: 40, end: 59 },
  { start: 51, end: 67 },
  { start: 63, end: 81 },
];

// Generate board cells
for (let i = 100; i > 0; i--) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.innerText = i;
  cell.dataset.number = i;
  board.appendChild(cell);
}

// Add ladders
ladders.forEach((ladder) => {
  const startCell = document.querySelector(
    `.cell[data-number="${ladder.start}"]`
  );
  const endCell = document.querySelector(`.cell[data-number="${ladder.end}"]`);
  const ladderImage = document.createElement("img");
  ladderImage.src = "ladder.svg"; // Path to your ladder image
  ladderImage.classList.add("ladder");

  const startRect = startCell.getBoundingClientRect();
  const endRect = endCell.getBoundingClientRect();

  const boardRect = board.getBoundingClientRect();

  const startX = startRect.left - boardRect.left;
  const startY = startRect.top - boardRect.top;
  const endX = endRect.left - boardRect.left;
  const endY = endRect.top - boardRect.top;

  ladderImage.style.left = `${Math.min(startX, endX) + 25}px`; // Adjust 25 for center alignment
  ladderImage.style.top = `${Math.min(startY, endY) + 25}px`; // Adjust 25 for center alignment
  ladderImage.style.width = `${Math.abs(endX - startX)}px`;
  ladderImage.style.height = `${Math.abs(endY - startY)}px`;

  board.appendChild(ladderImage);
});

// Roll dice functionality
document.getElementById("rollDice").addEventListener("click", () => {
  const diceRoll = Math.floor(Math.random() * 6) + 1;
  diceResultDisplay.innerText = `Dice: ${diceRoll}`;
  movePlayer(diceRoll);
});

// Move player
function movePlayer(diceRoll) {
  if (currentPlayer === 1) {
    player1Position += diceRoll;
    if (snakesAndLadders[player1Position]) {
      player1Position = snakesAndLadders[player1Position];
    }
    if (player1Position > 100) {
      player1Position = 100;
    }
    player1PositionDisplay.innerText = `Player 1 Position: ${player1Position}`;
    if (player1Position === 100) {
      alert("Congratulations! Player 1 won!");
      resetGame();
      return;
    }
    currentPlayer = 2;
  } else {
    player2Position += diceRoll;
    if (snakesAndLadders[player2Position]) {
      player2Position = snakesAndLadders[player2Position];
    }
    if (player2Position > 100) {
      player2Position = 100;
    }
    player2PositionDisplay.innerText = `Player 2 Position: ${player2Position}`;
    if (player2Position === 100) {
      alert("Congratulations! Player 2 won!");
      resetGame();
      return;
    }
    currentPlayer = 1;
  }
  currentPlayerDisplay.innerText = `Current Player: ${currentPlayer}`;
}

// Reset game
function resetGame() {
  player1Position = 1;
  player2Position = 1;
  currentPlayer = 1;
  player1PositionDisplay.innerText = `Player 1 Position: 1`;
  player2PositionDisplay.innerText = `Player 2 Position: 1`;
  diceResultDisplay.innerText = "Dice: -";
  currentPlayerDisplay.innerText = `Current Player: 1`;
}
