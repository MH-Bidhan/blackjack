function generateCards() {
  const suits = ["spades", "hearts", "clubs", "diamonds"];
  const map = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    king: 10,
    queen: 10,
    jack: 10,
    ace: 11,
  };

  const cards = [];

  let i = 1;

  for (suit of suits) {
    for (key in map) {
      cards.push({ id: i, svg: `${suit}_${key}.svg`, point: map[key] });
      i++;
    }
  }

  return cards;
}
