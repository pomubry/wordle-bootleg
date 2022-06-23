import { useRef } from "react";
import { createContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

export const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [currentBox, setCurrentBox] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [usedLetters, setUsedLetters] = useState({});
  const [duplicate, setDuplicate] = useState("");
  const { answer, setAnswer, answerList, loading, error } = useFetch();
  const usedWords = useRef([]);
  const resetMethods = useRef([]);

  useEffect(() => {
    error && console.error(error);
  }, [error]);

  // set a status if a letter is a match, misplaced, or wrong
  // the state is an object with the `letter` as key, and `status` as value
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

  const sendGuess = (word) => {
    // Check if the word has been used.
    // Also check if `usedWords.current` is not empty as it will always return `-1`
    const idx = usedWords.current.indexOf(word);
    if (idx > -1 && usedWords.current.length > 0) {
      return setDuplicate(word);
    }

    // Check if the word is a possible answer; return if not
    // if (answerList.indexOf(word) === -1) return;
    // commented code above because the list of words is too small and too limiting for the player

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

    // generate new answer.
    let idx = Math.floor(Math.random() * answerList.length);
    let word = answerList[idx];
    setAnswer(word);

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
        setDuplicate,
        usedLetters,
        loading,
        usedWords,
        resetMethods,
        sendGuess,
        restartGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
