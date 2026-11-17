import { useState, type MouseEventHandler } from "react";
import "./App.css";
import rawData from "./data/data.json";
import { useRef } from "react";
import { Word } from "./components/Word";
import { Letter } from "./components/Letter";

function App() {
  type WordData = {
    // typ wartości do słów, które pobierzemy z data.json
    definition: string;
    answer: string;
    cells: [number, number][]; // tablica tablic [number, number]
    direction: "down" | "right";
  };
  type PreviousLetter = {
    // propsy do poprzedniej litery
    position: [number, number];
    direction: "right" | "down";
  };

  const Data = rawData as WordData[]; // ustawienie typu wartosci danych z json
  const renderedPositions = new Set<string>(); // set elementów string, służący do zapisywania pozycji wyrenderowanych już liter w celu uniknięcia renderowania dwóch inputów na przecięciach słów

  const previousLetter = useRef<PreviousLetter | null>(null); // useRef służące do tworzenia globalnej referencji do poprzedniej litery

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false); // zmienna do definiowania czy gra została zakończona

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
  >(); // tutaj definiujemy Map z kluczem w postaci string (to będą koordynaty litery), obiekt z istotnymi właściwościami litery

  for (const q of Data) {
    q.cells.forEach((position, i) => {
      const key = `${position[0]}-${position[1]}`;

      if (!renderedCells.has(key)) {
        // i tera dla każdje litery jeśli nie ma jeszcze klucza z daną pozycją w mapie
        renderedCells.set(key, {
          // to na tym kluczu ustawiamy, obiekt z informacjami o tej literze
          position,
          value: q.answer[i],
          direction: q.direction,
        });
      }
    });
  }

  const correctCount = [...renderedCells.values()].filter((cell) => {
    // później filtrujemy ile wyrenderowanych inputów ma wprowadzoną prawidłową literę do zmiennej
    const key = `${cell.position[0]}-${cell.position[1]}`;
    return (answers[key] ?? "").toUpperCase() === cell.value.toUpperCase();
  }).length;
  const total = renderedCells.size; // bierzemy ilość poprawnych wprowadzonych liter
  const percent = total === 0 ? 0 : Math.round((correctCount / total) * 100); // i jeszcze liczymy wynik procentowy

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
            uniquePositions={renderedPositions} // tutaj ustawiamy uniquepositons na pozycje wyrenederowane
          /> // zwracamy zmapowane komponenty słów
        ))}
        {[...renderedCells.values()].map(
          (
            cell, // tutaj mapujemy unikatowe wyrenderowane litery
          ) => (
            <Letter // i komponenty liter
              key={`${cell.position[0]}-${cell.position[1]}`}
              position={cell.position}
              value={cell.value}
              direction={cell.direction}
              previousLetter={previousLetter}
              inputValue={
                answers[`${cell.position[0]}-${cell.position[1]}`] ?? "" // wartość podana przez użytkownika
              }
              checked={checked}
              onValueChange={(value) =>
                setAnswers((prev) => ({
                  // przypisujemy litery wpisane przez użytkownika jako rekord, gdzie ID to koordynaty pola, a wartość, to podana przez użytkownika litera
                  ...prev,
                  [`${cell.position[0]}-${cell.position[1]}`]:
                    value.toUpperCase(),
                }))
              }
            />
          ),
        )}
      </form>
      <button onClick={() => setChecked(true)}>Zakończ</button>
      {
        !checked && (
          <p className="actual-definition"></p>
        ) /* tutaj pojawiają sie definicje słów */
      }
      {
        checked && (
          <p>
            Wynik: {correctCount} / {total} ({percent}%)
          </p>
        ) /* a tutaj jeśli, krzyżówka się zakończyła, to wyświetlamy wynik. Wartość zmiennej checked na true zmienia button powyżej */
      }
    </div>
  );
}

export default App;
