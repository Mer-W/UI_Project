// Meredith White 2340884

public class Die {
	
	// fields
	int sides;
	
	// constructor
	public Die() {
		
		sides = 6;
	}
	
	// roll method
	public int getRoll() {
		
		// dice roll
		double r = Math.random();
		double tmp = (r * sides);
		
		// roll result
		return (int) (1 + tmp);	

	}	
}
