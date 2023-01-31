import hitNewCard from "./../helper/hitNewCard.js";

const dealtCards = {};

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

    // Start the game by dealing 2 cards on each side.
    const dealCards = setInterval(() => {
      if (user.cards.length === 2 && computer.cards.length === 2)
        return clearInterval(dealCards);
      if (user.cards.length < 2) {
        hitNewCard(user, dealtCards);
      }

      if (computer.cards.length < 2) {
        hitNewCard(computer, dealtCards);
      }
    }, 800);
  });

  // Function for user to hit for a card
  $("#btn-hit").click(() => hitNewCard(user, dealtCards));
});
