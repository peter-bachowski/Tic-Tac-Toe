//global variables and factory functions(objects)

const gridContainer = document.getElementById("gridContainer");
const gridCell = document.createElement("div");
const startBtn = document.getElementById("startBtn");
const lightbox = document.getElementById("lightbox");
const submitBtn = document.getElementById("submit");
const resetBtn = document.getElementById("resetBtn");
const player1ScoreContainer = document.getElementById("player1ScoreContainer");
const player2ScoreContainer = document.getElementById("player2ScoreContainer");
const playerHeader = document.getElementById("playerHeader");

const player = (name, symbol) => { return { name, symbol }; };

const CellObj = (cellCount) => {
  const cellId = "cell_" + cellCount;
  const cellElement = gridCell.cloneNode(true);
  return { cellElement, cellId };
};

let cellArray = [];
let startPressed = false;
let player1;
let player2;
let currentPlayer;
let playerWin = false;


//functions

function createCells() { //creates the cells
  gridCell.classList.add("gridCell");
  for (let cellCount = 0; cellCount < 9; cellCount++) {
    const newCell = CellObj(cellCount);
    newCell.cellElement.id = newCell.cellId;
    cellArray[cellCount] = newCell;
    gridContainer.appendChild(newCell.cellElement);
  }
}

function submit(event) {
  event.preventDefault();

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
}

function playGame() {
  const cellElements = document.getElementsByClassName("gridCell");
  for (let i = 0; i < cellElements.length; i++) {
    cellElements[i].onclick = () => {
      if (currentPlayer === player1.name) {
        if (cellElements[i].innerText === ""){
          cellElements[i].innerText = "X";
          currentPlayer = player2.name;
          playerHeader.innerText = currentPlayer + "'s Turn!";  
        }
      }
      else {
        if (cellElements[i].innerText === "") {
          cellElements[i].innerText = "O";
          currentPlayer = player1.name;
          playerHeader.innerText = currentPlayer + "'s Turn!";  
        }
      }
    }
  }
}


//onclick functions

startBtn.onclick = () => {
  lightbox.className = "on";
}

resetBtn.onclick = () => {
  const cellElements = document.getElementsByClassName("gridCell");
  for (let i = 0; i < cellElements.length; i++) {
    cellElements[i].innerText = "";
  }
  startPressed = false;
}


//listeners

submitBtn.addEventListener("click", submit);


//program start

createCells();

playGame();

