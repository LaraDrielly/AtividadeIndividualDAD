import { useState, useRef } from "react";
import "./Game.css";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const Game = ({
  verifyLetter,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!letter) return;
    verifyLetter(letter);
    setLetter("");
    letterInputRef.current.focus();
  };

  const handleClickLetter = (l) => {
    verifyLetter(l);
  };

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação:</span> {score}
      </p>

      <h1>Advinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>

      <div className="wordContainer">
        {letters.map((ltr, i) =>
          guessedLetters.includes(ltr) ? (
            <span className="letter" key={i}>
              {ltr}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>

      <div className="letterContainer">
        <p>Tente adivinhar uma letra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength="1"
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
            required
          />
          <button type="submit">Jogar!</button>
        </form>
      </div>

      <div className="wrongLettersContainer">
        <p>Letras erradas:</p>
        <div className="wrongLetters">
          {wrongLetters.map((l, i) => (
            <span key={i}>{l}{i < wrongLetters.length - 1 ? ", " : ""}</span>
          ))}
        </div>
      </div>

      <div className="lettersContainer" aria-hidden={false}>
        {alphabet.map((l) => (
          <button
            key={l}
            onClick={() => handleClickLetter(l)}
            disabled={guessedLetters.includes(l) || wrongLetters.includes(l)}
            className={
              guessedLetters.includes(l)
                ? "correct"
                : wrongLetters.includes(l)
                ? "wrong"
                : ""
            }
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Game;
