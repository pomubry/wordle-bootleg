import { useContext } from "react";
import { GameContext } from "../context/GameContext";

const LetterBox = ({ letter, ans, boxNum }) => {
  const { currentBox, answer, isDone } = useContext(GameContext);
  let match = "evaluated ";
  letter === ans
    ? (match += "isMatch")
    : answer.indexOf(letter) >= 0
    ? (match += "isMisplaced")
    : (match += "isWrong");

  return (
    // only add the value of `match` after evaluating the word or if the game is done.
    <div className={`indiv-box ${(boxNum < currentBox || isDone) && match}`}>
      {letter}
    </div>
  );
};

export default LetterBox;
