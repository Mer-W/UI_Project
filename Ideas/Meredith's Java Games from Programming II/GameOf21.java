// Meredith White 2340884

import java.util.Scanner;

public class GameOf21 {
	
	public static void main(String[] args) {

		// variables
		int points = 0;
		int computerPoints;
		int userChoice = 0;
		int card1 = 0;
		int card2 = 0;
		int card3 = 0;
		
		// computer object
		Opponent21 computer = new Opponent21();
		
		// scanner
		Scanner scan = new Scanner(System.in);
		
		// game play
		
		while (userChoice != 2) {
			
			// user deal
			card1 = dealCard();
			card2 = dealCard();
		
			System.out.println("Your cards: " + cardName(card1) + ", " + cardName(card2));
		
			points = pointsTotal(cardPoints(card1), cardPoints(card2), 0);
		
			// computer deal
			computer.setCard1(dealCard());
			computer.setCard2(dealCard());
		
			System.out.println("Opponent's cards: " + cardName(computer.getCard1()) + ", " + cardName(computer.getCard2()));
		
			computerPoints = cardPoints(computer.getCard1()) + cardPoints(computer.getCard2());

			// user turn
			System.out.println("Enter 0 to stay, 1 to hit, or 2 to quit.");

			// get choice
			userChoice = scan.nextInt();
			
			while (!(userChoice == 0 || userChoice == 1 || userChoice == 2)) {
				
				System.out.println("Not a valid choice. Try again.");
				userChoice = scan.nextInt();		
			}

			// hit
			if  (userChoice == 1) {
			
				// deal card 3 and total
				card3 = dealCard();
				System.out.println("Your cards: " + cardName(card1) + ", " + cardName(card2)  + ", " + cardName(card3));
				points = pointsTotal(cardPoints(card1), cardPoints(card2), cardPoints(card3));
			
			// quit
			} else if (userChoice == 2) {
			
				System.out.println("Goodbye!");
				System.exit(2);

			}
		
			// bust
			if (points > 21) {
		
				System.out.println("Your total: " + points + "\nYou lose.");
				System.out.println("----------------\nNext round.\n----------------");
		
			} else {
			
				// computer turn
			
				// hit
				if (computerPoints < 17) {
			
					computer.setCard3(dealCard());
					System.out.println("Opponent hits.");
					System.out.println("Opponent's cards: " + cardName(computer.getCard1()) + ", " + cardName(computer.getCard2())  + ", " + cardName(computer.getCard3()));
					computerPoints = pointsTotal(cardPoints(computer.getCard1()), cardPoints(computer.getCard2()), cardPoints(computer.getCard3()));		
		
				// stay
				} else {
			
					System.out.println("Opponent stays.");
				}

				// compare and display total points
				if (points <= 21 && (points > computerPoints || computerPoints > 21)) {
			
					System.out.println("Your total: " + points + "\nOpponent's total: " + computerPoints + "\nYou win!");
					System.out.println("----------------\nNext round.\n----------------");

				} else 	if (points <= 21 && points == computerPoints) {
			
					System.out.println("Your total: " + points + "\nOpponent's total: " + computerPoints + "\nYou tie!");
					System.out.println("----------------\nNext round.\n----------------");
		
				} else {
			
					System.out.println("Your total: " + points + "\nOpponent's total: " + computerPoints + "\nYou lose.");
					System.out.println("----------------\nNext round.\n----------------");
				
				}
			}
		}
		scan.close();
	}
	
	// methods

	public static int dealCard() {
		
			double r = Math.random();
			double tmp = (r * 13);
			return (int) (1 + tmp);	
	}
	
	public static boolean isAce(int card) {
		
		if (card == 1) {
			
			return true;
			
		} else {
			
			return false;
		}
	}
	
	public static String cardName(int card) {
		
		switch (card) {
		
			case 1:
				return "Ace";
			case 11:
				return "Jack";
			case 12:
				return "Queen";
			case 13:
				return "King";
			default:
				return String.valueOf(card);
		}		
	}
	
	public static int cardPoints(int card) {
		
		switch (card) {
		
			case 11:
				return 10;
			case 12:
				return 10;
			case 13:
				return 10;	
			default:
				return card;		
		}		
	}
	
	public static int pointsTotal(int card1, int card2, int card3) {
	
		if ((cardPoints(card1) + cardPoints(card2) + cardPoints(card3) + 10 <= 21) && (isAce(card1) || isAce(card2) || isAce(card3))) {
			
			return cardPoints(card1) + cardPoints(card2) + cardPoints(card3) + 10;
			
		} else {
			
			return cardPoints(card1) + cardPoints(card2) + cardPoints(card3);
		}
	}
}
