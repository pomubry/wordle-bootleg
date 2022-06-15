import { useContext } from "react";
import { GameContext } from "./context/GameContext";
import WordBox from "./components/WordBox";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const { loading, handleKeyPress, isDone, duplicate } =
    useContext(GameContext);

  return (
    <div className="app" onKeyDown={handleKeyPress} tabIndex={-1}>
      <h1>Wordle Bootleg</h1>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <section className="guesses-container">
          {[0, 1, 2, 3, 4, 5].map((e) => {
            return <WordBox boxRow={e} key={e} />;
          })}
        </section>
      )}

      <section className="keyboard">
        <span className={`error ${duplicate.length === 0 && "hidden"}`}>
          The word `{duplicate.toUpperCase()}` has already been used. Try
          another one!
        </span>
        <Keyboard />
      </section>

      {isDone && <Modal />}
    </div>
  );
}

export default App;

// Fix coloring for wordbbox
