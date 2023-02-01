function renderNewCard(name, newCard) {
  return $(`#${name}-card-container`).append(
    `<div class="card-slot"  ${
      newCard.hide === true ? 'id= "card-hide"' : ""
    }><img src="cards/${newCard.svg}"  alt="" /></div>`
  );
}

function renderPoints(player) {
  const { name, points } = player;

  return $(`#point-${name}`).text(points);
}

function revealHiddenCard() {
  return $("#card-hide").removeAttr("id");
}

function renderResult({ won = false, draw = false, blackjack = false }) {
  if (draw) return $(`#result`).text("Draw");

  if (blackjack) {
    revealHiddenCard();
    $(`#blackjack`).text("Blcakjack");
  } else {
    $(`#blackjack`).hide();
  }

  if (won) {
    $(`#result`).text("You Won");
  } else {
    $(`#result`).text("You Lose");
  }

  return $("#result-board").show();
}

export { renderNewCard, renderPoints, revealHiddenCard, renderResult };
