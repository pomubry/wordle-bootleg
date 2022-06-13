import { useContext } from "react";
import { GameContext } from "../context/GameContext";

const LetterBox = ({ letter, boxNum }) => {
  const { currentBox, isDone, getLetterStatus } = useContext(GameContext);

  let match = `evaluated ${getLetterStatus(letter)}`;

  return (
    // only add the value of `match` after evaluating the word OR if the game is done.
    <span
      className={`grid indiv-box ${(boxNum < currentBox || isDone) && match}`}
    >
      {letter}
    </span>
  );
};

export default LetterBox;
