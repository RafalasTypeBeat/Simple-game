let currentPlayer = "X";
let gameOver = false;
let board = new Array(9).fill(""); 
let scores = { X: 0, O: 0 };

const cells = document.querySelectorAll("td");
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (gameOver || cell.textContent !== "") {
      return;
    }
    let height = cell.offsetHeight;
    let sizeCalc = 50 * height / 100;
    cell.style.fontSize = `${sizeCalc}px`;
    cell.style.paddingTop = '6.2%';
    cell.style.paddingBottom = '6.2%';
    cell.textContent = currentPlayer;
    
    board[index] = currentPlayer;
    gameOver = checkForWin(board, currentPlayer);

    if (gameOver) {
      scores[currentPlayer]++;
      document.querySelector(`#score-${currentPlayer.toLowerCase()}`).textContent = scores[currentPlayer];
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  });
});

function resetScr() {
  document.getElementById("reset-button").click();
  document.getElementById("reset-button").focus();
  scores = { X: 0, O: 0 };
  document.querySelector("#score-x").textContent = scores[currentPlayer];
  document.querySelector("#score-o").textContent = scores[currentPlayer];
}

const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", () => {
  currentPlayer = "X";
  gameOver = false;
  board = new Array(9).fill("");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.paddingTop = '15%';
    cell.style.paddingBottom = '15%';
  });
});

function checkForWin(board, player) {
  for (let i = 0; i < 9; i += 3) {
    if (board[i] === player && board[i + 1] === player && board[i + 2] === player) {
      return true;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (board[i] === player && board[i + 3] === player && board[i + 6] === player) {
      return true;
    }
  }

  if (board[0] === player && board[4] === player && board[8] === player) {
    return true;
  }
  if (board[2] === player && board[4] === player && board[6] === player) {
    return true;
  }

  return !board.includes("");
}