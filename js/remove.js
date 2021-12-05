import { state } from "./constants.js";
import { drawInventoryStack } from "./draw.js";
const inventoryStack = document.querySelector(".stack");
const boxTools = document.querySelectorAll(".box");

function selectBlueTool() {
  boxTools.forEach((tool) => {
    tool.addEventListener("click", () => {
      boxTools[0].style.backgroundColor = "";
      boxTools[1].style.backgroundColor = "";
      boxTools[2].style.backgroundColor = "";
      tool.style.backgroundColor = "blue";
    });
  });
}
selectBlueTool();

export function removeFromGameBoard(matrix, gameBoard) {
  gameBoard.addEventListener("click", (gridElement) => {
    let destroy = false;
    if (state.chosenElementFromInventory === "") {
      let idStr = gridElement.target.id;
      let blockPoint = idStr.split(" ");
      blockPoint = blockPoint.map((item) => parseInt(item));
      let x = blockPoint[0];
      let y = blockPoint[1];
      if (matrix[x][y] > state.cloud) {
        if (state.chosenTool !== "") {
          for (let k = 0; k < state.tools[state.chosenTool].length; k++) {
            let element = state.tools[state.chosenTool][k];
            if (matrix[x][y] === state[element]) {
              destroy = true;
            }
          }
        } else {
          alert("You need to pick tool first");
        }

        if (destroy) {
          Object.keys(state).forEach((key) => {
            if (state[key] === matrix[x][y]) {
              state.inventory[key]++;
            }
          });
          matrix[x][y] = state.sky;
          let removableDiv = document.getElementById(idStr);

          removableDiv.classList.remove(gridElement.target.classList[0]);
          removableDiv.classList.add("sky");
          drawInventoryStack(state, inventoryStack);
        }
      }
    }
  });
}

export function choosenTool(state, inventoryTools) {
  inventoryTools.addEventListener("click", (item) => {
    state.chosenTool = item.target.classList[0];
    state.chosenElementFromInventory = "";
  });
}
