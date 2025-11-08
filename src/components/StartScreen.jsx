import "./StartScreen.css";

const StartScreen = ({ startGame }) => {
    // dentro do componente StartScreen
<select onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
  <option value="easy">Fácil</option>
  <option value="medium">Médio</option>
  <option value="hard">Difícil</option>
</select>

  return (
    <div className="start">
      <h1>Secret Word 🤫</h1>
      <p>Clique no botão abaixo para começar a jogar 👇</p>
      <button onClick={startGame}>Começar jogo</button>
    </div>
  );
};

export default StartScreen;
