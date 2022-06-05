import { useState } from "react";
import { GameContext } from "./context/GameContext";
import "./App.css";
import WordBox from "./components/WordBox";
import Keyboard from "./components/Keyboard";

const answer = "karin";
const wordGuessInit = {};
for (let i = 0; i < 6; i++) {
  wordGuessInit[i] = "";
}

function App() {
  const [wordGuess, setWordGuess] = useState(wordGuessInit);
  const [currentBox, setCurrentBox] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [usedLetters, setUsedLetters] = useState({});

  const sendGuess = (word) => {
    // Game is done when `word` matches the `answer` or after 5 guesses have been made
    if (word === answer.toLowerCase() || currentBox === 5) {
      console.log("Done");
      return setIsDone(true);
    }

    //  *** TO FIX KEYBOARD HIGHLIGHT WHEN `WORD` IS SUBMITTED EVEN WHEN `WORD` IS <5 LETTERS ***
    // Move on to the next box for the next guess
    word.length === 5 && setCurrentBox((prevState) => prevState + 1);

    // Evaluate each letter if it is matched, misplaced, or wrong
    for (let i = 0; i < 5; i++) {
      if (word[i] === answer[i]) {
        // `word[i]` is a letter
        setUsedLetters((letters) => ({
          ...letters,
          [word[i]]: { status: "isMatch" },
        }));
      } else if (answer.indexOf(word[i]) >= 0) {
        setUsedLetters((letters) => {
          // Keep the "isMatch" value if the letter already matched before
          let isAlreadyMatched =
            letters[word[i]] && letters[word[i]]["status"] === "isMatch";

          return {
            ...letters,
            [word[i]]: {
              status: isAlreadyMatched ? "isMatch" : "isMisplaced",
            },
          };
        });
      } else {
        setUsedLetters((letters) => ({
          ...letters,
          [word[i]]: { status: "isWrong" },
        }));
      }
    }
  };

  const handleKeyPress = ({ key }) => {
    if (key === "Restart") {
      setWordGuess(wordGuessInit);
      setCurrentBox(0);
      setIsDone(false);
      setUsedLetters({});
    }

    if (isDone) return;

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
    <div className="app" onKeyDown={handleKeyPress} tabIndex={-1}>
      <h1>Wordle Bootleg</h1>

      <div className="guesses-container">
        <GameContext.Provider
          value={{ currentBox, isDone, answer, setUsedLetters }}
        >
          {Object.keys(wordGuess).map((e) => {
            const num = Number(e);
            return <WordBox boxNum={num} word={wordGuess[num]} key={num} />;
          })}
        </GameContext.Provider>
      </div>

      <div className="keyboard">
        <Keyboard handleKeyPress={handleKeyPress} usedLetters={usedLetters} />
      </div>
    </div>
  );
}

export default App;
