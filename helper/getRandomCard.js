import cards from "./../data/cardsData.js";

function getRandomNumber() {
  const index = Number(Math.random().toString().charAt(6));
  const number = Number(Math.random().toString().charAt(index));

  return number;
}

function getRandomCard(dealt = {}) {
  let randomNumber1 = getRandomNumber();
  let randomNumber2 = getRandomNumber();

  let randomIndex = randomNumber1 ^ (randomNumber2 * 10);

  let i = 0;

  while (true) {
    if (dealt[randomIndex]) {
      randomIndex = randomNumber1 + randomNumber2 + getRandomNumber();
    } else if (randomIndex > 51) {
      randomIndex /= 3;
    } else if (i > 100) {
      randomIndex = getRandomNumber();
    } else {
      break;
    }
    i++;
  }

  const index = Math.floor(randomIndex);

  dealt[index] = true;
  return cards[index];
}

export default getRandomCard;
