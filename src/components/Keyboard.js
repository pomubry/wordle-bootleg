import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { FiDelete, FiSend } from "react-icons/fi";
import { BsArrowRepeat } from "react-icons/bs";

const layout = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
const specialChars = ["Backspace", "Enter", "Restart"];

const Keyboard = ({ handleKeyPress }) => {
  const { usedLetters } = useContext(GameContext);

  return (
    <section className="keyboard">
      {layout.map((row, idx) => (
        <div className={`grid keys keys-row-${idx + 1}`} key={row}>
          {row.split("").map((letter) => (
            <button
              className={`grid indiv-key ${usedLetters[letter]?.["status"]}`}
              key={letter}
              onClick={() => handleKeyPress({ key: letter })}
            >
              {letter}
            </button>
          ))}
          {
            <button
              className="grid indiv-key"
              onClick={() => handleKeyPress({ key: specialChars[idx] })}
            >
              {idx === 0 ? (
                <FiDelete />
              ) : idx === 1 ? (
                <FiSend />
              ) : (
                <BsArrowRepeat />
              )}
            </button>
          }
        </div>
      ))}
    </section>
  );
};

export default Keyboard;
