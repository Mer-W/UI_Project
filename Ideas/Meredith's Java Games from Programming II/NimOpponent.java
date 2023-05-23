// Meredith White 2340884

public class NimOpponent {

	// field
	int max;
	
	// constructor
	public NimOpponent(int max) {
		
		this.max = max;
	}

	// set max

	public void setMax(int max) {
		this.max = max;
	}
	
	// play method

	public int getPlay() {

		// generate play
		double r = Math.random();
		double tmp = (r * max);
		
		// play result
		return (int) (1 + tmp);	

	}
}
