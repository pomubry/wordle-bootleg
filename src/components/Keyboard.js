const layout = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
const specialChars = ["Backspace", "Enter", "Restart"];

const Keyboard = ({ handleKeyPress, getLetterStatus }) => {
  return (
    <>
      {layout.map((row, idx) => (
        <div className={`grid keys keys-row-${idx + 1}`} key={row}>
          {row.split("").map((letter) => (
            <span
              className={`grid indiv-key ${getLetterStatus(letter)}`}
              key={letter}
              onClick={() => handleKeyPress({ key: letter })}
            >
              {letter}
            </span>
          ))}
          {
            <span
              className="grid indiv-key special-char"
              onClick={() => handleKeyPress({ key: specialChars[idx] })}
            >
              {idx === 0 ? (
                <i className="fa-solid fa-delete-left"></i>
              ) : idx === 1 ? (
                <i className="fa-solid fa-paper-plane"></i>
              ) : (
                <i className="fa-solid fa-rotate"></i>
              )}
            </span>
          }
        </div>
      ))}
    </>
  );
};

export default Keyboard;
