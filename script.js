////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//global variables and factory functions(objects)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const gridContainer = document.getElementById("gridContainer");
const gridCell = document.createElement("div");

const startBtn = document.getElementById("startBtn");
const submitBtnOneVsOne = document.getElementById("submitBtnOneVsOne");
const submitBtnVsAI = document.getElementById("submitBtnVsAI");
const resetBtn = document.getElementById("resetBtn");
const cancelBtnOneVsOne = document.getElementById("cancelBtnOneVsOne");
const cencelBtnVsAI = document.getElementById("cancelBtnVsAI");

const player1ScoreContainer = document.getElementById("player1ScoreContainer");
const player2ScoreContainer = document.getElementById("player2ScoreContainer");
const scoreHeader = document.getElementById("scoreHeader");
const sidebarHeader = document.getElementById("sidebarHeader");

const lightbox = document.getElementById("lightbox");
const formContainer = document.getElementById("formContainer");

const playerInputsContainer = document.getElementById("playerInputsContainer");
const submitContainerAI = document.getElementById("submitContainerAI");
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
let vsAiPressed; //boolean if playing vs AI or not

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createCells() { //creates the cells
  removeBothOptions();
  gridCell.classList.add("gridCell");
  for (let cellCount = 0; cellCount < 9; cellCount++) {
    const newCell = CellObj(cellCount);
    newCell.cellElement.id = newCell.cellId;
    cellArray[cellCount] = newCell;
    gridContainer.appendChild(newCell.cellElement);
  }
  cellElements = document.getElementsByClassName("gridCell");
}


function submitOneVsOne(event) {
  event.preventDefault();

  vsAiPressed = false;

  let player1Name = document.getElementById("player1Name"); //gets the input elements from form
  let player2Name = document.getElementById("player2Name");

  player1 = player(player1Name.value, "X"); //asigns the names of each player from the form inputs
  player2 = player(player2Name.value, "O");

  currentPlayer = player1.name; //game starts current player with player 1

  player1ScoreContainer.innerText = player1Name.value + ": X"; //shows which player has what symbol in the sidebar
  player2ScoreContainer.innerText = player2Name.value + ": O";

  startPressed = true;
  lightbox.className = "off";

  sidebarHeader.innerText = currentPlayer + " goes first!";

  removeBothOptions(); //removes both containers from form for next game

  playGame();
}

function submitVsAI(event) {
  event.preventDefault();

  vsAiPressed = true;

  player1 = player("player 1", "X"); 
  player2 = player("player 2", "O");

  currentPlayer = player1.name;

  player1ScoreContainer.innerText = "player 1: X"; //shows which player has what symbol in the sidebar
  player2ScoreContainer.innerText = "AI: O";

  startPressed = true;
  lightbox.className = "off";

  sidebarHeader.innerText = currentPlayer + " goes first!";

  removeBothOptions(); //removes both containers from form for next game

  playGame();
}


function reset() {
  for (let i = 0; i < cellElements.length; i++) {
    cellElements[i].innerText = "";
  }
  scoreHeader.innerText = "";
  for (let i = 0; i < cellArray.length; i++) {
    cellArray[i].symbol = "";
  }

  player1ScoreContainer.innerText = "";
  player2ScoreContainer.innerText = "";

  option1.checked = false;
  option2.checked = false;

  removeBothOptions();

  startPressed = false;
  vsAiPressed = false;
}


function playGame() {

  if (vsAiPressed === false) {
    for (let i = 0; i < cellElements.length; i++) { //for every cell element add an onclick funtion
      cellElements[i].onclick = () => {
        if (startPressed === true) { //used so users can't press a cell unless start was pressed
          if (currentPlayer === player1.name) { //if current player is player 1
            if (cellElements[i].innerText === "") {
              cellElements[i].innerText = "X"; //adds the player 1 symbol to the cell
              cellArray[i].symbol = "X"; //adds the X symbol to the ojbect
              currentPlayer = player2.name;
              sidebarHeader.innerText = currentPlayer + "'s Turn!";
              checkScores();
            }
          }
          else {
            if (cellElements[i].innerText === "") {
              cellElements[i].innerText = "O";
              cellArray[i].symbol = "O"
              currentPlayer = player1.name;
              sidebarHeader.innerText = currentPlayer + "'s Turn!";
              checkScores();
            }
          }
        }
      }
    }
  }
  else if (vsAiPressed === true){
    for (let i = 0; i < cellElements.length; i++) { //for every cell element add an onclick funtion
      cellElements[i].onclick = () => {
        if (startPressed === true) { //used so users can't press a cell unless start was pressed
          if (currentPlayer === player1.name) { //if current player is player 1
            if (cellElements[i].innerText === "") {
              cellElements[i].innerText = "X"; //adds the player 1 symbol to the cell
              cellArray[i].symbol = "X"; //adds the X symbol to the ojbect
              sidebarHeader.innerText = currentPlayer + "'s Turn!";
              checkScores();
              recurseAiChoice();
            }
          }
        }
      }
    }
  }
}

function recurseAiChoice() {
  let randomCellNumber = Math.floor(Math.random() * 9);
  if (cellElements[randomCellNumber].innerText === ""){
    cellElements[randomCellNumber].innerText = "O";
    cellArray[randomCellNumber].symbol = "O";
  }
  else {
    recurseAiChoice();
  }
  checkScores();
}

function isTie() {

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
    sidebarHeader.innerText = player1.name + " is the Winner!"
    scoreHeader.innerText = "Game Over!"
    startPressed = false;
    return true;
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
    sidebarHeader.innerText = player2.name + " is the winner!";
    scoreHeader.innerText = "Game Over!";

    startPressed = false;
    return true;
  }
}

function addPlayerInputsContainer() {formContainer.appendChild(playerInputsContainer);}

function addSubmitContainerAI() {formContainer.appendChild(submitContainerAI);}

function removePlayerInputsContainer() {playerInputsContainer.remove();}

function removeSubmitContainerAI() {submitContainerAI.remove();}

function removeBothOptions() {
  removePlayerInputsContainer();
  removeSubmitContainerAI();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//onclick functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

startBtn.onclick = () => {
  lightbox.className = "on";
  reset();
}

cancelBtnOneVsOne.onclick = () => {
  lightbox.className = "off";
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//listeners
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

submitBtnOneVsOne.addEventListener("click", submitOneVsOne);
submitBtnVsAI.addEventListener("click", submitVsAI);

option1.addEventListener("click", () => {
  removeBothOptions();
  addPlayerInputsContainer();
});

option2.addEventListener("click", () => {
  removeBothOptions();
  addSubmitContainerAI();
});

resetBtn.addEventListener("click", reset);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//program start
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


createCells();



