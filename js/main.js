import { matrix, state } from "./constants.js";
import { draw, drawElementBack } from "./draw.js";
import { removeFromGameBoard } from "./remove.js";
import { choosenTool } from "./remove.js";

const gameBoard = document.querySelector(".game-board");
const inventoryStack = document.querySelector(".stack");
const inventoryTools = document.querySelector(".tools");
const firstScreen = document.querySelector(".first-screen");
const start = document.querySelector(".start");
const mainCont = document.querySelector(".container");

function changeScreen() {
  start.addEventListener("click", () => {
    firstScreen.style.display = "none";
    mainCont.style.display = "flex";
  });
}

function main() {
  changeScreen();
  draw(matrix, gameBoard);
  choosenTool(state, inventoryTools);
  removeFromGameBoard(matrix, gameBoard);
  drawElementBack(state, gameBoard, inventoryStack, matrix);
}

main();
