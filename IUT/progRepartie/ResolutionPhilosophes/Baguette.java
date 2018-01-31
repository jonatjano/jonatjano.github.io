package job;

import java.util.concurrent.Semaphore;
import ihm.IHM;

/**
 * classe used to simulate object which can be used by one Thread({@link Philosopher}) at a time
 */
public class Baguette
{
	/**
	 * auto-incrementing int to give the created {@link Baguette} instance an id
	 */
	private static int staticId = 0;
	/**
	 * auto-incrementing id
	 */
	private int id;
	/**
	 * instance of {@link Semaphore} used to control if a new {@link Philosopher} can eat
	 * @param  1    max number of {@link Philosopher} allowed at the same time
	 * @param  true set {@link Semaphore} fairness to true to guarantees {@link Philosopher} acces in the asking order
	 */
	private Semaphore available = new Semaphore(1, true);

	/**
	 * give an id to this {@link Baguette}
	 */
	public Baguette()
	{
		id = staticId++;
	}

	/**
	 * if the {@link Baguette} is used
	 * used by IHM to display informations
	 * @return whether the {@link Baguette} is used or not
	 */
	public boolean isAvailable()
	{
		return available.availablePermits() != 0;
	}

	/**
	 * called by {@link Philosopher} to know if they can use the {@link Baguette}
	 * if they can the {@link Baguette} is reserved
	 * @param phil the calling {@link Philosopher}
	 * @return whether the {@link Philosopher} has reserved this {@link Baguette}
	 */
	public synchronized boolean tryEating(Philosopher phil)
	{
		if (!available.tryAcquire())
		{
			return false;
		}
		return true;
	}

	/**
	 * the {@link Philosopher} start eating
	 * called by a {@link Philosopher} if it has reserved both of his {@link Baguette}
	 * @param phil the calling {@link Philosopher}
	 */
	public synchronized void eat(Philosopher phil)
	{
		phil.setPhilState(PhilState.EATING);
	}

	/**
	 * the {@link Philosopher} stop eating
	 * @param phil the calling {@link Philosopher}
	 */
	public synchronized void stopEating(Philosopher phil)
	{
		available.release();
		phil.setPhilState(PhilState.SLEEPING);
	}
}
