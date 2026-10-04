import { drawCard } from "./drawPage.js";
import { drawModal } from "./modal.js";
import { saves } from "./saveGame.js";
let turn, progress, pairs, board;

export function startGame() {
  pairs = new Map();
  turn = 0;
  progress = 0;
  updateState();
  generatePairs();
  drawBoard();
}

function generatePairs() {
  const cardIds = Array.from({ length: 16 }, (_, index) => index + 1);
  const imgIds = shuffle(
    Array.from({ length: 16 }, (_, index) => index + 1),
  ).splice(0, 8);

  let l = cardIds.length,
    r;

  for (let i = 0; i < imgIds.length; i += 0.5) {
    const img = imgIds[Math.floor(i)];
    r = Math.floor(Math.random() * l--);
    [cardIds[l], cardIds[r]] = [cardIds[r], cardIds[l]];

    pairs.set(cardIds.pop(), img);
  }
}

function shuffle(array = []) {
  let l = array.length,
    r;
  while (l) {
    r = Math.floor(Math.random() * l--);
    [array[l], array[r]] = [array[r], array[l]];
  }
  return array;
}

function updateState(isTurn, isProgress) {
  document.querySelector(".turn").textContent = isTurn ? ++turn : turn;
  document.querySelector(".progress").textContent = isProgress
    ? ++progress
    : progress;
}

function drawBoard() {
  board = document.querySelector(".board");
  board.textContent = "";

  const flipCard = getFlipHandler();

  for (let i = 0; i < 16; i++) {
    const card = drawCard(i + 1);
    card.addEventListener("click", flipCard);
    board.append(card);
  }
}

const getFlipHandler = () => {
  let isTurn = false;
  let isLocked = false;
  let turnCards = [];
  function click(e) {
    if (isLocked) return;
    const card = e.currentTarget;

    openCard(card);
    if (progress === 8) {
      drawModal("win");
      saves.save(turn);
    }
  }

  return click;

  function openCard(card) {
    if (card.classList.contains("is-flipped")) return;

    const cardId = card.dataset.id;
    const imgId = pairs.get(+cardId);
    const imgSrc = `./assets/imgs/${imgId}.png`;
    card.querySelector(".card-image").src = imgSrc;
    card.classList.add("is-flipped");
    turnCards.push(card);
    if (isTurn) {
      isLocked = true;
      updateState(1);
      if (isCardsSame()) {
        turnCards.forEach((card) => {
          card.removeEventListener("click", click);
        });
        resetInnerState();
        updateState(0, 1);
      } else {
        setTimeout(() => {
          turnCards.forEach((card) => {
            closeCard(card);
          });
        }, 700);
      }
      return;
    }
    isTurn = true;
  }

  function closeCard(card) {
    card.classList.remove("is-flipped");
    setTimeout(() => {
      card.querySelector(".card-image").src = "";
      resetInnerState();
    }, 300);
  }

  function resetInnerState() {
    isLocked = false;
    turnCards = [];
    isTurn = false;
  }

  function isCardsSame() {
    const firstCard = turnCards[0].dataset.id;
    const secondCard = turnCards[1].dataset.id;
    return pairs.get(+firstCard) === pairs.get(+secondCard);
  }
};

document.querySelector(".btn-new-game").addEventListener("click", () => {
  startGame();
});
