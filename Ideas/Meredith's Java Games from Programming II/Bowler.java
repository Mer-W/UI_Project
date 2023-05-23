// Meredith White 2340884

public class Bowler {

	// fields
	int playerNumber;
	int score;
	int pinsStruck;
	int pinsRemaining;
	
	// constructor
	public Bowler(int playerNumber) {
		
		this.playerNumber = playerNumber;
		
	}

	// getters and setters
	
	public int getPlayerNumber() {
		return playerNumber;
	}

	public void setPlayerNumber(int playerNumber) {
		this.playerNumber = playerNumber;
	}

	public int getScore(int playerNumber) {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public int getPinsStruck() {
		return pinsStruck;
	}

	public void setPinsStruck(int pinsStruck) {
		this.pinsStruck = pinsStruck;
	}

	public int getPinsRemaining() {
		return pinsRemaining;
	}

	public void setPinsRemaining(int pinsRemaining) {
		this.pinsRemaining = pinsRemaining;
	}

	// throw method
	public int bowlThrow() {
		
		double r = Math.random();
		pinsStruck = (int) (r * (pinsRemaining + 1));	
		
		return pinsStruck; 
	}
}
