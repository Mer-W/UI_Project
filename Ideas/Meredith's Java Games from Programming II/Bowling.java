// Meredith White 2340884

import java.util.Scanner;

public class Bowling {

	
	public static void main(String[] args) {
		
		// variables
		int playerNum = 0;
		int turns = 10;
		int choice = 0;
		int frame = 0;

		// user input
		Scanner scan = new Scanner(System.in);
		
		// set up game
		System.out.println("Enter number of players, or 0 to quit.");
		
		choice = scan.nextInt();
		
		// to exit
		if (choice == 0) {
		
		System.exit(0);
		
		}
		
		// get players
		
		playerNum = choice;
		Bowler[] player = new Bowler[playerNum];
		
		for (int j = 0; j < playerNum; j++) {
			
			player[j] = new Bowler(j + 1);
		}
		
		// play game
		while (choice != 0 && frame <= turns ) {

			
			// frames
			for (int i = 1; i <= turns; i++) {

				frame = i;
				System.out.println("\n----- Frame " + i + " -----\n");

				// player turns
				for (int j = 0; j < playerNum; j++) {
						
					System.out.println("Player " + (j+1) + " turn. Enter 1 to throw.");
					
					choice = scan.nextInt();
					
					// if invalid
					while (!(choice == 1 || choice == 0)) {
						
						System.out.println("That is not a valid choice. Try again.");
						choice = scan.nextInt();
						
					} 
		
					// quit
					if (choice == 0)  {
						
						System.exit(0);
					
					// run player turn
					} else {
						
						// set up pins
						player[j].setPinsRemaining(10);	
						
						// throw
						player[j].setPinsStruck(player[j].bowlThrow());	
						
						// after throw
						int pinsDown = player[j].getPinsStruck();
						player[j].setPinsRemaining(10 - pinsDown);		
						int pinsUp = player[j].getPinsRemaining();

						// determine if next throw
						if (pinsDown < 10) {
							
							System.out.println("Player " + (j+1) + " struck " + pinsDown + " pins.");
							
							// second throw
							player[j].setPinsStruck(player[j].bowlThrow());
							
							// after throw
							pinsDown = pinsDown + player[j].getPinsStruck();
							player[j].setPinsRemaining(pinsUp - pinsDown);
							pinsUp = player[j].getPinsRemaining();
							
							// calculate points
							
							// spare
							if (pinsDown == 10) {
								
								System.out.println("Player " + (j+1) + " struck " + player[j].getPinsStruck() + " pins. Spare.");
								
								player[j].setScore(player[j].getScore(j+1) + 15);
								
								System.out.println("Player " + (j+1) + " score: " + player[j].getScore(j+1));
							
							// not spare or strike
							} else {
								
								System.out.println("Player " + (j+1) + " struck " + player[j].getPinsStruck() + " pins.");
								player[j].setScore(player[j].getScore(j+1) + pinsDown);
								System.out.println("Player " + (j+1) + " score: " + player[j].getScore(j+1));
							}
						
						// strike
						} else {
							
							System.out.println("Player " + (j+1) + " struck " + player[j].getPinsStruck() + " pins. Strike!");
							player[j].setScore(player[j].getScore(j+1) + 20);
							System.out.println("Player " + (j+1) + " score: " + player[j].getScore(j+1));
						}
					}
				}
				
			}
			
			// after completed game
			
			if (choice == 0) {
				
				System.exit(0);
			
			// print final scores
			} else {
				
				System.out.println("\n----- Total scores -----\n");
				
				for (int j = 0; j < playerNum; j++) {
					
					System.out.println("Player " + (j+1) + ": " + player[j].getScore(j+1));
				}
				
				System.out.println("\nGood game!");
				System.exit(frame);
			}		
		}
		
		scan.close();
	}
}
