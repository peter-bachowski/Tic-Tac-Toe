const gridContainer = document.getElementById("gridContainer");
const gridCell = document.createElement("div");
const startBtn = document.getElementById("startBtn");
const lightbox = document.getElementById("lightbox");
const submitBtn = document.getElementById("submit");

const player = (name, symbol) => {
  return { name, symbol };
};

const cell = (number) => {
  
};

let cellArray = [];

gridCell.classList.add("gridCell");

for (let cellCount = 0; cellCount < 9; cellCount++) {
  let cell = gridCell.cloneNode(true);
  cellArray[cellCount] = cell;
  gridContainer.appendChild(cell);
  cell.onclick = () => {
    cell.innerText = "X";
  }
}

startBtn.onclick = () => {
  lightbox.className = "on";
}

submitBtn.addEventListener("click", submit);

function submit() {
  lightbox.className = "off";
}