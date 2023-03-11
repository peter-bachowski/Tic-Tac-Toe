////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//global variables and factory functions(objects)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const gridContainer = document.getElementById("gridContainer");
const gridCell = document.createElement("div");

const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submit");
const resetBtn = document.getElementById("resetBtn");
const cancelBtn = document.getElementById("cancelBtn");

const player1ScoreContainer = document.getElementById("player1ScoreContainer");
const player2ScoreContainer = document.getElementById("player2ScoreContainer");
const playerHeader = document.getElementById("playerHeader");

const lightbox = document.getElementById("lightbox");
const formContainer = document.getElementById("formContainer");

const playerInputsContainer = document.getElementById("playerInputsContainer");
const option1 = document.getElementById("oneVsOne");
const option2 = document.getElementById("vsAI");

const player = (name, symbol) => { return { name, symbol }; };

const CellObj = (cellCount, symbol) => {
  const cellId = "cell_" + cellCount;
  const cellElement = gridCell.cloneNode(true);
  this.symbol = symbol;
  return { cellElement, cellId, symbol };
};

let cellArray = [];
let cellElements;
let startPressed = false;
let player1;
let player2;
let currentPlayer;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createCells() { //creates the cells
  removePlayerInputsContainer();
  gridCell.classList.add("gridCell");
  for (let cellCount = 0; cellCount < 9; cellCount++) {
    const newCell = CellObj(cellCount);
    newCell.cellElement.id = newCell.cellId;
    cellArray[cellCount] = newCell;
    gridContainer.appendChild(newCell.cellElement);
  }
  cellElements = document.getElementsByClassName("gridCell");
}


function submit(event) {
  event.preventDefault();

  playOneVsOne();

  let player1Name = document.getElementById("player1Name");
  let player2Name = document.getElementById("player2Name");

  player1 = player(player1Name.value, "X");
  player2 = player(player2Name.value, "O");

  currentPlayer = player1.name;

  player1ScoreContainer.innerText = player1Name.value + ": X";
  player2ScoreContainer.innerText = player2Name.value + ": O";

  startPressed = true;
  lightbox.className = "off";

  playerHeader.innerText = currentPlayer + "'s Turn!";

  removePlayerInputsContainer();
}


function clear() {
  for (let i = 0; i < cellElements.length; i++) {
    cellElements[i].innerText = "";
  }
  playerHeader.innerText = "";
  for (let i = 0; i < cellArray.length; i++) {
    cellArray[i].symbol = "";
  }

  player1ScoreContainer.innerText = "";
  player2ScoreContainer.innerText = "";

  removePlayerInputsContainer();

  startPressed = false;
}


function playOneVsOne() {
  for (let i = 0; i < cellElements.length; i++) {
    cellElements[i].onclick = () => {
      if (startPressed === true) {
        if (currentPlayer === player1.name) {
          if (cellElements[i].innerText === "") {
            cellElements[i].innerText = "X";
            cellArray[i].symbol = "X"
            currentPlayer = player2.name;
            playerHeader.innerText = currentPlayer + "'s Turn!";
            checkScores();
          }
        }
        else {
          if (cellElements[i].innerText === "") {
            cellElements[i].innerText = "O";
            cellArray[i].symbol = "O"
            currentPlayer = player1.name;
            playerHeader.innerText = currentPlayer + "'s Turn!";
            checkScores();
          }
        }
      }
    }
  }
}


function checkScores() { //checks if there is three in a row of whichever symbol anywhere
  if (
    (cellArray[0].symbol === "X" && cellArray[1].symbol === "X" && cellArray[2].symbol === "X") ||
    (cellArray[3].symbol === "X" && cellArray[4].symbol === "X" && cellArray[5].symbol === "X") ||
    (cellArray[6].symbol === "X" && cellArray[7].symbol === "X" && cellArray[8].symbol === "X") ||
    (cellArray[0].symbol === "X" && cellArray[3].symbol === "X" && cellArray[6].symbol === "X") ||
    (cellArray[1].symbol === "X" && cellArray[4].symbol === "X" && cellArray[7].symbol === "X") ||
    (cellArray[2].symbol === "X" && cellArray[5].symbol === "X" && cellArray[8].symbol === "X") ||
    (cellArray[0].symbol === "X" && cellArray[4].symbol === "X" && cellArray[8].symbol === "X") ||
    (cellArray[2].symbol === "X" && cellArray[4].symbol === "X" && cellArray[6].symbol === "X")
  ) {
    playerHeader.innerText = player1.name + " is the Winner!"
    startPressed = false;
  }

  else if (
    (cellArray[0].symbol === "O" && cellArray[1].symbol === "O" && cellArray[2].symbol === "O") ||
    (cellArray[3].symbol === "O" && cellArray[4].symbol === "O" && cellArray[5].symbol === "O") ||
    (cellArray[6].symbol === "O" && cellArray[7].symbol === "O" && cellArray[8].symbol === "O") ||
    (cellArray[0].symbol === "O" && cellArray[3].symbol === "O" && cellArray[6].symbol === "O") ||
    (cellArray[1].symbol === "O" && cellArray[4].symbol === "O" && cellArray[7].symbol === "O") ||
    (cellArray[2].symbol === "O" && cellArray[5].symbol === "O" && cellArray[8].symbol === "O") ||
    (cellArray[0].symbol === "O" && cellArray[4].symbol === "O" && cellArray[8].symbol === "O") ||
    (cellArray[2].symbol === "O" && cellArray[4].symbol === "O" && cellArray[6].symbol === "O")
  ) {
    playerHeader.innerText = player2.name + " is the winner!";
    startPressed = false;
  }
}

function addPlayerInputsContainer() {
  formContainer.appendChild(playerInputsContainer);
}

function removePlayerInputsContainer() {
  playerInputsContainer.remove();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//onclick functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

startBtn.onclick = () => {
  lightbox.className = "on";
  clear();
}

cancelBtn.onclick = () => {
  lightbox.className = "off";
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//listeners
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

submitBtn.addEventListener("click", submit);

option1.addEventListener("click", addPlayerInputsContainer);

resetBtn.addEventListener("click", clear);



////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//program start
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


createCells();



