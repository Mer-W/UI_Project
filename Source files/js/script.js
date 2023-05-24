// variables for cards
let deck;
let topCard;
let playerScore = 0;
let dealerScore = 0;
var playerHand = [];
var dealerHand = [];

// event listener for onload setup
window.addEventListener('load', setup);

// variables for DOM elements
  // game phases
var intro = document.getElementById("intro");
var gameboard = document.getElementById("game-board");
var results = document.getElementById("result-section");
  // buttons
var btnStart = document.getElementById("start-button");
var btnHit = document.getElementById("hit-button");
var btnStand = document.getElementById("stand-button");
var btnPlayAgain = document.getElementById("play-again-button");
  // results messages
var bust = document.getElementById("bust");
var tie = document.getElementById("tie");
var win = document.getElementById("win");
var lose = document.getElementById("lose");

/* Deck functions */

/**
* Assembles 52-card deck array
*/
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

/**
* Assigns point value to each card
*/
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

/**
* Calls sortDeck() and randomizes indices of deck array
*/
function shuffleDeck() {
  sortDeck();
  for (i = deck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
    var temp = deck[i];
  }
  topCard = deck[0];
}

/**
* Deals top card of deck (first element in deck array)
*/
function dealCard() {
  let tmp = topCard;
  deck.shift();
  topCard = deck[0];
  console.log("Card dealt: " + tmp);
  return tmp;
}

/* Hand functions */

/**
* Checks for occurence of ace in hand
* @param {array} hand
*/
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

/**
* Counts points in a hand, calculates 
* @param {array} hand
*/
function countPoints(hand) {
  let points = 0;

  for (let x in hand) {
    points += parseInt(setCardPoints(hand[x]));
  }
  if (points + 10 <= 21 && hasAce(hand) == true) {
      points = points + 10;
  }
  return points;
}

/* N version */
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

function getScore() {
  console.log("Player Score: " + playerScore);
  console.log("Dealer Score: " + dealerScore);
}

/**
* Checks if hand is bust
* @param {array}
*/
function isBust(hand) {
  if (countPoints(hand) > 21) {
    return true;
  } else {
    return false;
  }
}

/* Gameplay functions */

/**
* Loads loads opening phase (intro and play button)
*/
function setup() {

  gameboard.style.display = "none";
  results.style.display = "none";
  // event listener for next phase
  btnStart.addEventListener("click", initiateGame);

}

/**
* Loads game phase
*/
function initiateGame() {

  intro.style.display = "none";
  gameboard.style.display = "flex";
  results.style.display = "none";

  beginRound();

  // event listeners for hit and stand
  btnHit.addEventListener("click", function() { hit(playerHand)});
  btnStand.addEventListener("click", dealerTurn);
}

/**
* Gets deck, resets hands, deals two cards to player and dealer
*/
function beginRound() {
  shuffleDeck();
  playerHand = [];
  dealerHand = [];
  playerHand[0] = dealCard();
  playerHand[1] = dealCard();
  dealerHand[0] = dealCard();
  dealerHand[1] = dealCard();
}

/**
* Adds one card to a player's hand. Called when user clicks "Hit" or on dealer's turn
* @param {array} hand
*/
function hit(hand) {
  hand.push(dealCard());
  if (isBust(hand) == true) {
    endGame();
  }
  //tests
  console.log(countPoints(hand));
  console.log(isBust(hand));
}

/**
* Plays dealer's turn. Called when player stands.
* IDK when dealer's face down card is revealed?
*/
function dealerTurn() {
  while (countPoints(dealerHand) < 17) {
    hit(dealerHand);
  }
  endGame();
}

/**
* Compares uneven hands to determine winner
*/
function playerWins() {
 if (countPoints(dealerHand) < countPoints(playerHand) && isBust(playerHand) == false) {
  return true;
 } else {
  return false;
 }
}

/**
* Checks for tied points
*/
function isTie() {
  if (countPoints(dealerHand) == countPoints(playerHand)) {
   return true;
  } else {
   return false;
  }
 }

/**
* Loads final phase
*/
function endGame() {
  gameboard.style.display = "none";
  results.style.display = "flex";
  btnPlayAgain.addEventListener("click", initiateGame);

  // todo: append final scores to p elements

  // check for bust, tie, win, lose; display message
  if (isBust(playerHand) == true) {
    bust.style.display = "flex";
    lose.style.display = "flex";
    win.style.display = "none";
    tie.style.display = "none";


  } else if (isTie() == true) {
    tie.style.display = "flex";
    win.style.display = "none";
    bust.style.display = "none";
    lose.style.display = "none";

  } else if (playerWins() == true) {
    win.style.display = "flex";
    bust.style.display = "none";
    lose.style.display = "none";
    tie.style.display = "none";


  } else {
    lose.style.display = "flex";
    win.style.display = "none";
    bust.style.display = "none";
    tie.style.display = "none";
  }
  
}

