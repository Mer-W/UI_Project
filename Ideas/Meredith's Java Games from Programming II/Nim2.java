// Meredith White 2340884

import java.util.Scanner;

public class Nim2 {

	public static void main(String[] args) {
		
		// variables
		int stones = 10;
		int play;
		
		// opponent object
		NimOpponent computer = new NimOpponent(3);
		
		// scanner
		Scanner scan = new Scanner(System.in);
		
		// play game
		
		System.out.println("There are " + stones + " stones.");
		System.out.println("Enter number of stones to take.");
		
		// user turn
		play = scan.nextInt();
		
		while (stones > 1) {
			
			// invalid play
			if (!(play < stones && play > 0 && play < 4)) {
				
				System.out.println("That is not a valid play. Try again.");
				play = scan.nextInt();
				
			} else {
				
				// take stones
				stones -= play;
				System.out.println("There are " + stones + " stones.");
				
				// user win
				if (stones == 1) {
					
					System.out.println("You won!");
				
				// computer turn
				} else {
					
					// ensure valid play
					if (stones < 4) {
						computer.setMax(stones - 1);
					}
					
					// computer play
					play = computer.getPlay();
					System.out.println("Opponent takes " + play + " stones.");
					stones -= play;
			
					// computer win
					if (stones == 1) {
						
						System.out.println("You lost.");
					
					// next user turn
					} else {
						
						System.out.println("There are " + stones + " stones.");
						System.out.println("Enter number of stones to take.");
						play = scan.nextInt();

					}
				}
			}
		}
		
		scan.close();
	}
}
