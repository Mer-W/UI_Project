// variables for cards
let deck;
let topCard;
let playerScore = 0;
let dealerScore = 0;
let dealerWait;
var playerHand = [];
var dealerHand = [];
// bank balance
var balance = 100;
var bet = 0;

// event listener for onload setup
window.addEventListener('load', setup);

// variables for DOM elements
// game phases
var intro = document.getElementById("intro");
var gameboard = document.getElementById("game-board");
var results = document.getElementById("result-section");
// buttons
var btnStart = document.getElementById("start-button");
var btnHit = document.getElementById("hit-button").addEventListener("click", function () { hit(playerHand) });
var btnStand = document.getElementById("stand-button").addEventListener("click", dealerTurn);
var btnPlayAgain = document.getElementById("play-again-button");
// results messages
var bust = document.getElementById("bust");
var tie = document.getElementById("tie");
var win = document.getElementById("win");
var lose = document.getElementById("lose");

// audio
var music = document.getElementById("bg-music");
var musicPlaying = true;



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
  sfxShuffleSound();
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
  gameboard.style.display = "block";
  $('#game-buttons').hide();
  $('#play-again-button').hide();
  $('#token-5').attr("disabled", false);
  $('#token-10').attr("disabled", false);
  results.style.display = "none";
  tie.style.display = "none";
  win.style.display = "none";
  bust.style.display = "none";
  lose.style.display = "none";
  playerHand = [];
  dealerHand = [];
  updatePlayer();
  updateDealer();

  bet = 0;

  $("#token-5").on( "click", function() {
    bet = 5;
    $('#balance').empty().append(balance);
    beginRound();
  });

  $("#token-10").on( "click", function() {
    bet == 10;
    $('#balance').empty().append(balance);
    beginRound();
  });
  
}

/**
* Gets deck, resets hands, deals two cards to player and dealer
*/
function beginRound() {
  sfxBgMusic()
  setVolume(music, 0.1);
  var toggleMusicButton = document.getElementById("toggle-music-button");
  toggleMusicButton.addEventListener("click", toggleMusic);

  shuffleDeck();
  playerHand[0] = dealCard();
  playerHand[1] = dealCard();
  dealerHand[0] = dealCard();
  dealerHand[1] = dealCard();
  showConcealed();
  $("#game-buttons").show();
  $('#token-5').attr("disabled", true);
  $('#token-10').attr("disabled", true);

  if (bet = 5) {
    balance -= 5;

  } else if (bet = 10) {
    balance -= 10;
  }

  $('#balance').empty().append(balance);

  if (countPoints(playerHand) == 21) {
    dealerTurn();
  }

}

function sfxHitSound() {
  var hitSound = document.getElementById("hit-sound");
  hitSound.play();
}

function sfxShuffleSound() {
  var shuffleSound = document.getElementById("shuffle-sound");
  shuffleSound.play();
}

function sfxWinSound() {
  var winSound = document.getElementById("win-sound");
  winSound.play();
}

function sfxLoseSound() {
  var loseSound = document.getElementById("lose-sound");
  loseSound.play();
}

function sfxBgMusic() {
  music.play();
  music.addEventListener("ended", function () {
    music.currentTime = 0;
    music.play();
  })
}
function setVolume(music, volume) {
  if (music) {
    if (music.setVolume) {
      music.setVolume(volume);
    } else if (music.volume) {
      music.volume = volume;
    }
  }
}

function toggleMusic() {
  if (musicPlaying) {
    music.pause();
    music.currentTime = 0;
    musicPlaying = false;
    $(this).html("▶️");
  }
  else {
    music.play();
    musicPlaying = true;
    $(this).html("⏸️");
  }
}


/**
* Populates HTML elements with cards
* @param {array} hand
* @param {string} elementId element to which card is appended
*/
function showHand(hand, elementId) {
  let div = $('<div class="row justify-content-center"></div>');
  for (let i in hand) {
    let card = $('<div class="col-3"><img src="images/' + hand[i] + '.png" alt="' + hand[i] + '" class="w-100"></div>');
    $(div).append(card);
  }
  $(elementId).append(div);
}

/**
* Shows card images, dealer first card face down
*/
function showConcealed() {
  updatePlayer();
  // dealer
  $("#dealer-cards").empty();
  $('#dealerScore').empty();
  $('#dealerScore').append("?");
  div = $('<div class="row justify-content-center"></div>');
  for (let i in dealerHand) {
    if (i == 0) {
      card = $('<div class="col-3"><img src="images/cardBack.png" alt="face down card" class="w-100"></div>');
    } else {
      card = $('<div class="col-3"><img src="images/' + dealerHand[i] + '.png" alt="' + dealerHand[i] + '" class="w-100"></div>');
    }
    $(div).append(card);
  }
  $("#dealer-cards").append(div);
}

function updatePlayer() {
  $("#player-cards").empty();
  $('#playerScore').empty();
  $("#player-cards").append(showHand(playerHand, "#player-cards"));
  $('#playerScore').append(countPoints(playerHand));
}

function updateDealer() {
  $("#dealer-cards").empty();
  $('#dealerScore').empty();
  $("#dealer-cards").append(showHand(dealerHand, "#dealer-cards"));
  $('#dealerScore').append(countPoints(dealerHand));
}

/**
* Adds one card to a player's hand. Called when user clicks "Hit" or on dealer's turn
* @param {array} hand
*/
function hit(hand) {
  sfxHitSound()
  hitWait = setTimeout(function () {
    hand.push(dealCard());
    updatePlayer();

    if (isBust(hand) == true || countPoints(hand) == 21) {
      endGame();
    }
  }, 90)
}

/**
* Plays dealer's turn. Called when player stands.
*/
function dealerTurn() {
  updateDealer();

  dealerWait = setInterval(function () {
    if (countPoints(dealerHand) < 17) {
      hit(dealerHand);
      updateDealer();
    }
    else {
      endGame();
    }
  }, 600)
}


/**
* Compares uneven hands to determine winner
*/
function playerWins() {
  if ((countPoints(dealerHand) < countPoints(playerHand) || isBust(dealerHand) == true) && isBust(playerHand) == false) {
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
  updateDealer();
  updatePlayer();
  $('#game-buttons').hide();
  $('#play-again-button').show();
  results.style.display = "block";
  btnPlayAgain.addEventListener("click", initiateGame);


  // check for bust, tie, win, lose; display message; update bank
  if (isBust(playerHand) == true) {
    sfxLoseSound();
    bust.style.display = "block";
    lose.style.display = "block";

  } else if (isTie() == true) {
    tie.style.display = "block";
    // return bet
      if (bet == 5) {
    balance += 5;

  } else if (bet == 10) {
    balance += 10;
  }
    $('#balance').empty().append(balance);


  } else if (playerWins() == true) {
    sfxWinSound();
    win.style.display = "block";
    // return double bet
    if (bet == 5) {
      balance += 10;
  
    } else if (bet == 10) {
      balance += 20;
    }
    $('#balance').empty().append(balance);

  } else {

    lose.style.display = "block";
    sfxLoseSound();
  }

}

