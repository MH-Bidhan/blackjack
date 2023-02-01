function getPlayerPoint(player) {
  return player.cards.reduce((acc, curr) => {
    return acc + curr.point;
  }, 0);
}

function resetPlayer(player) {
  player.cards = [];
  player.points = 0;

  return player;
}

export { getPlayerPoint, resetPlayer };
