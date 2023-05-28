// variables for cards
var deck;
var topCard;
var dealerWait;
var playerHand = [];
var dealerHand = [];
// bank balance
var balance = 100;
var bet = 0;

// event listeners
$(document).ready(setup);
$("#start-button").on("click", initiateGame);
$('#hit-button').on("click", function () { hit(playerHand); });
$('#stand-button').on("click", dealerTurn);
$('#play-again-button').on("click", initiateGame);
$("#token-5").on("click", function () { bet = 5; beginRound(); });
$("#token-10").on("click", function () { bet = 10; beginRound(); });
$("#toggle-music-button").on("click", toggleMusic);

// audio
var music = $("#bg-music")[0];
var musicPlaying = true;
music.on("ended", function () {
  music.currentTime = 0;
  music.play();
})


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
  $('#shuffle-sound').get(0).play();
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

/**
* Adds one card to a player's hand. Called when user clicks "Hit" or on dealer's turn
* @param {array} hand
*/
function hit(hand) {
  $('#hit-sound').get(0).play();
  hitWait = setTimeout(function () {
    hand.push(dealCard());
    updatePlayer();

    if (isBust(hand) == true || countPoints(hand) == 21) {
      endGame();
    }
  }, 70)
}

/* Background audio */

/**
* Sets music volume
*/
function setVolume(music, volume) {
  if (music) {
    if (music.setVolume) {
      music.setVolume(volume);
    } else if (music.volume) {
      music.volume = volume;
    }
  }
}

/**
* Toggles background music
*/
function toggleMusic() {
  if (musicPlaying) {
    $("#sound-files audio").prop("volume", 0);
    musicPlaying = false;
    $(this).html("▶️");
  }
  else {
    $("#sound-files > audio").prop("volume", 0.1);
    $("#sfx audio").prop("volume", 1);
    musicPlaying = true;
    $(this).html("⏸️");
  }
}

/* Gameplay functions */

/**
* Loads loads opening phase (intro and play button)
*/
function setup() {
  $('#game-board').hide();
  $('#result-section').hide();
}

/**
* Loads game phase
*/
function initiateGame() {
  if (musicPlaying) {
    music.play();
  }
  setVolume(music, 0.1);
  // hide/show game elements
  $('#game-board').show();
  $('#hit-button').attr("disabled", false);
  $('#stand-button').attr("disabled", false);
  $('#intro').hide();
  $('#game-buttons').hide();
  $('#points').hide();
  $('#play-again-button').hide();
  $('#result-section').hide();
  $('#tie').hide();
  $('#win').hide();
  $('#bust').hide();
  $('#lose').hide();
  // reset betting and hands
  $('#token-5').attr("disabled", false);
  $('#token-10').attr("disabled", false);
  playerHand = [];
  dealerHand = [];
  updatePlayer();
  updateDealer();
  bet = 0;
  if (!(balance > 0)) {
    balance = 100;
    $('#balance').html(balance);
  }
}

/**
* Gets deck, resets hands, deals two cards to player and dealer
*/
function beginRound() {
  // buttons
  $("#game-buttons").show();
  $('#points').show();
  $('#token-5').attr("disabled", true);
  $('#token-10').attr("disabled", true);
  // hands
  shuffleDeck();
  playerHand[0] = dealCard();
  playerHand[1] = dealCard();
  dealerHand[0] = dealCard();
  dealerHand[1] = dealCard();
  showConcealed();
  // betting
  balance -= bet;
  $('#balance').empty().append(balance);
  // end turn if 21
  if (countPoints(playerHand) == 21) {
    dealerTurn();
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
    let card = $('<div class="col-3 card-look"><img src="images/' + hand[i] + '.png" alt="' + hand[i] + '" class="w-100"></div>');
    $(div).append(card);
  }
  $(elementId).append(div);
}

/**
* Shows card images on initial deal, dealer first card face down
*/
function showConcealed() {
  updatePlayer();
  $("#dealer-cards").empty();
  $('#dealerScore').html("?");
  div = $('<div class="row justify-content-center"></div>');
  for (let i in dealerHand) {
    if (i == 0) { // face down card
      card = $('<div class="col-3 card-look"><img src="images/cardBack.png" alt="face down card" class="w-100"></div>');
    } else {
      card = $('<div class="col-3 card-look"><img src="images/' + dealerHand[i] + '.png" alt="' + dealerHand[i] + '" class="w-100"></div>');
    }
    $(div).append(card);
  }
  $("#dealer-cards").append(div);
}

/**
* Updates player card images and total points
*/
function updatePlayer() {
  $("#player-cards").empty().append(showHand(playerHand, "#player-cards"));
  $('#playerScore').empty().append(countPoints(playerHand));
}

/**
* Updates dealer card images and total points
*/
function updateDealer() {
  $("#dealer-cards").empty().append(showHand(dealerHand, "#dealer-cards"));
  $('#dealerScore').empty().append(countPoints(dealerHand));
}

/**
* Plays dealer's turn. Called when player stands.
*/
function dealerTurn() {
  $('#hit-button').attr("disabled", true);
  $('#stand-button').attr("disabled", true);
  updateDealer();
  dealerWait = setInterval(function () {
    if (countPoints(dealerHand) < 17) {
      hit(dealerHand);
      updateDealer();
    }
    else {
      endGame();
    }
  }, 400)
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
  $('#result-section').show();

  // check for bust, tie, win, lose; display message; update bank
  if (isBust(playerHand) == true) {
    $('#lose-sound').get(0).play();
    $('#bust').show();
    $('#lose').show();

  } else if (isTie() == true) {
    $('#tie').show();
    balance += bet;
    $('#balance').html(balance);

  } else if (playerWins() == true) {
    $('#win-sound').get(0).play();
    $('#win').show();
    balance += bet * 2;
    $('#balance').html(balance);

  } else {
    $('#lose').show();
    $('#lose-sound').get(0).play();
  }
}

