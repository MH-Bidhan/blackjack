function renderNewCard(name, newCard, hide = false) {
  return $(`#${name}-card-container`).append(
    `<div class="card-slot"  ${
      hide === true ? 'id= "card-hide"' : ""
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
  if (draw) {
    $(`#result`).text("Draw").show();
    return $("#result-board").show();
  }

  if (blackjack) {
    revealHiddenCard();
    $(`#blackjack`).text("Blcakjack").show();
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
