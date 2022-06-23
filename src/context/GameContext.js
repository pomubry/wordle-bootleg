import { useRef } from "react";
import { createContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

export const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [currentBox, setCurrentBox] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [usedLetters, setUsedLetters] = useState({});
  const [duplicate, setDuplicate] = useState("");
  const { answer, generateNewAnswer, loading, error, fetchAnswer } = useFetch();
  const usedWords = useRef([]);
  const resetMethods = useRef([]);

  useEffect(() => {
    fetchAnswer();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    error && console.error(error);
  }, [error]);

  const isWordUsed = (word) => {
    const idx = usedWords.current.indexOf(word);
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

  const getKeyboardStatus = (letter) => {
    return usedLetters[letter]?.["status"];
  };

  const getLetterStatus = (letter, index) => {
    return answer[index] === letter
      ? "isMatch"
      : answer.indexOf(letter) > -1
      ? "isMisplaced"
      : "isWrong";
  };

  const sendGuess = (word) => {
    if (isWordUsed(word) > -1) {
      return setDuplicate(word);
    }

    setLetterStatus(word);
    usedWords.current.push(word);

    if (word === answer.toLowerCase() || currentBox === 5) {
      // Game is done when `word` matches the `answer` or after 5 guesses have been made
      return setIsDone(true);
    } else {
      // Move on to the next box for the next guess
      setCurrentBox((prevState) => prevState + 1);
    }
  };

  const restartGame = () => {
    setCurrentBox(0);
    setIsDone(false);
    setUsedLetters({});
    usedWords.current = [];
    generateNewAnswer();
    console.log(resetMethods.current.length);

    // `resetMethods` contains methods for each <WordBox/> state.
    // Use these methods to reset it to empty string.
    resetMethods.current.forEach((setState) => setState(""));
  };

  return (
    <GameContext.Provider
      value={{
        isDone,
        answer,
        currentBox,
        duplicate,
        loading,
        usedWords,
        getKeyboardStatus,
        getLetterStatus,
        setDuplicate,
        sendGuess,
        restartGame,
        resetMethods,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
