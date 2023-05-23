// Meredith White 2340884

import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;

public class ESPGame {

	public static void main(String[] args) {
		
		System.out.println("Guess which colors the computer has chosen.");
		
		ArrayList<String> colors = getColors();
		
		ArrayList<String>  guesses = getGuesses();
		
		System.out.println(getCorrect(colors, guesses));
		
	}
	
	// generate computer colors
	
	public static String getColor() {
		
		// String variable
		String str = "";
		
		// generate random number
		double r = Math.random();
		double tmp = (r * 5);
		int i = (int) (1 + tmp);	
		
		// assign color to number
		switch (i) {
		
		case 1:
			str = "Red";
			break;
		case 2:
			str = "Green";
			break;
		case 3:
			str = "Blue";
			break;
		case 4: 
			str = "Orange";
			break;
		case 5:
			str = "Yellow";	
			break;
		}
		
		return str;
	}

	// get 10 colors
	
	public static ArrayList<String> getColors() {
		
		// ArrayList to store colors
		List<String> colors = new ArrayList<String>();
		
		// add each color
		for (int i = 1; i <= 10; i++ ) {
			
			colors.add(getColor());
		}
		
		return (ArrayList<String>) colors;
	}

	
	// collect 10 guesses
	
	public static ArrayList<String> getGuesses() {
		
		// ArrayList to store guesses
		List<String> guesses = new ArrayList<String>();
		
		Scanner scan = new Scanner(System.in);
		
		// add each guess
		for (int i = 1; i <= 10; i++ ) {
			
			System.out.println("Enter guess for color " + i + ": ");
			
			String guess = scan.nextLine();

			guesses.add(guess);
		}
		
		scan.close();
		
		return (ArrayList<String>) guesses;
	}
	
	// compare colors to guesses
	
	public static String getCorrect(ArrayList<String> guesses, ArrayList<String> colors) {
		
		int correct = 0;
		
		for (int i = 0; i < 10; i++ ) {
			
			if (guesses.get(i).equalsIgnoreCase(colors.get(i))) {
				
				correct++;
			}
		}
		
		return "Correct guesses: " + correct;
	}
}
