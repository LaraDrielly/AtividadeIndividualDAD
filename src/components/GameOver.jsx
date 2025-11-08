import "./GameOver.css";

const GameOver = ({ retry, score }) => {
  const highscore = localStorage.getItem("highscore") || 0;

  return (
    <div className="gameOver">
      <h1>Fim de jogo!</h1>
      <h2>
        A sua pontuação foi: <span>{score}</span>
      </h2>
      <p>Maior pontuação: {highscore}</p>
      <button onClick={retry}>Jogar novamente</button>
    </div>
  );
};

export default GameOver;
