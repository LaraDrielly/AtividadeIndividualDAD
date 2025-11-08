import "./StartScreen.css";

const StartScreen = ({ startGame, difficulty, setDifficulty }) => {
  return (
    <div className="start">
      <h1>Jogo da Forca</h1>
      <h3>Selecione a dificuldade:</h3>
      <select
        onChange={(e) => setDifficulty(e.target.value)}
        value={difficulty}
        className="difficulty"
      >
        <option value="easy">Fácil</option>
        <option value="medium">Médio</option>
        <option value="hard">Difícil</option>
      </select>

      <button onClick={startGame}>Começar o jogo</button>
    </div>
  );
};

export default StartScreen;
