import { useState } from "react";

const Modal = ({ isCorrect, answer, handleKeyPress }) => {
  const [isShown, setIsShown] = useState(true);

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
            Try Again!
          </button>
          <button onClick={() => setIsShown(false)}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
