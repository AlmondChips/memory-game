import { drawNewHtml } from "./drawPage.js";
import { startGame } from "./gameLogic.js";
import { saves } from "./saveGame.js";

export function drawModal(type) {
  const modalBg = drawNewHtml("div", "body", "modal-bg");

  drawNewHtml("div", ".modal-bg", "modal");
  if (type === "win") {
    drawWin(modalBg);
  }
  if (type === "lb") {
    drawLeaderboard(modalBg);
  }
  document.querySelector("html").classList.add("no-scroll");
  modalBg.addEventListener("click", (e) => {
    if (!e.target.classList.contains("modal-bg")) return;
    closeModal(modalBg);
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") closeModal(modalBg);
  });

  setTimeout(() => {
    modalBg.classList.add("visible");
  }, 100);
}

function closeModal(modal) {
  modal.classList.remove("visible");
  setTimeout(() => {
    modal.remove();
    document.querySelector("html").classList.remove("no-scroll");
  }, 300);
}

window.win = () => {
  drawModal("win");
};

function drawWin(modalBg) {
  const turns = document.querySelector(".turn").textContent;
  drawNewHtml("h2", ".modal", "modal-msg").textContent = "Congratulations!";
  drawNewHtml("div", ".modal", "game-info");
  drawNewHtml("p", ".game-info").textContent = `You won in ${turns} turns`;
  drawNewHtml("div", ".modal", "buttons-container");
  const restartBtn = drawNewHtml(
    "button",
    ".buttons-container",
    "btn-new-game",
  );
  restartBtn.textContent = "New game";
  const closeBtn = drawNewHtml("button", ".buttons-container", "btn-close");
  closeBtn.textContent = "Close";
  restartBtn.addEventListener("click", () => {
    closeModal(modalBg);
    startGame();
  });
  closeBtn.addEventListener("click", () => closeModal(modalBg));
}

function drawLeaderboard(modalBg) {
  const records = saves.getSave();
  drawNewHtml("h2", ".modal").textContent = "Leaderboard";
  if (!records) {
    drawNewHtml("h2", ".modal").textContent = "No records yet";
  } else {
    drawNewHtml("div", ".modal", "lb-table");
    console.log(records);

    const sortedRecords = records.sort((r1, r2) => {
      const turnsDif = r1.turns - r2.turns;
      console.log(turnsDif);
      return turnsDif !== 0 ? turnsDif : new Date(r1.date) - new Date(r2.date);
    });

    sortedRecords.forEach((r, i) => {
      const index = i + 1;
      if (index <= 10) {
        drawNewHtml("div", ".lb-table", `table-row-${i} table-row`);
        drawNewHtml("span", `.table-row-${i}`, "table-cell").textContent =
          i + 1;
        drawNewHtml("span", `.table-row-${i}`, "table-cell").textContent =
          `Turns: ${r.turns}`;
        drawNewHtml("span", `.table-row-${i}`, "table-cell").textContent =
          `${saves.formatDate(r.date)}`;
      }
    });
  }
  drawNewHtml("div", ".modal", "buttons-container");
  const closeBtn = drawNewHtml("button", ".buttons-container", "btn-close");
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", () => closeModal(modalBg));
}

document.querySelector(".btn-leaderboard").addEventListener("click", () => {
  drawModal("lb");
});
