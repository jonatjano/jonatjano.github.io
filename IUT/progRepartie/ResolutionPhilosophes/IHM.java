package ihm;

import job.Philosopher;
import job.Baguette;

/**
 * abstract class used to get the instance of IHM
 * must be extended by IHMs
 */
public abstract class IHM
{
	/**
	 * the unique instance of IHM
	 */
	private static IHM instance = null;

	/**
	 * list of all philosophers
	 * used to get the informations to display
	 */
	protected Philosopher[] philosophers;

	/**
	 * abstract constructor for IHMs
	 * extending classes must call it
	 * @param philosophers the philosophers array used for displaying values
	 */
	public IHM(Philosopher[] philosophers)
	{
		this.philosophers = philosophers;
	}

	/**
	 * redraw the IHM to give updated informations
	 */
	public abstract void redraw();

	/**
	 * call {@link #getIHM(Philosopher[])} with param "new Philosopher[5]"
	 * @return {@value #instance}
	 */
	public static IHM getIHM()
	{
		return getIHM(new Philosopher[5]);
	}

	/**
	 * call {@link #getIHM(Philosopher[], boolean)} with boolean (isGui) an true
	 * @param philosophers the arrayof {@link Philosopher} used to create a new IHM
	 * @return {@value #instance}
	 */
	public static IHM getIHM(Philosopher[] philosophers)
	{
		return getIHM(philosophers, true);
	}

	/**
	 * return {@link #instance},
	 * if {@link #instance} is null create a new IHM according to isGui value
	 * @param philosophers the arrayof {@link Philosopher} used to create a new IHM
	 * @param isGui whether the create IHM must be a GUI or a CUI
	 * @return {@value #instance}
	 */
	public static IHM getIHM(Philosopher[] philosophers, boolean isGui)
	{
		if (instance == null)
		{
			if (isGui)
			{
				instance = new IHMGraphic(philosophers);
			}
			else
			{
				instance = new IHMConsole(philosophers);
			}
		}
		return instance;
	}
}
