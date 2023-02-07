import getRandomCard from "./getRandomCard.js";
import { getPlayerPoint, resetPlayer } from "./player.js";
import {
  renderNewCard,
  renderPoints,
  renderResult,
  revealHiddenCard,
} from "./render.js";

const delay = 800;

function resetGame(user, computer) {
  resetPlayer(user);
  resetPlayer(computer);

  $(`.card-container`).empty();
  $(`#point-computer`).text(0);
  $(`#point-player`).text(0);

  return;
}

function startNewGame(user, computer, dealtCards) {
  // Hiding the action button to make the playing turns clear to the user

  if ((!user, !computer, !dealtCards)) return;

  let cardCount = 0;

  resetGame(user, computer);

  $("#lobby").remove();
  $(".btn-container").hide();
  $("#result-board").hide();

  const dealCards = setInterval(() => {
    if (cardCount === 2) {
      $(".btn-container").show();
      const userPoints = getPlayerPoint(user);
      const computerPoints = getPlayerPoint(computer);

      if (userPoints === 21) renderResult({ won: true, blackjack: true });

      if (computerPoints === 21) {
        computer.points = 21;

        renderPoints(computer);
        renderResult({ won: false, blackjack: true });
      }

      return clearInterval(dealCards);
    }

    if (user.cards.length < 2) {
      hitNewCard(user, dealtCards);
    }

    if (computer.cards.length < 2) {
      const hidden = cardCount === 1 ? true : false;
      hitNewCard(computer, dealtCards, hidden);
    }
    cardCount++;
  }, delay);
}

function hitNewCard(player, dealtCards, hide = false) {
  const { name, cards, points } = player;

  if (points >= 21) return;

  const newCard = getRandomCard(dealtCards);

  if (!newCard) return hitNewCard(player, dealtCards, hide);

  player.cards.push(newCard);

  const conditions = {
    namePlayer: name === "player",
  };

  let newPoints = getPlayerPoint(player);

  // Changing the value of any Ace card to 1 if user draws past 21 point
  if (points + newCard.point > 21) {
    if (newCard.point === 11) {
      newCard.point = 1;
    } else if (newCard.point < 11) {
      for (let card of cards) {
        if (card.point === 11) {
          card.point = 1;
          player.points -= 10;
          break;
        }
      }
    }

    newPoints = getPlayerPoint(player);
  }

  if (getPlayerPoint(player) > 21) {
    if (conditions.namePlayer) {
      renderResult({ won: false });
    } else {
      renderResult({ won: true });
    }
  }

  if (!hide) {
    player.points = player.points + newCard.point;
  }

  if (conditions.namePlayer && newPoints === 21 && cards.length > 2) {
    // Declaring the player winner if the player gets 21 points in first draw.
    if (player.cards.length === 3) {
      renderResult({ won: true });
    } else {
      $(".btn-container").hide();
      setTimeout(() => $("#btn-stand").click(), 1000);
    }
  }

  renderNewCard(name, newCard, hide);
  renderPoints(player);

  return;
}

function stand(user, computer, dealtCards) {
  $(".btn-container").hide();

  if (user.cards.length < 2 || computer.cards.length < 2) return;
  computer.points = getPlayerPoint(computer);

  revealHiddenCard();
  renderPoints(computer);

  if (computer.points > user.points) {
    renderResult({ won: false });
  }

  const computerDraw = setInterval(() => {
    if (user.points >= 18 && user.points > computer.points) {
      hitNewCard(computer, dealtCards);
    } else if (user.points < 18 && user.points >= computer.points) {
      hitNewCard(computer, dealtCards);
    } else {
      if (computer.points > 21) return clearInterval(computerDraw);

      if (user.points === computer.points) renderResult({ draw: true });

      if (user.points > computer.points) renderResult({ won: true });

      if (user.points < computer.points) renderResult({ won: false });

      return clearInterval(computerDraw);
    }
  }, 800);
}

export { resetGame, startNewGame, hitNewCard, stand };
