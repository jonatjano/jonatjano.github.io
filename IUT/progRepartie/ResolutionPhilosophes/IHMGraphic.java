package ihm;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.geom.Line2D;

import javax.swing.JFrame;
import javax.swing.JPanel;

import job.PhilState;
import job.Philosopher;

/**
 * graphical IHM
 */
class IHMGraphic extends IHM
{
	/**
	 * Panel used to diplay everithing
	 */
	private JPanel canvas;

	/**
	 * create a new IHMGraphic
	 * @param philosophers the philosophers array used for displaying values
	 */
	public IHMGraphic(Philosopher[] philosophers)
	{
		super(philosophers);

		// create the frame
		JFrame frame = new JFrame();
		frame.setSize(800, 600);

		// create the panel
		canvas = new JPanel()
		{
			/**
			 * paint the philosophers
			 * @param g the graphics given by JPanel class when calling JPanel.repaint();
			 */
			@Override
			protected void paintComponent(Graphics g)
			{
				// never ever forget to call this when overriding his function
				super.paintComponent(g);

				// getting Graphics2D which can draw more things than Graphics
				Graphics2D g2d = (Graphics2D) g;

				// draw the drawing legend
				g2d.setColor(Color.blue);
				g2d.fillOval(10, 10, 50, 50);
				g2d.setColor(Color.orange);
				g2d.fillOval(10, 70, 50, 50);
				g2d.setColor(Color.black);
				g2d.setFont(g2d.getFont().deriveFont(50.0f));
				g2d.drawString("Dors / Pense", 70, 60);
				g2d.drawString("Mange", 70, 120);

				// draw the philosophers
				for (int i = 0; i < philosophers.length; i++)
				{
					// change color according to state
					switch (philosophers[i].getPhilState())
					{
						case SLEEPING : g2d.setColor(Color.blue); break;
						case EATING : g2d.setColor(Color.orange); break;
					}

					// calculate the upperleft corner of the philosopher
					// philosophers are placed in cicle
					int startXPhil = (int)(375 + 300 * Math.sin(2 * Math.PI * i / philosophers.length));
					int startYPhil = (int)(285 + 190 * Math.cos(2 * Math.PI * i / philosophers.length));
					g2d.fillOval(startXPhil, startYPhil, 50, 50);

					// calculate the 2 points of Baguettes
					int[] xPointsBag = new int[2];
					xPointsBag[0] = (int)(400 + 350 * Math.sin(2 * Math.PI * (i + 0.5) / philosophers.length));
					xPointsBag[1] = (int)(400 + 250 * Math.sin(2 * Math.PI * (i + 0.5) / philosophers.length));
					int[] yPointsBag = new int[2];
					yPointsBag[0] = (int)(310 + 250 * Math.cos(2 * Math.PI * (i + 0.5) / philosophers.length));
					yPointsBag[1] = (int)(310 + 150 * Math.cos(2 * Math.PI * (i + 0.5) / philosophers.length));
					g2d.setColor(Color.black);
					Line2D line = new Line2D.Double();
					line.setLine(xPointsBag[0], yPointsBag[0], xPointsBag[1], yPointsBag[1]);
					// draw the Baguette
					g2d.draw(line);
				}
			}
		}; // end of JPanel

		// set panel size
		canvas.setSize(800, 600);
		// finish initializing frame
		frame.add(canvas);
		frame.setVisible(true);
	}

	/**
	 * redraw the IHM to give updated informations
	 */
	@Override
	public void redraw()
	{
		canvas.repaint();
	}
}
