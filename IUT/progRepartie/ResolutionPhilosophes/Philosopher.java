package job;

import ihm.IHM;

/**
 * class simulating the {@link Philosopher}
 */
public class Philosopher extends Thread
{
	/**
	 * auto-incrementing value used to set IDs
	 */
	private static int staticId = 0;
	/**
	 * {@link Philosopher}'s id
	 */
	private int philId;
	/**
	 * the first {@link Baguette} of the {@link Philosopher}
	 */
	private Baguette b1;
	/**
	 * the second {@link Baguette} of the {@link Philosopher}
	 */
	private Baguette b2;
	/**
	 * the current state of the {@link Philosopher}
	 */
	private PhilState state;

	/**
	 * create a {@link Philosopher} linked to it's {@link Baguette}
	 * @param b1 the first {@link Baguette} of the {@link Philosopher}
	 * @param b2 the second {@link Baguette} of the {@link Philosopher}
	 */
	public Philosopher(Baguette b1, Baguette b2)
	{
		this.philId = staticId++;
		this.b1 = b1;
		this.b2 = b2;
		this.state = PhilState.SLEEPING;
	}

	/**
	 * return {@link Philosopher}'s state
	 * @return {@link #state}
	 */
	public PhilState getPhilState()
	{
		return state;
	}

	/**
	 * set {@link Philosopher}'s state
	 * this method call {@link IHM#redraw()}
	 * @param state the new state
	 */
	public void setPhilState(PhilState state)
	{
		this.state = state;
		IHM.getIHM().redraw();
	}

	/**
	 * return {@link Philosopher}'s id
	 * @return {@link #philId}
	 */
	public int getPhilId()
	{
		return philId;
	}

	/**
	 * set the {@link Baguette} of the {@link Philosopher}
	 * every null value is skyped
	 * @param b1 the first {@link Baguette} of the {@link Philosopher}
	 * @param b2 the second {@link Baguette} of the {@link Philosopher}
	 */
	public void setBaguettes(Baguette b1, Baguette b2)
	{
		if (b1 != null) { this.b1 = b1; }
		if (b2 != null) { this.b2 = b2; }
	}

	/**
	 * get the {@link Philosopher}'s {@link Baguette}s state
	 * @return a string telling if the {@link Baguette}s are available
	 */
	public String baguettesString()
	{
		return b1.isAvailable() + " " + b2.isAvailable();
	}

	/**
	 * makethe {@link Philosopher} do it's actions
	 */
	public void run()
	{
		int i = 0;
		while(true)
		{
			try
			{
				if(b1.tryEating(this))
				{
					if (b2.tryEating(this))
					{
						b1.eat(this);
						b2.eat(this);
						Thread.sleep((int)(Math.random()) * 5000 + 1000);
						b1.stopEating(this);
						b2.stopEating(this);
					}
					else
					{
						b1.stopEating(this);
					}
				}
				i++;
				Thread.sleep((int)(Math.random()) * 3000 + 2000);
			}
			catch (InterruptedException e)
			{

			}
		}
	}
}
