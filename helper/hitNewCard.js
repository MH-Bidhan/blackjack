import getRandomCard from "./getRandomCard.js";
import { renderNewCard, renderPoints } from "./render.js";

function hitNewCard(player, dealtCards) {
  const { name, cards, points } = player;

  if (points >= 21) return;

  const newCard = getRandomCard(dealtCards);

  if (name === "computer" && cards.length === 1) newCard.hide = true;

  cards.push(newCard);

  if (!newCard.hide) {
    player.points = points + newCard.point;
  }

  renderNewCard(name, newCard);

  renderPoints(player);
  if (player.points > 21) console.log("you lost");
}

export default hitNewCard;
