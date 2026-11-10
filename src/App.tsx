import { useState, type MouseEventHandler } from "react";
import "./App.css";
import rawData from "./data/data.json";
import { useRef } from "react";
import { Word } from "./components/Word";
import { Letter } from "./components/Letter";

function App() {
  type WordData = {
    definition: string;
    answer: string;
    cells: [number, number][];
    direction: "down" | "right";
  };
  type PreviousLetter = {
    position: [number, number];
    direction: "right" | "down";
  };

  const Data = rawData as WordData[];
  const renderedPositions = new Set<string>();

  const previousLetter = useRef<PreviousLetter | null>(null);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  for (const q of Data) {
    for (const position of q.cells) {
      renderedPositions.add(`${position[0]}-${position[1]}`);
    }
  }
  const renderedCells = new Map<
    string,
    {
      position: [number, number];
      value: string;
      direction: "right" | "down";
    }
  >();

  for (const q of Data) {
    q.cells.forEach((position, i) => {
      const key = `${position[0]}-${position[1]}`;

      if (!renderedCells.has(key)) {
        renderedCells.set(key, {
          position,
          value: q.answer[i],
          direction: q.direction,
        });
      }
    });
  }

  const correctCount = [...renderedCells.values()].filter((cell) => {
    const key = `${cell.position[0]}-${cell.position[1]}`;
    return (answers[key] ?? "").toUpperCase() === cell.value.toUpperCase();
  }).length;
  const total = renderedCells.size;
  const percent = total === 0 ? 0 : Math.round((correctCount / total) * 100);

  return (
    <div className="main-container">
      <form action="" className="crossword-grid">
        {Data.map((q) => (
          <Word
            key={q.definition}
            word={q.answer}
            definition={q.definition}
            cells={q.cells}
            direction={q.direction}
            uniquePositions={renderedPositions}
          />
        ))}
        {[...renderedCells.values()].map((cell) => (
          <Letter
            key={`${cell.position[0]}-${cell.position[1]}`}
            position={cell.position}
            value={cell.value}
            direction={cell.direction}
            previousLetter={previousLetter}
            inputValue={
              answers[`${cell.position[0]}-${cell.position[1]}`] ?? ""
            }
            checked={checked}
            onValueChange={(value) =>
              setAnswers((prev) => ({
                ...prev,
                [`${cell.position[0]}-${cell.position[1]}`]:
                  value.toUpperCase(),
              }))
            }
          />
        ))}
      </form>
      <button onClick={() => setChecked(true)}>Zakończ</button>
      {!checked && <p className="actual-definition"></p>}
      {checked && (
        <p>
          Wynik: {correctCount} / {total} ({percent}%)
        </p>
      )}
    </div>
  );
}

export default App;
