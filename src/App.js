import { useState, useEffect } from "react";
import { GameContext } from "./context/GameContext";
import "./App.css";
import WordBox from "./components/WordBox";
import Keyboard from "./components/Keyboard";
import useFetch from "./hooks/useFetch";
import Modal from "./components/Modal";

const wordGuessInit = {};
for (let i = 0; i < 6; i++) {
  wordGuessInit[i] = "";
}
let usedWords = [];

function App() {
  const [wordGuess, setWordGuess] = useState(wordGuessInit);
  const [currentBox, setCurrentBox] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [usedLetters, setUsedLetters] = useState({});
  const [duplicate, setDuplicate] = useState("");
  const { answer, loading, error, fetchAnswer } = useFetch();

  useEffect(() => {
    fetchAnswer();
  }, []);

  const isWordUsed = (word) => {
    const val = Object.values(usedWords);
    const idx = val.indexOf(word);
    return currentBox > 0 ? idx : -1;
  };

  const sendGuess = (word) => {
    // Game is done when `word` matches the `answer` or after 5 guesses have been made
    if (isWordUsed(word) > -1) {
      setDuplicate(word);
      return;
    }

    if (word === answer.toLowerCase() || currentBox === 5) {
      console.log("Done");
      return setIsDone(true);
    }

    if (word.length !== 5) return;

    // Move on to the next box for the next guess
    setCurrentBox((prevState) => prevState + 1);
    usedWords.push(word);

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
          let isAlreadyMatched = letters[word[i]]?.["status"] === "isMatch";

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
      usedWords = [];
      fetchAnswer();
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

    setDuplicate("");
  };

  return (
    <div className="app" onKeyDown={handleKeyPress} tabIndex={-1}>
      <h1>Wordle Bootleg</h1>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <section className="guesses-container">
          <GameContext.Provider
            value={{ currentBox, isDone, answer, setUsedLetters }}
          >
            {Object.keys(wordGuess).map((e) => {
              const num = Number(e);
              return <WordBox boxNum={num} word={wordGuess[num]} key={num} />;
            })}
          </GameContext.Provider>
        </section>
      )}

      <section className="keyboard">
        <span className={`error ${duplicate.length === 0 && "hidden"}`}>
          The word `{duplicate.toUpperCase()}` has already been used. Try
          another one!
        </span>
        <Keyboard handleKeyPress={handleKeyPress} usedLetters={usedLetters} />
      </section>

      {isDone && (
        <Modal
          isCorrect={wordGuess[currentBox] === answer}
          answer={answer}
          handleKeyPress={handleKeyPress}
        />
      )}
    </div>
  );
}

export default App;
