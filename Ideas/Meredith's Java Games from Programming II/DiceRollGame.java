// Meredith White 2340884

import java.util.Scanner;

public class DiceRollGame {

	public static void main(String[] args) {
		
		// variables
		int call = 0;
		int bet = 0;
		
		// player object 
		DRPlayer game = new DRPlayer(call, bet);
		
		// scanner
		Scanner scan = new Scanner(System.in);
		
	
		// play game
		System.out.println("You have " + game.getPoints() + " points.");
		System.out.println("How many points do you want to risk? (-1 to quit)");

		// get bet
		bet = scan.nextInt();
		game.setBet(bet);
		
		while (bet != -1) {
			
			System.out.println("Make a call (0 for low, 1 for high): ");
			
			// get call
			call = scan.nextInt();
			
			// valid call
			while (call == 0 || call == 1) {
				
				game.setCall(call);
				
				// roll
				game.rollDice();
				
				// display roll and points
				System.out.println("You rolled: " + game.getRoll());
				System.out.println("You now have " + game.getPoints() + " points.");
				
				// next turn
				System.out.println("How many points do you want to risk? (-1 to quit)");
				
				bet = scan.nextInt();
				
				// quit
				if (bet == -1) {
					
					System.exit(0);
				}
				
				// bet
				game.setBet(bet);
				
				// get call
				System.out.println("Make a call (0 for low, 1 for high): ");
				
				call = scan.nextInt();
			}
			
			// quit
			if (call == -1) {
					
				System.exit(0);
				
			// invalid call
			} else if (!(call == 0 || call == 1)) {
					
				System.out.println("That is not a valid call.");
			}
		}

		scan.close();
	}
}
