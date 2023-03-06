const gridContainer = document.getElementById("gridContainer");
const gridCell = document.createElement("div");
const startBtn = document.getElementById("startBtn");
const lightbox = document.getElementById("lightbox");

const player = (name, symbol) => {
    return {name, symbol};
};

let cellArray = [];

gridCell.classList.add("gridCell");

for (let cellCount = 0; cellCount < 9; cellCount++){
    let cell = cellArray[cellCount];
    cell = gridCell.cloneNode(true);
    gridContainer.appendChild(cell);
    cell.addEventListener("click", cellClickFunc(cell));
}

function cellClickFunc (el) {
    
}

startBtn.onclick = () => {
    lightbox.className = "on";
}

lightbox.onclick = () => {
    lightbox.className = "off";
}