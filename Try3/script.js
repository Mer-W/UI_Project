$(document).ready(function() {
    // Card deck
    var deck = [
        "2club", "3club", "4club", "5club", "6club", "7club", "8club", "9club", "Tclub", "Jclub", "Qclub", "Kclub", "Aclub",
        "2spade", "3spade", "4spade", "5spade", "6spade", "7spade", "8spade", "9spade", "Tspade", "Jspade", "Qspade", "Kspade", "Aspade",
        "2heart", "3heart", "4heart", "5heart", "6heart", "7heart", "8heart", "9heart", "Theart", "Jheart", "Qheart", "Kheart", "Aheart",
        "2diamond", "3diamond", "4diamond", "5diamond", "6diamond", "7diamond", "8diamond", "9diamond", "Tdiamond", "Jdiamond", "Qdiamond", "Kdiamond", "Adiamond"
    ];

    var playerHand = [];
    var dealerHand = [];
    var bankCoins = 90;
    var betCoins = 10;

    // Deal initial cards
    function dealInitialCards() {
        playerHand.push(deck.shift());
        dealerHand.push(deck.shift());
        playerHand.push(deck.shift());
        dealerHand.push(deck.shift());

        displayCards();
        updateScores();
    }

    // Display cards on the screen
    function displayCards() {
        $("#player-hand").empty();
        $("#dealer-hand").empty();

        for (var i = 0; i < playerHand.length; i++) {
            $("#player-hand").append("<img src='images/" + playerHand[i] + ".png'>");
        }

        for (var j = 0; j < dealerHand.length; j++) {
            if (j === 0) {
                $("#dealer-hand").append("<img src='images/cardBack.png'>");
            } else {
                $("#dealer-hand").append("<img src='images/" + dealerHand[j] + ".png'>");
            }
        }
    }

    // Update scores on the screen
    function updateScores() {
        var playerScore = calculateHandScore(playerHand);
        var dealerScore = calculateHandScore(dealerHand.slice(1)); // Hide dealer's cardBack card

        $("#player-score").text("Score: " + playerScore);
        $("#dealer-score").text("Score: " + dealerScore);
    }

    // Calculate the score of a hand
    function calculateHandScore(hand) {
        var score = 0;
        var hasAce = false;

        for (var i = 0; i < hand.length; i++) {
            var card = hand[i];
            var cardValue = parseInt(card);

            if (isNaN(cardValue)) {
                if (card === "Aclub" || card === "Aspade" || card === "Aheart" || card === "Adiamond") {
                    score += 11;
                    hasAce = true;
                } else {
                    score += 10;
                }
            } else {
                score += cardValue;
            }
        }

        // Adjust score if there is an Ace and it's value needs to be reduced
        if (score > 21 && hasAce) {
            score -= 10;
        }

        return score;
    }

    // Player hits
    function playerHit() {
        playerHand.push(deck.shift());
        displayCards();
        var playerScore = calculateHandScore(playerHand);
        $("#player-score").text("Score: " + playerScore);

        if (playerScore > 21) {
            endGame("Player busts. You lose!");
        } else if (playerScore === 21) {
            playerStand();
        }
    }

    // Player stands
    function playerStand() {
        $("#dealer-hand img:first-child").remove();
        $("#dealer-hand img:first-child").attr("src", "images/" + dealerHand[0] + ".png");

        var dealerScore = calculateHandScore(dealerHand);
        while (dealerScore < 17) {
            dealerHand.push(deck.shift());
            dealerScore = calculateHandScore(dealerHand);
            $("#dealer-score").text("Score: " + dealerScore);
        }

        displayCards();
        if (dealerScore > 21) {
            endGame("Dealer busts. You win!");
        } else {
            var playerScore = calculateHandScore(playerHand);
            if (playerScore > dealerScore) {
                endGame("You win!");
            } else if (playerScore < dealerScore) {
                endGame("You lose!");
            } else {
                endGame("Push! It's a tie.");
            }
        }
    }

    // End the game and display the result
    function endGame(resultText) {
        $("#result").text(resultText);
        $("#hit-btn, #stand-btn").attr("disabled", true);

        
        if (resultText.includes("win")) {
            bankCoins += betCoins;
        } else if (resultText.includes("lose")) {
            bankCoins -= betCoins;
        }

        // Update bank and bet information
        $("#bank-coins").text(bankCoins);
        $("#bet-coins").text(betCoins);

        if (bankCoins <= 0) {
            endGame("You are bankrupt!");
            $("#reset-btn").attr("disabled", true);
        }
    }

    // Reset the game
    function resetGame() {
        deck = shuffleDeck();
        playerHand = [];
        dealerHand = [];
        $("#result, #player-score, #dealer-score").empty();
        $("#player-hand, #dealer-hand").empty();
        $("#hit-btn, #stand-btn").attr("disabled", false);
        $("#reset-btn").attr("disabled", false);

        // Reset bank and bet information
        bankCoins = 90;
        betCoins = 10;
        $("#bank-coins").text(bankCoins);
        $("#bet-coins").text(betCoins);

        dealInitialCards();
    }

    // Shuffle the deck using Fisher-Yates algorithm
    function shuffleDeck() {
        var currentIndex = deck.length, temp, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            temp = deck[currentIndex];
            deck[currentIndex] = deck[randomIndex];
            deck[randomIndex] = temp;
        }

        return deck;
    }

    // Button click events
    $("#hit-btn").click(playerHit);
    $("#stand-btn").click(playerStand);
    $("#reset-btn").click(resetGame);

    // Start the game
    resetGame();
});
