import { useState } from "react";
import "./App.css";
import Data from "./data/data.json";
import { Word } from "./components/Word";
import { Letter } from "./components/Letter";

function App() {
  return (
    <form action="" className="crossword-grid">
      {Data.map((q) => (
        <Word
          word={q.answer}
          definition={q.definition}
          cells={[
            [3, 3],
            [3, 4],
            [3, 5],
            [3, 6],
            [3, 7],
            [3, 8],
            [3, 9],
            [3, 10],
          ]}
        />
      ))}
    </form>
  );
}

export default App;
