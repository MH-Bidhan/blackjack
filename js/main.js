import { hitNewCard, stand, startNewGame } from "../helper/blackjack.js";

let dealtCards = {};

const user = {
  name: "player",
  cards: [],
  points: 0,
};

const computer = {
  name: "computer",
  cards: [],
  points: 0,
};

$(document).ready(function () {
  // Function to close the lobby window.
  $("#btn-play").click(function () {
    $("#lobby").remove();
    startNewGame(user, computer, dealtCards);
  });

  // Function for user to hit for a card

  $("#btn-hit").click(() => {
    if (computer.cards.length >= 2 && user.cards.length >= 2)
      hitNewCard(user, dealtCards);
  });
  $("#btn-new-game").click(() => {
    dealtCards = {};
    startNewGame(user, computer, dealtCards);
  });

  // Function for the computer to play if user stands
  $("#btn-stand").click(() => stand(user, computer, dealtCards));
});
