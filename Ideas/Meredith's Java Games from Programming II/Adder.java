// Meredith White 2340884

import java.util.Scanner;

public class Adder {

	public static void main(String[] args) {

		// variable
		int points = 0;
		
		// scanner
		Scanner scan = new Scanner(System.in);
		
		// object instance
		AdderProblem problem = new AdderProblem();
		
		// get first problem
		System.out.println(problem.getProblem());
		
		// get guess
		problem.setGuess(scan.nextInt());
		
		while (problem.getGuess() != 999) {
			
			// first guess correct
			if (problem.isCorrect()) {
				
				points += 5;
			
			// first guess incorrect
			} else {
				
				// max 3 guesses
				for (int guess = 2; guess <= 3 && !problem.isCorrect() ; guess++) {
					
					System.out.println("Wrong answer. Enter another answer: ");
					
					problem.setGuess(scan.nextInt());
					
					// second guess correct
					if (problem.isCorrect() && guess == 2) {
						
						points += 3;
					
					// third guess correct
					} else if (problem.isCorrect() && guess == 3) {
						
						points += 1;
						
					// third guess incorrect	
					} else if (!problem.isCorrect() && guess == 3) {
						
						System.out.println("The correct answer is " + problem.getSum() + ".");	
					}
				}
			}
			// next problem
			System.out.println(problem.getProblem());
			
			problem.setGuess(scan.nextInt());
		}
		
		// quit and print final score
		if (problem.getGuess() == 999) {
			
			System.out.println("Your score is: " + points);
		}
		
		scan.close();
	}
}
