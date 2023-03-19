////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//global variables and factory functions(objects)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const container = document.getElementById("container");
const gridContainer = document.getElementById("gridContainer");
const gridCell = document.createElement("div");

const startBtn = document.getElementById("startBtn");
const submitBtnOneVsOne = document.getElementById("submitBtnOneVsOne");
const submitBtnVsAI = document.getElementById("submitBtnVsAI");
const resetBtn = document.getElementById("resetBtn");
const cancelBtnOneVsOne = document.getElementById("cancelBtnOneVsOne");
const cencelBtnVsAI = document.getElementById("cancelBtnVsAI");

const sidebar = document.getElementById("sidebar");
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
let boardState = [];
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
              findBoardState();
              isEndGame(boardState);
            }
          }
          else {
            if (cellElements[i].innerText === "") {
              cellElements[i].innerText = "O";
              cellArray[i].symbol = "O"
              currentPlayer = player1.name;
              sidebarHeader.innerText = currentPlayer + "'s Turn!";
              findBoardState();
              isEndGame(boardState);
            }
          }
        }
      }
    }
  }
  else if (vsAiPressed === true) {
    for (let i = 0; i < cellElements.length; i++) { //for every cell element add an onclick funtion
      cellElements[i].onclick = () => {
        if (startPressed === true) { //used so users can't press a cell unless start was pressed
          if (currentPlayer === player1.name) { //if current player is player 1
            if (cellElements[i].innerText === "") {
              cellElements[i].innerText = "X"; //adds the player 1 symbol to the cell
              cellArray[i].symbol = "X"; //adds the X symbol to the ojbect
              sidebarHeader.innerText = currentPlayer + "'s Turn!";
              findBoardState();
              if (isEndGame(boardState) === false) {
                recurseAiChoice()
              }
            }
          }
        }
      }
    }
  }
}

function findBoardState() {
  boardState = [];
   for (let i = 0; i < cellArray.length; i++) {
    boardState.push(cellArray[i].symbol);
   }
}

function findBestMove(boardState, player) {
  let bestMove = null;
  let tempBoardState = [];
  for (let i = 0; i < boardState.length; i ++) { //clones boardState to tempBoardState
    tempBoardState.push(boardState[i]);
  }
  for (let cellNum = 0; cellNum < boardState.length; cellNum ++) {
    if (boardState[cellNum] === "") {
      if (player === player1) {
        tempBoardState[cellNum] = "X";
      }
      else if (player === player2) {
        tempBoardState[cellNum] = "O";
      }
      if (isEndGame(tempBoardState)) {
        bestMove = cellNum;
        return bestMove;
      }
      tempBoardState[cellNum] = "";
    }
  }
  return Math.floor(Math.random() * 9);
}

function recurseAiChoice() {
  if (startPressed === true) {
    let bestMove = findBestMove(boardState, player1);
    // let randomCellNumber = Math.floor(Math.random() * 9);
    if (cellElements[bestMove].innerText === "") {
      // cellElements[randomCellNumber].innerText = "O";
      // cellArray[randomCellNumber].symbol = "O";
      cellElements[bestMove].innerText = "O";
      cellArray[bestMove].symbol = "O";
    }
    else {
      recurseAiChoice();
    }
    findBoardState();
    isEndGame(boardState);
  }
}

function isTie() {
  for (let i = 0; i < boardState.length; i++) {
    if (boardState[i] === "") {
      return false;
    }
  }
  return true;
}


function isEndGame(board) { //checks if there is three in a row of whichever symbol anywhere
  if (
    (board[0] === "X" && board[1] === "X" && board[2] === "X") ||
    (board[3] === "X" && board[4] === "X" && board[5] === "X") ||
    (board[6] === "X" && board[7] === "X" && board[8] === "X") ||
    (board[0] === "X" && board[3] === "X" && board[6] === "X") ||
    (board[1] === "X" && board[4] === "X" && board[7] === "X") ||
    (board[2] === "X" && board[5] === "X" && board[8] === "X") ||
    (board[0] === "X" && board[4] === "X" && board[8] === "X") ||
    (board[2] === "X" && board[4] === "X" && board[6] === "X")
    ) {
        // sidebarHeader.innerText = player1.name + " is the winner!";
        // scoreHeader.innerText = "Game Over!";
        // startPressed = false;
        return true;
    }

  else if (
    (board[0] === "O" && board[1] === "O" && board[2] === "O") ||
    (board[3] === "O" && board[4] === "O" && board[5] === "O") ||
    (board[6] === "O" && board[7] === "O" && board[8] === "O") ||
    (board[0] === "O" && board[3] === "O" && board[6] === "O") ||
    (board[1] === "O" && board[4] === "O" && board[7] === "O") ||
    (board[2] === "O" && board[5] === "O" && board[8] === "O") ||
    (board[0] === "O" && board[4] === "O" && board[8] === "O") ||
    (board[2] === "O" && board[4] === "O" && board[6] === "O")
  ) {
      // sidebarHeader.innerText = player2.name + " is the winner!";
      // scoreHeader.innerText = "Game Over!";
      // startPressed = false;
      return true; 
    }
  else {
    if (isTie()) {
      scoreHeader.innerText = "It's a tie!";
      return true;
    }
  }
  return false;
}

function addPlayerInputsContainer() { formContainer.appendChild(playerInputsContainer); }

function addSubmitContainerAI() { formContainer.appendChild(submitContainerAI); }

function removePlayerInputsContainer() { playerInputsContainer.remove(); }

function removeSubmitContainerAI() { submitContainerAI.remove(); }

function removeBothOptions() {
  removePlayerInputsContainer();
  removeSubmitContainerAI();
}

function resize() {
  if (document.body.clientWidth <= 1000) {
    container.style.display = "flex";
    container.style.flexDirection = "column";
    sidebar.style.height = "auto";
    sidebar.style.justifyContent = "center";
  }
  else {
    container.style.display = "inline-grid";
    sidebar.style.height = "100%";
  }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//onclick or onload functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


window.onload = () => {
  createCells();
  resize();
}

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

window.addEventListener("resize", () => {
  resize();
});

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