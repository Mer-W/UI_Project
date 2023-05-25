// variables for cards
let deck;
let topCard;
let playerScore = 0;
let dealerScore = 0;
let dealerWait;
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
var btnHit = document.getElementById("hit-button").addEventListener("click", function () { hit(playerHand, "#player-cards") });
var btnStand = document.getElementById("stand-button").addEventListener("click", dealerTurn);
var btnPlayAgain = document.getElementById("play-again-button");
// results messages
var bust = document.getElementById("bust");
var tie = document.getElementById("tie");
var win = document.getElementById("win");
var lose = document.getElementById("lose");


/* Deck functions */


// Assembles 52-card deck array
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


// Assigns point value to each card
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

// Calls sortDeck() and randomizes indices of deck array
function shuffleDeck() {
  playerHand = [];
  dealerHand = [];
  sortDeck();
  for (i = deck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
    var temp = deck[i];
  }
  topCard = deck[0];
}


// Deals top card of deck (first element in deck array)
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
  gameboard.style.display = "block";
  results.style.display = "none";
  beginRound();
}

function displayCards() {
  $("#player-hand").empty();
  $("#dealer-hand").empty();

  for (var i = 0; i < playerHand.length; i++) {
    let card = $('<div class="col-2"><img src="images/' + playerHand[i] + '.png" alt="' + playerHand[i] + '" class="h-50 object-fit-contain"></div>');
    $("#player-hand").append(card);
  }

  for (var j = 0; j < dealerHand.length; j++) {
    if (j === 0) {
      $("#dealer-hand").append('<div class="col-2"><img src=images/cardBack.png alt="" class="h-50 object-fit-contain"></div>');
    } else {
      $("#dealer-hand").append('<div class="col-2"><img src=images/' + dealerHand[j] + '.png alt="" class="h-50 object-fit-contain"></div>');
    }
  }
}


// Gets deck, resets hands, deals two cards to player and dealer

function beginRound() {
  shuffleDeck();
  dealerHand.push(deck.shift());
  dealerHand.push(deck.shift());
  playerHand.push(deck.shift());
  playerHand.push(deck.shift());
  displayCards();
}

function hit(hand, elementId) {
  hand.push(deck.shift());
  displayCards();
  if (isBust(hand) == true) {
    endGame();
  }
}

/**
* Plays dealer's turn. Called when player stands.
* IDK when dealer's face down card is revealed?
* Nick: ^ didn't get around to this, but it won't be tricky
*/
function dealerTurn() {
  dealerWait = setInterval(function () {
    if (countPoints(dealerHand) < 17) {
      hit(dealerHand, "#dealer-cards");
    }
    else {
      endGame();
    }
  }, 800)
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
  clearInterval(dealerWait);
  gameboard.style.display = "none";
  results.style.display = "block";
  btnPlayAgain.addEventListener("click", initiateGame);

  //append final scores to p elements
  $('#playerScore').text(countPoints(playerHand));
  $('#dealerScore').text(countPoints(dealerHand));



  // check for bust, tie, win, lose; display message
  if (isBust(playerHand) == true) {
    bust.style.display = "block";
    lose.style.display = "block";
    win.style.display = "none";
    tie.style.display = "none";


  } else if (isTie() == true) {
    tie.style.display = "block";
    win.style.display = "none";
    bust.style.display = "none";
    lose.style.display = "none";

  } else if (playerWins() == true) {
    win.style.display = "block";
    bust.style.display = "none";
    lose.style.display = "none";
    tie.style.display = "none";

  } else {
    lose.style.display = "block";
    win.style.display = "none";
    bust.style.display = "none";
    tie.style.display = "none";
  }

}

