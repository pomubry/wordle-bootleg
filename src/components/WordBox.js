import { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";
import LetterBox from "./LetterBox";
import Keyboard from "../components/Keyboard";
import { useRef } from "react";
import { useEffect } from "react";

const WordBox = ({ boxRow }) => {
  const {
    currentBox,
    sendGuess,
    setDuplicate,
    restartGame,
    isDone,
    resetMethods,
  } = useContext(GameContext);
  const [wordLocal, setWord] = useState("");
  const divListener = useRef(null);

  // Set a reference to setWord in the global state.
  // To be used when game is reset.
  useEffect(() => {
    resetMethods.current = [...resetMethods.current, setWord];
    // eslint-disable-next-line
  }, []);

  // Focus on the divListener after succesfully submitting an answer
  // to allow continous keyboard input
  useEffect(() => {
    divListener.current?.focus();
  }, [currentBox]);

  const handleKeyPress = ({ key }) => {
    if (key === "Restart") {
      return restartGame();
    }

    if (isDone) return;

    const isLetter = key.length === 1 && key.match(/[a-z]/i);

    if (key === "Enter" && wordLocal.length === 5) {
      return sendGuess(wordLocal);
    }

    if (key === "Backspace") {
      setWord((word) => word.slice(0, word.length - 1));
    }

    // Only `setWord` if current word is < 5 letters & `key` is a letter
    if (wordLocal.length < 5 && isLetter) {
      setWord((word) => word + key.toLowerCase());
    }
    setDuplicate("");
  };

  const inputHandlers = (
    <>
      <Keyboard handleKeyPress={handleKeyPress} />
      <div
        className={`div-listener testClass${boxRow}`}
        onKeyDown={handleKeyPress}
        tabIndex={-1}
        ref={divListener}
      />
    </>
  );

  return (
    <>
      <div className={"grid word-box"}>
        {[0, 1, 2, 3, 4].map((idx) => (
          <LetterBox
            letter={wordLocal[idx]}
            index={idx}
            boxRow={boxRow}
            key={idx}
          />
        ))}
      </div>
      {boxRow === currentBox ? inputHandlers : false}
    </>
  );
};

export default WordBox;
