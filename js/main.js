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
  // Function to close the lobby window and start a game when the play button is clicked.
  $("#btn-play").click(function () {
    $("#lobby").remove();
    startNewGame(user, computer, dealtCards);
  });

  // Function for user to hit for a card by clicking hit button.
  $("#btn-hit").click(() => {
    if (computer.cards.length >= 2 && user.cards.length >= 2)
      hitNewCard(user, dealtCards);
  });

  // Function to start a new game when new game button is clicked.
  $("#btn-new-game").click(() => {
    dealtCards = {};
    startNewGame(user, computer, dealtCards);
  });

  // Function for the computer to play if user stands when the stand button is clicked.
  $("#btn-stand").click(() => stand(user, computer, dealtCards));
});
