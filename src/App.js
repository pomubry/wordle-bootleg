import { useContext } from "react";
import { GameContext } from "./context/GameContext";
import WordBox from "./components/WordBox";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const { loading, isDone } = useContext(GameContext);

  return (
    <div className="app">
      <h1>Wordle Bootleg</h1>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          {[0, 1, 2, 3, 4, 5].map((e) => {
            return <WordBox boxRow={e} key={e} />;
          })}
        </>
      )}

      {isDone && <Modal />}
    </div>
  );
}

export default App;

// Fix coloring for wordbbox
