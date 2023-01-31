import cards from "./../data/cardsData.js";

function getRandomCard(dealt = {}) {
  let randomNumber1 = Number(Math.random().toString().charAt(6));
  let randomNumber2 = Number(Math.random().toString().charAt(8));

  let randomIndex = randomNumber1 ^ (randomNumber2 * 10);

  let i = 0;

  while (true) {
    if (dealt[randomIndex]) {
      console.log("be", randomIndex);
      randomIndex = randomIndex * randomNumber1 + randomNumber2;
      console.log("af", randomIndex);
    } else if (randomIndex > 51) {
      randomIndex /= 3;
    } else if (i > 100) {
      randomIndex = randomNumber1;
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
