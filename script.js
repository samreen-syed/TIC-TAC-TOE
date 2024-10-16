let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [
  [0, 1, 2], [0, 3, 6], [0, 4, 8],
  [1, 4, 7], [2, 5, 8], [2, 4, 6],
  [3, 4, 5], [6, 7, 8]
];

const resetGame = () => {
  turnO = true;
  count = 0;
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
  msgContainer.classList.add("hide");
};

const checkWinner = () => {
  return winPatterns.some((pattern) => {
    let [a, b, c] = pattern.map(i => boxes[i].innerText);
    if (a && a === b && b === c) {
      msg.innerText = `Congratulations, Winner is ${a}`;
      msgContainer.classList.remove("hide");
      boxes.forEach(box => box.disabled = true);
      return true;
    }
    return false;
  });
};

const gameDraw = () => {
  msg.innerText = "Game was a Draw.";
  msgContainer.classList.remove("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.innerText = turnO ? "O" : "X";
    turnO = !turnO;
    box.disabled = true;
    count++;
    if (checkWinner()) return;
    if (count === 9) gameDraw();
  });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
