const body = document.querySelector("body");

/**
 * @param {string} elem
 * @param {string} whereTo
 * @param {string} className
 * @return {HTMLElement}
 */
function drawNewHtml(elem, whereTo, className = "") {
  const existingElement = document.querySelector(whereTo);
  const newElem = document.createElement(elem);
  className ? (newElem.className = className) : null;
  existingElement.append(newElem);

  return newElem;
}

// Header
drawNewHtml("header", "body");
drawNewHtml("div", "header", "wrapper");
const btnNewGame = (drawNewHtml(
  "button",
  "header div",
  "btn-new-game",
).textContent = "New game");
const btnLeaderboard = (drawNewHtml(
  "button",
  "header div",
  "btn-leaderboard",
).textContent = "Leaderboards");

// Main - stats
drawNewHtml("main", "body", "wrapper");
drawNewHtml("section", "main", "stats-container");
drawNewHtml("div", ".stats-container", "stats");

const turnInfo = drawNewHtml("span", ".stats", "turn-info");
drawNewHtml("span", ".turn-info", "turn").textContent = 0;
turnInfo.append(" Turn");

const progressInfo = drawNewHtml("span", ".stats", "progress-info");
drawNewHtml("span", ".progress-info", "progress").textContent = 0;
progressInfo.append(" out of 8 pairs");

// Main - board
drawNewHtml("section", "main", "board-container");
drawNewHtml("div", ".board-container", "board");

export function drawCard(id) {
  const btn = document.createElement("button");
  btn.className = "card";
  btn.type = "button";
  btn.ariaLabel = `Open the card №${id}`;
  btn.dataset.id = id;

  const img = document.createElement("img");
  img.className = "card-image";
  img.alt = "Cat";

  const cardFront = document.createElement("div");
  cardFront.className = "card-face card-front";
  const cardBack = document.createElement("div");
  cardBack.className = "card-face card-back";
  const cardInner = document.createElement("div");
  cardInner.className = "card-inner";

  cardFront.append(img);
  cardInner.append(cardBack);
  cardInner.append(cardFront);

  btn.append(cardInner);

  return btn;
}
