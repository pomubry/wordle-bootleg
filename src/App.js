import { useState } from "react";
import { GameContext } from "./context/GameContext";
import WordBox from "./components/WordBox";
import "./App.css";

const answer = "karin";
const wordGuessInit = {};
for (let i = 0; i < 6; i++) {
  wordGuessInit[i] = "";
}

function App() {
  const [wordGuess, setWordGuess] = useState(wordGuessInit);
  const [currentBox, setCurrentBox] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const sendGuess = (word) => {
    // Game is done when `word` matches the `answer` or after 5 guesses have been made
    if (word === answer.toLowerCase() || currentBox === 5) {
      console.log("Done");
      return setIsDone(true);
    }

    word.length === 5 && setCurrentBox((prevState) => prevState + 1);
  };

  const handleKeyPress = ({ key }) => {
    const isLetter = key.length === 1 && key.match(/[a-z]/i);
    const word = wordGuess[currentBox];

    if (key === "Enter") return sendGuess(word);

    if (key === "Backspace") {
      setWordGuess((wordGuess) => {
        let word = wordGuess[currentBox];
        return { ...wordGuess, [currentBox]: word.slice(0, word.length - 1) };
      });
    }

    // Only `setWord` if current word is < 5 letters & `key` is a letter
    if (word.length < 5 && isLetter) {
      setWordGuess((wordGuess) => {
        let word = wordGuess[currentBox];
        return { ...wordGuess, [currentBox]: word + key.toLowerCase() };
      });
    }
  };

  return (
    <div onKeyDown={handleKeyPress} tabIndex={-1}>
      <h1>Wordle Bootleg</h1>

      <GameContext.Provider value={{ currentBox, isDone, answer }}>
        {Object.keys(wordGuess).map((e) => {
          const num = Number(e);
          return <WordBox boxNum={num} word={wordGuess[num]} key={num} />;
        })}
      </GameContext.Provider>

      <button
        onClick={() => sendGuess(wordGuess[currentBox])}
        disabled={isDone ? true : false}
      >
        Send guess
      </button>
    </div>
  );
}

export default App;
