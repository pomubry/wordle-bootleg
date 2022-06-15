import { useContext } from "react";
import { useState } from "react";
import { BsArrowRepeat, BsGithub } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { GameContext } from "../context/GameContext";

const Modal = () => {
  const [isShown, setIsShown] = useState(true);
  const { wordGuess, currentBox, answer, handleKeyPress } =
    useContext(GameContext);
  const isCorrect = wordGuess[currentBox] === answer;

  return (
    <div className={`backdrop ${isShown && "modal-shown"}`}>
      <div className={`modal`}>
        <h2 className={`${isCorrect ? "modal-correct" : "modal-wrong"}`}>
          {isCorrect ? "Congratulations!" : "Too bad!"}
        </h2>
        <p>
          The correct answer is{" "}
          <span className="modal-correct">{answer.toUpperCase()}</span>!
        </p>
        <div className="modal-buttons">
          <button onClick={() => handleKeyPress({ key: "Restart" })}>
            <BsArrowRepeat /> Try Again!
          </button>
          <button onClick={() => setIsShown(false)}>
            <IoCloseSharp /> Close
          </button>
        </div>
        <div className="github-container">
          <a
            href="https://github.com/pomubry/wordle-bootleg"
            target="_blank"
            rel="noreferrer"
          >
            <BsGithub />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
