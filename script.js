const gridContainer = document.getElementById("gridContainer");
const gridCell = document.createElement("div");

let cellArray = [];

gridCell.classList.add("gridCell");

for (let cellCount = 0; cellCount < 9; cellCount++){
    cellArray[cellCount] = gridCell.cloneNode(true);
    gridContainer.appendChild(cellArray[cellCount]);
}