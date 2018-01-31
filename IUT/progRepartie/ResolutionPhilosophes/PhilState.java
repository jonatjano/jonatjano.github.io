package job;

/**
 * the state of {@link Philosopher}
 */
public enum PhilState
{
	/**
	 * when the {@link Philosopher} sleeping
	 * @param "sleeping/thinking" the string representation
	 */
	SLEEPING   ("sleeping / thinking"),
	/**
	 * when the {@link Philosopher} eating
	 * @param "eating" the string representation
	 */
	EATING     ("eating            ");

	/**
	 * string representation of the state
	 */
	private String toStringRet;

	/**
	 * create a new state
	 * @param toStringRet string representation of the state
	 */
	private PhilState(String toStringRet)
	{
		this.toStringRet = toStringRet;
	}

	/**
	 * return the string representation of the state
	 * @return {@link #toStringRet}
	 */
	public String toString()
	{
		return toStringRet;
	}
}
