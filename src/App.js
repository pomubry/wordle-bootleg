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

  useEffect(() => {
    error && console.error(error);
  }, [error]);

  const isWordUsed = (word) => {
    const val = Object.values(usedWords);
    const idx = val.indexOf(word);
    return currentBox > 0 ? idx : -1;
  };

  const setLetterStatus = (word) => {
    const letterArr = word.split("");

    letterArr.forEach((letter, i) => {
      if (letter === answer[i]) {
        setUsedLetters((letters) => ({
          ...letters,
          [letter]: { status: "isMatch" },
        }));
      } else if (answer.indexOf(letter) >= 0) {
        setUsedLetters((letters) => {
          // Keep the "isMatch" value if the letter already matched before
          let isAlreadyMatched = letters[letter]?.["status"] === "isMatch";

          return {
            ...letters,
            [letter]: {
              status: isAlreadyMatched ? "isMatch" : "isMisplaced",
            },
          };
        });
      } else {
        setUsedLetters((letters) => ({
          ...letters,
          [letter]: { status: "isWrong" },
        }));
      }
    });
  };

  const getLetterStatus = (letter) => {
    return usedLetters[letter]?.["status"];
  };

  const sendGuess = (word) => {
    setLetterStatus(word);

    // Game is done when `word` matches the `answer` or after 5 guesses have been made
    if (isWordUsed(word) > -1) {
      setDuplicate(word);
      return;
    }

    if (word === answer.toLowerCase() || currentBox === 5) {
      console.log("Done");
      return setIsDone(true);
    }

    // Move on to the next box for the next guess
    setCurrentBox((prevState) => prevState + 1);
    usedWords.push(word);
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

    if (key === "Enter" && word.length === 5) return sendGuess(word);

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
          <GameContext.Provider value={{ currentBox, isDone, getLetterStatus }}>
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
        <Keyboard
          handleKeyPress={handleKeyPress}
          getLetterStatus={getLetterStatus}
        />
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

// Fixed keyboard not updating color when game is done
// added [set/get]LetterStatus() to handle colors
