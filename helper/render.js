function renderNewCard(name, newCard) {
  $(`#${name}-card-container`).append(
    `<div class="card-slot"  ${
      newCard.hide === true ? 'id= "card-hide"' : ""
    }><img src="cards/${newCard.svg}"  alt="" /></div>`
  );
}

function renderPoints(player) {
  const { name, points } = player;

  return $(`#point-${name}`).text(points);
}

export { renderNewCard, renderPoints };
