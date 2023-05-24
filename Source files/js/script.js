let deck;
let topCard;
let playerScore = 0;
let dealerScore = 0;
const playerHand = [];
const dealerHand = [];

/* Begin round: sort + shuffle deck; deal two cards to both player and dealer */
function beginRound() {
  deck = [];
  let suit = ["club", "diamond", "heart", "spade"];
  let value = ["A", 2, 3, 4, 5, 6, 7, 8, 9, "T", "J", "Q", "K"]
  for (i = 0; i < suit.length; i++) {
    for (j = 0; j < value.length; j++) {
      deck.push(value[j] + suit[i]);
    }
  }
  for (i = deck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
    var temp = deck[i];
    // deck[i] = deck[j];
    // deck[j] = temp;
  }
  topCard = deck[0];
  playerHand[0] = dealCard();
  playerHand[1] = dealCard();
  dealerHand[0] = dealCard();
  dealerHand[1] = dealCard();
}

/* deal top card of deck (first element in deck array) */
function dealCard() {
  let tmp = topCard;
  deck.shift();
  topCard = deck[0];
  console.log("Card dealt: " + tmp);
  return tmp;
}

/* player or dealer hits */
function hitMe(hand) {
  hand.push(dealCard());
}

function setCardPoints(card) {
  let tmp = card.substring(0, 1);
  switch (tmp) {
    case "A":
      return 1;
    case "T":
      return 10;
    case "J":
      return 10;
    case "Q":
      return 10;
    case "K":
      return 10;
    default:
      return tmp;
  }
}

/* run this every time a card is dealt */
function checkScore(hand) {
  let score = 0;
  for (x in hand) {
    score += parseInt(setCardPoints(hand[x]))
  };
  if ((score <= 11) && (hasAce(hand))) {
    return score + 10;
  }
  else if (score <= 21) {
    return score;
  }
  else return "bust";
}

/* check for ace */
function hasAce(hand) {
  let a = 0;
  for (x in hand) {
    if (hand[x].substring(0, 1) == "A") {
      a++;
    }
  }
  if (a > 0) { return true }
  else return false;
}

function getScore() {
  console.log("Player Score: " + playerScore);
  console.log("Dealer Score: " + dealerScore);
}


/* Game setup functions */


window.addEventListener('load', setup); //onload event listener

/* variables for DOM elements */
var intro = document.getElementById("intro");
var gameboard = document.getElementById("game-board");
var results = document.getElementById("result-section");
var btnStart = document.getElementById("initiate");


/* loads first phase */
function setup() {

  gameboard.style.display = "none";
  results.style.display = "none";

  btnStart.addEventListener("click", initiate);

}

/* loads game phase */
function initiate() {

  intro.style.display = "none";
  gameboard.style.display = "flex";
  beginRound();

}

/* loads final phase */
function endGame() {
  gameboard.style.display = "none";
  results.style.display = "flex";

}

