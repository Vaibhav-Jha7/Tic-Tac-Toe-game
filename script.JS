let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let scoreO = document.querySelector("#scoreO");
let scoreX = document.querySelector("#scoreX");

let turnO = true; 
let count = 0; 

let oWins = 0;
let xWins = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.innerText = turnO ? "O" : "X";
    turnO = !turnO;
    box.disabled = true;
    count++;

    let winner = checkWinner();

    if (count === 9 && !winner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `😅 It's a Draw!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) box.disabled = true;
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("winner");
  }
};

const showWinner = (winner, pattern) => {
  msg.innerText = `🎉 Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();

  // highlight winning boxes
  pattern.forEach(i => boxes[i].classList.add("winner"));

  // update scoreboard
  if (winner === "O") {
    oWins++;
    scoreO.innerText = oWins;
  } else {
    xWins++;
    scoreX.innerText = xWins;
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let pos1Val = boxes[a].innerText;
    let pos2Val = boxes[b].innerText;
    let pos3Val = boxes[c].innerText;

    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val, pattern);
      return true;
    }
  }
  return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
