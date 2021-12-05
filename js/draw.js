import { state } from "./constants.js";

export function draw(matrix, gameBoard) {
  gameBoard.innerHTML = "";
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      let str = "";
      switch (matrix[i][j]) {
        case state.sky:
          str = `<div class="sky" id='${i} ${j}' > </div>`;
          break;
        case state.cloud:
          str = `<div class="cloud" id='${i} ${j}'> </div>`;
          break;
        case state.ground:
          if (i === state.groundLimit) {
            str = `<div class="ground-grass" id='${i} ${j}'> </div>`;
          } else {
            str = `<div class="ground" id='${i} ${j}'> </div>`;
          }
          break;
        case state.tree:
          str = `<div class="tree" id='${i} ${j}'> </div>`;
          break;
        case state.stone:
          str = `<div class="stone" id='${i} ${j}'> </div>`;
          break;
        case state.wood:
          str = `<div class="wood" id='${i} ${j}'> </div>`;
      }
      gameBoard.innerHTML += str;
    }
  }
}

export function drawInventoryStack(state, inventoryStack) {
  inventoryStack.innerHTML = "";
  Object.keys(state.inventory).forEach((key) => {
    if (state.inventory[key] > 0) {
      let str = "";
      str = `<div class='${key} box-removed flexing-center' >${state.inventory[key]}</div>`;
      inventoryStack.innerHTML += str;
    }
  });
}

function chosenElement(state, inventoryStack) {
  inventoryStack.addEventListener("click", (item) => {
    state.chosenElementFromInventory = item.target.classList[0];
    state.chosenTool = "";
  });
}

export function drawElementBack(state, gameBoard, inventoryStack, matrix) {
  chosenElement(state, inventoryStack);
  gameBoard.addEventListener("click", (gridElement) => {
    if (
      state.chosenElementFromInventory !== "" &&
      state.inventory[state.chosenElementFromInventory] > 0
    ) {
      let idStr = gridElement.target.id;

      let blockPoint = idStr.split(" ");

      blockPoint = blockPoint.map((item) => parseInt(item));
      let x = blockPoint[0];
      let y = blockPoint[1];
      if (matrix[x][y] === state.sky) {
        matrix[x][y] = state[state.chosenElementFromInventory];
        Object.keys(state).forEach((key) => {
          if (state[key] === matrix[x][y]) {
            state.inventory[key]--;
          }
        });

        let addDiv = document.getElementById(idStr);
        addDiv.classList.remove("sky");
        addDiv.classList.add(state.chosenElementFromInventory);
        drawInventoryStack(state, inventoryStack);
      }
    }
  });
}
