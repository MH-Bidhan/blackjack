import getRandomCard from "./getRandomCard.js";
import {
  renderNewCard,
  renderPoints,
  renderResult,
  revealHiddenCard,
} from "./render.js";

const delay = 800;

function resetGame(user, computer) {
  user.cards = [];
  user.points = 0;
  computer.cards = [];
  computer.points = 0;

  $(`.card-container`).empty();

  $(`#point-computer`).text(0);
  $(`#point-player`).text(0);

  return;
}

function startNewGame(user, computer, dealtCards) {
  if ((!user, !computer, !dealtCards)) return;

  $("#result-board").hide();
  resetGame(user, computer);

  const dealCards = setInterval(() => {
    if (user.cards.length === 2 && computer.cards.length === 2) {
      if (user.points === 21) renderResult({ won: true, blackjack: true });

      if (
        computer.cards.reduce((acc, curr) => {
          return acc + curr.point;
        }, 0) === 21
      )
        renderResult({ won: false, blackjack: true });
      return clearInterval(dealCards);
    }

    if (user.cards.length < 2) {
      hitNewCard(user, dealtCards);
    }

    if (computer.cards.length < 2) {
      const hidden = computer.cards.length === 1 ? true : false;
      hitNewCard(computer, dealtCards, hidden);
    }
  }, delay);
}

function hitNewCard(player, dealtCards, hide = false) {
  const { name, cards, points } = player;

  const newCard = getRandomCard(dealtCards);

  if (hide) newCard.hide = true;

  cards.push(newCard);

  if (points + newCard.point > 21) {
    if (name === "player") {
      renderResult({ won: false });
    } else {
      renderResult({ won: true });
    }
  }

  if (!newCard.hide) {
    player.points = points + newCard.point;
  }

  renderNewCard(name, newCard);

  renderPoints(player);
}

function stand(user, computer, dealtCards) {
  computer.cards.forEach((card) =>
    card.hide ? (computer.points += card.point) : null
  );
  revealHiddenCard();
  renderPoints(computer);

  if (computer.points > user.points) {
    renderResult({ won: false });
  }

  const computerDraw = setInterval(() => {
    if (user.points > 18 && user.points > computer.points) {
      hitNewCard(computer, dealtCards);
    } else if (user.points <= 18 && user.points >= computer.points) {
      hitNewCard(computer, dealtCards);
    } else {
      if (computer.points > 21) return clearInterval(computerDraw);
      if (user.points === computer.points) return renderResult({ draw: true });

      if (user.points > computer.points) renderResult({ won: true });

      if (user.points < computer.points) renderResult({ won: false });

      return clearInterval(computerDraw);
    }
  }, 800);
}

export { resetGame, startNewGame, hitNewCard, stand };
