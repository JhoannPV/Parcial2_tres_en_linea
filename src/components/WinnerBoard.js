function Ganadores({ winners }) {
  return (
    <>
      <ul className="historial-ganador">
        {winners.map((winner) => {
          return (
            <>
              <li key={winner.id}>
                <p>
                  <strong>
                    Ganador: {winner.ganador}
                    <br />
                    el {winner.fecha}
                  </strong>
                </p>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
}

export default Ganadores;
