// Meredith White 2340884

public class DRPlayer {

	// fields
	int points = 1000;
	int call = 0;
	int bet = 0;
	int roll = 0;

	// constructor
	public DRPlayer(int call, int bet) {
		
		this.call = call;
		this.bet = bet;
	}

	// getters and setters
	
	public int getPoints() {
		return points;
	}

	public void setCall(int call) {
		this.call = call;
	}

	public void setBet(int bet) {
		this.bet = bet;
	}

	public int getRoll() {
		return roll;
	}
	
	// roll method
	public void rollDice() {
		
		Die die1 = new Die();
		Die die2 = new Die();
		
		roll = die1.getRoll() + die2.getRoll();
		
		if ((roll > 7 && call == 1 || (roll < 7) && call == 0)) {
			
			points += bet * 2;
			
		} else {
			
			points -= bet;
		}	
	}
}
