import { useState, useEffect, useRef } from "react";
import IndivBox from "./LetterBox";

const WordBox = ({ boxNum, currentBox, sendGuess, answer, isDone }) => {
  const [word, setWord] = useState("");
  const ref = useRef(null);

  const keyDown = (key) => {
    if (key.key === "Enter") sendGuess(word);
    if ((key.key === "Shift") | (key.key === "Alt")) return;
    if (key.key === "Backspace") {
      setWord((prevState) => prevState.slice(0, prevState.length - 1));
    } else {
      if (word.length >= 5) return;
      setWord((prevState) => prevState + key.key.toLowerCase());
    }
  };

  useEffect(() => {
    console.log(word);
    if (boxNum === currentBox) ref.current.focus();
  }, [word, boxNum, currentBox]);

  return (
    <div
      className={`word-box ${
        boxNum === currentBox ? "isCurrent" : "isDisabled"
      }`}
      onKeyDown={keyDown}
      tabIndex={-1}
      ref={ref}
    >
      {answer.split("").map((ans, idx) => (
        <IndivBox
          letter={word[idx]}
          answer={answer}
          ans={ans}
          boxNum={boxNum}
          currentBox={currentBox}
          isDone={isDone}
          key={idx}
        />
      ))}
    </div>
  );
};

export default WordBox;
