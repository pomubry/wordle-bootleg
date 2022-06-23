import { useContext } from "react";
import { GameContext } from "../context/GameContext";

const LetterBox = ({ letter, boxRow, index }) => {
  const { currentBox, isDone, answer } = useContext(GameContext);

  const getLetterStatus = (letter, index) =>
    answer[index] === letter
      ? "isMatch"
      : answer.indexOf(letter) > -1
      ? "isMisplaced"
      : "isWrong";

  let match = `evaluated ${getLetterStatus(letter, index)}`;

  return (
    // only add the value of `match` after evaluating the word OR if the game is done.
    <span
      className={`grid indiv-box ${(boxRow < currentBox || isDone) && match}`}
    >
      {letter}
    </span>
  );
};

export default LetterBox;
