import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import LetterBox from "./LetterBox";

const WordBox = ({ boxRow }) => {
  const { wordGuess } = useContext(GameContext);
  const word = wordGuess[boxRow];
  return (
    <div className={"grid word-box"}>
      {[0, 1, 2, 3, 4].map((idx) => (
        <LetterBox letter={word[idx]} index={idx} boxRow={boxRow} key={idx} />
      ))}
    </div>
  );
};

export default WordBox;
