package ihm;

import job.Philosopher;

/**
 * IHM using the default output
 */
class IHMConsole extends IHM
{
	/**
	 * create a new IHM
	 * @param philosophers the philosophers array used for displaying values
	 */
	public IHMConsole(Philosopher[] philosophers)
	{
		super(philosophers);
	}
	
	/**
	 * redraw the IHM to give updated informations
	 */
	@Override
	public void redraw()
	{
		System.out.println();
		for (Philosopher phil : philosophers)
		{
			System.out.println("Philosopher " + phil.getPhilId() + " is " + phil.getPhilState().toString() + "\t" + phil.baguettesString());
		}
		System.out.println();
	}

}
