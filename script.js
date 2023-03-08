const gridContainer = document.getElementById("gridContainer");
const gridCell = document.createElement("div");
gridCell.classList.add("gridCell");
const startBtn = document.getElementById("startBtn");
const lightbox = document.getElementById("lightbox");
const submitBtn = document.getElementById("submit");

const player = (name, symbol) => {
  return { name, symbol };
};

const CellObj = (cellCount) => {
  const cellId = "cell_" + cellCount;
  const cellElement = gridCell.cloneNode(true);
  return { cellElement, cellId };
};

let cellArray = [];


for (let cellCount = 0; cellCount < 9; cellCount++) {
  const newCell = CellObj(cellCount);
  newCell.cellElement.id = newCell.cellId;
  cellArray[cellCount] = newCell;
  gridContainer.appendChild(newCell.cellElement);
  newCell.cellElement.onclick = () => {
    newCell.cellElement.innerText = "X";
  }
}

startBtn.onclick = () => {
  lightbox.className = "on";
}

submitBtn.addEventListener("click", submit);

function submit() {
  lightbox.className = "off";
}

