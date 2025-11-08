import { useState, useCallback, useEffect } from "react";

import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

import "./App.css";

import { wordsList as localWordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);

  const [words, setWords] = useState(localWordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState("medium");

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    const normalizedWord = word
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return { category, word: normalizedWord };
  }, [words]);

  const startGame = useCallback(() => {
    setGuessedLetters([]);
    setWrongLetters([]);

    const { category, word } = pickWordAndCategory();

    const wordLetters = word.split("");

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    const guessesMap = {
      easy: 10,
      medium: 7,
      hard: 5,
    };

    setGuesses(guessesMap[difficulty] ?? 7);
    setGameStage(stages[1].name);
  }, [pickWordAndCategory, difficulty]);

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  };

  useEffect(() => {
    if (guesses === 0) {
      const currentHighScore = parseInt(localStorage.getItem("highscore")) || 0;
      if (score > currentHighScore) {
        localStorage.setItem("highscore", score);
      }
      setGuessedLetters([]);
      setWrongLetters([]);
      setGameStage(stages[2].name);
    }
  }, [guesses, score]);

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    if (letters.length > 0 && guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => actualScore + 100);
      setTimeout(() => {
        startGame();
      }, 700);
    }
  }, [guessedLetters, letters, startGame]);

  return (
    <div className="App">
      {gameStage === "start" && (
        <StartScreen
          startGame={startGame}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      )}

      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}

      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
