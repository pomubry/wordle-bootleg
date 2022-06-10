import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import LetterBox from "./LetterBox";

const WordBox = ({ boxNum, word }) => {
  const { answer } = useContext(GameContext);

  return (
    <div className={"grid word-box"}>
      {answer.split("").map((ans, idx) => (
        <LetterBox letter={word[idx]} ans={ans} boxNum={boxNum} key={idx} />
      ))}
    </div>
  );
};

export default WordBox;
