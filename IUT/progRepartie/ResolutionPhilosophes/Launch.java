import ihm.IHM;

import job.Philosopher;
import job.Baguette;

/**
 * main class
 * create and link every Objects
 */
public class Launch
{
	/**
	 * the base number of {@link Philosopher}
	 */
	public static final int BASE_PHILOSOPHE = 5;

	/**
	 * mathod called by console command
	 * @param args the args of the command,
	 * 	if the first is an Integer > 2, it is used as number of {@link Philosopher} to create
	 */
	public static void main(String[] args)
	{
		// get nbPhil according to args
		int nbPhil = BASE_PHILOSOPHE;
		if (args.length == 0)
		{
			System.out.println("Le nombre de philosophes n'est pas précisé, utilisation de : " + BASE_PHILOSOPHE);
		}
		else
		{
			try
			{
				nbPhil = Integer.parseInt(args[0]);
				if (nbPhil < 2)
				{
					System.out.println("Le nombre de philosophes doit etre superieur a 2, utilisation de : " + BASE_PHILOSOPHE);
					nbPhil = BASE_PHILOSOPHE;
				}
			}
			catch (Exception e)
			{
				System.out.println("L'argument donne pour le nombre de philosophes n'est pas valide, utilisation de : " + BASE_PHILOSOPHE);
			}
		}
		// create te philosophers tab and th IHM
		Philosopher[] philosophers = new Philosopher[nbPhil];
		IHM ihm = IHM.getIHM(philosophers);

		// create each philosophers
		Baguette tmpBag = new Baguette();
		Baguette baguetteFirstAndLast = tmpBag;
		Baguette tmpBag2 = new Baguette();
		for (int i = 0; i < philosophers.length; i++)
		{
			philosophers[i] = new Philosopher(tmpBag, tmpBag2);
			tmpBag = tmpBag2;
			tmpBag2 = new Baguette();
		}
		philosophers[philosophers.length - 1].setBaguettes(null, baguetteFirstAndLast);
		// start the philosophers
		for (int i = 0; i < philosophers.length; i++)
		{
			philosophers[i].start();
		}
	}
}
