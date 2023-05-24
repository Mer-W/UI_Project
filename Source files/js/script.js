let deck;
let topCard;
const playerHand = [];
const compHand = [];

// reset deck (might consolidate this with shuffle)
function sortDeck() {
  deck = [];
  let suit = ["club", "diamond", "heart", "spade"];
  let value = ["A", 2, 3, 4, 5, 6, 7, 8, 9, "T", "J", "Q", "K"]
  for (i = 0; i < suit.length; i++) {
    for (j = 0; j < value.length; j++) {
      deck.push(value[j] + suit[i]);
    }
  }
}

// shuffle deck
function shuffleDeck() {
  for (i = deck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
    var temp = deck[i];
    // deck[i] = deck[j];
    // deck[j] = temp;
  }
  topCard = deck[0];
}

// deal top card of deck (first element in deck array)
function dealCard() {
  let tmp = topCard;
  deck.shift();
  topCard = deck[0];
  console.log("Card dealt: " + tmp);
  return tmp;
}

// this is kind of temp - used just to populate numbers in console
function beginRound() {
  playerHand[0] = dealCard();
  playerHand[1] = dealCard();
  compHand[0] = dealCard();
  compHand[1] = dealCard();
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

// check for ace (would occur during scoring)
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

// player hits (I might rework this so either player calls this function)
function playerHit() {
  playerHand.push(dealCard());
  let score = 0;
  for (let x in playerHand) {
    score += parseInt(setCardPoints(playerHand[x]));
  }
}

/*
right now it would go something like:

sortDeck()
shuffleDeck()
beginRound()
playerHit()

(and at any point we can check if a player currently has an ace)

*/



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

}

/* loads final phase */
function endGame() {
  gameboard.style.display = "none";
  results.style.display = "flex";

}

