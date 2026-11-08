import { useState } from "react";
import "./App.css";
import rawData from "./data/data.json";
import { Word } from "./components/Word";
import { Letter } from "./components/Letter";

function App() {
  type WordData = {
    definition: string;
    answer: string;
    cells: [number, number][];
    direction: "down" | "right";
  };

  const Data = rawData as WordData[];
  return (
    <form action="" className="crossword-grid">
      {Data.map((q) => (
        <Word
          word={q.answer}
          definition={q.definition}
          cells={q.cells}
          direction={q.direction}
        />
      ))}
    </form>
  );
}

export default App;
