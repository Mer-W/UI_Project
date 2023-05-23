// Meredith White 2340884

public class AdderProblem {

	// variables
	int addendA;
	int addendB;
	int sum;
	int guess;
	
	
	public AdderProblem() {
		
		guess = 0;
		addendA = 0;
		addendB = 0;
		sum = 0;
	}



	public void setGuess(int guess) {
		this.guess = guess;
	}

	public int getGuess() {
		return guess;
	}

	public int getSum() {
		return sum;
	}


	// addend method
	public int addend() {

		// generate number
		double r = Math.random();
		double tmp = (r * 21);
		
		// addend result
		return (int) (tmp);	
	}
	
	// equation method
	public String getProblem() {
		
		addendA = addend();
		addendB = addend();
		sum = addendA + addendB;

		return addendA + " + " + addendB + " = ";
	}
	
	// evaluate guess
	public boolean isCorrect() {
		
		if (guess == (addendA + addendB)) {
			
			return true;
			
		} else {
			
			return false;
		}
	}
}
