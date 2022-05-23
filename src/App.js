import { useState } from "react";
import "./App.css";
import WordBox from "./components/WordBox";

const answer = "karin";

function App() {
  const [currentBox, setCurrentBox] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const sendGuess = (word) => {
    if ((word === answer) | (currentBox === 5)) {
      console.log("Done");
      return setIsDone(true);
    }
    setCurrentBox((prevState) => prevState + 1);
  };

  return (
    <div>
      {[0, 1, 2, 3, 4, 5].map((e) => (
        <WordBox
          boxNum={e}
          currentBox={currentBox}
          sendGuess={sendGuess}
          answer={answer}
          isDone={isDone}
          key={e}
        />
      ))}
      <button onClick={sendGuess} disabled={isDone ? true : false}>
        Send guess
      </button>
    </div>
  );
}

export default App;
