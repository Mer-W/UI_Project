// Meredith White 2340884

import java.util.ArrayList;
import java.util.InputMismatchException;
import java.util.Scanner;

public class SlotMachine {

	public static void main(String[] args) {
		
		double bet = 0;
		double betsTotal = 0;
		double winningsTotal = 0;
		int choice = 1;
	
		while (choice != 0) {
			
			try {
				
				//scanner
				Scanner scan = new Scanner(System.in);
				
				// get bet
				bet = getBet(scan);
				
				// add to bets total
				betsTotal += bet;
				
				// get fruits
				ArrayList<String> fruits = getFruits();
				
				System.out.println(fruits);
		
				// calculate winnings
				double winnings = getWinnings(fruits, bet);
				
				// add to total
				winningsTotal += winnings;
				
				// display winnings
				System.out.println("Amount won: $" + String.format("%.2f", winnings));
				
				// play again or quit
				choice = getChoice(scan);
				
				// quit
				if (choice == 0) {
					
					// display final totals
					System.out.println("Total bets: $" + String.format("%.2f", betsTotal) + "\nTotal winnings: $" + String.format("%.2f", winningsTotal));

					scan.close();
				}
			
			// input not double or integer
			} catch (InputMismatchException e) {
				
				System.out.println("Invalid input. Try again.");
			}	
		}
	}
	
	public static  double getBet(Scanner scan)  {
		
		double bet = 0;
		
		System.out.println("Enter the amount you want to risk.");
		
		bet = scan.nextDouble();	
		
		// validate
		while (!(bet > 0)) {
			
			System.out.println("Must bet positive amount. Try again.");
			
			bet = scan.nextDouble();	
		}
		
		return bet;	
	}
	
	public static String getFruit() {
		
		// String variable
		String str = "";
		
		// generate random number
		double r = Math.random();
		double tmp = (r * 5);
		int i = (int) tmp;	
		
		// assign fruit to number
		switch (i) {
		
		case 0:
			str = "Cherries";
			break;
		case 1:
			str = "Oranges";
			break;
		case 2:
			str = "Plums";
			break;
		case 3: 
			str = "Bells";
			break;
		case 4:
			str = "Melons";	
			break;
		case 5:
			str = "Bars";	
			break;
		}
		
		return str;
	}
	
	public static ArrayList<String> getFruits() {
		
		// ArrayList to store fruits
		ArrayList<String> fruits = new ArrayList<String>();
		
		// add each color
		for (int i = 1; i <= 3; i++ ) {
			
			fruits.add(getFruit());
		}
		
		return (ArrayList<String>) fruits;
	}
	
	public static double getWinnings(ArrayList<String> fruits, double bet) {
		
		// compare fruits elements
		
		if (fruits.get(0).equals(fruits.get(1)) && fruits.get(1).equals(fruits.get(2))) {
			
			return bet * 3;
			
		} else if (fruits.get(0).equals(fruits.get(1)) || fruits.get(1).equals(fruits.get(2)) || fruits.get(0).equals(fruits.get(2))) {
			
			return bet * 2;
			
		} else {
			
			return 0;
		}
	}
	
	public static int getChoice(Scanner scan) {
		
		int choice = 0;
		
		System.out.println("Enter 1 to play again, 0 to quit.");
		
		choice = scan.nextInt();	
			
		while (choice < 0 || choice > 1) {
			
			System.out.println("Invalid choice. Try again.");
			
			choice = scan.nextInt();	
		}

		return choice;	
	}
}
