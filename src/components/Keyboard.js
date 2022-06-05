const layout = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
const specialChars = ["Backspace", "Enter", "Restart"];

const Keyboard = ({ handleKeyPress, usedLetters }) => {
  return (
    <>
      {layout.map((row, idx) => (
        <div className="word-box" key={row}>
          {row.split("").map((letter) => (
            <div
              className={`indiv-box ${
                Object.keys(usedLetters).indexOf(letter) !== -1 &&
                usedLetters[letter]["status"]
              }`}
              key={letter}
              onClick={() => handleKeyPress({ key: letter })}
            >
              {letter}
            </div>
          ))}
          {
            <div
              className="specialChar"
              onClick={() => handleKeyPress({ key: specialChars[idx] })}
            >
              {specialChars[idx]}
            </div>
          }
        </div>
      ))}
    </>
  );
};

export default Keyboard;
