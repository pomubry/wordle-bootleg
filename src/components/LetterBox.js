import { useContext } from "react";
import { GameContext } from "../context/GameContext";

const LetterBox = ({ letter, boxRow, index }) => {
  const { currentBox, isDone, getLetterStatus } = useContext(GameContext);

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
