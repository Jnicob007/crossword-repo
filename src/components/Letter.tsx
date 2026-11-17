import { type KeyboardEvent } from "react";

type LetterProps = {
  position: [number, number];
  value: String | null;
  direction: "right" | "down";
  previousLetter: React.MutableRefObject<{
    position: [number, number];
    direction: "right" | "down";
  } | null>;
  inputValue: string;
  checked: boolean;
  onValueChange: (value: string) => void;
};

export const Letter = (props: LetterProps) => {
  const correct = props.value?.toUpperCase() === props.inputValue.toUpperCase();

  const goToNextLetter = (e: KeyboardEvent<HTMLInputElement>) => {
    // ogólna funkcja do przechodzenia między polami
    if (e.key === "ArrowUp") {
      // jeśli strzałka w góre wciśnięta, to przechodzi nam do pola o 1 w górę
      const inp = document.querySelector<HTMLInputElement>(
        `.position-${props.position[0] - 1}-${props.position[1]}`,
      );
      inp?.focus();
      return;
    }
    if (e.key === "ArrowDown") {
      // jeśli strzałka w dół wciśnięta, to przechodzi nam do pola o 1 w dół
      const inp = document.querySelector<HTMLInputElement>(
        `.position-${props.position[0] + 1}-${props.position[1]}`,
      );
      inp?.focus();
      return;
    }
    if (e.key === "ArrowRight") {
      // jeśli strzałka w prawo wciśnięta, to przechodzi nam do pola o 1 w prawo
      const inp = document.querySelector<HTMLInputElement>(
        `.position-${props.position[0]}-${props.position[1] + 1}`,
      );
      inp?.focus();
      return;
    }
    if (e.key === "ArrowLeft") {
      // jeśli strzałka w lewo wciśnięta, to przechodzi nam do pola o 1 w lewo
      const inp = document.querySelector<HTMLInputElement>(
        `.position-${props.position[0]}-${props.position[1] - 1}`,
      );
      inp?.focus();
      return;
    }

    if (e.key === "Backspace") props.onValueChange(""); // jak wcisniemy backspace to wymazuje nam znak z sfocusowanego inputa

    if (e.key.length !== 1) {
      // ostatni if, który uwzględnia walidację innym klawiszy niż litery
      console.log(e.key);
      return;
    }

    e.preventDefault();

    props.onValueChange(e.key.toUpperCase()); // ustawiamy na literę wielką wartość propsa od przechowywania litery

    const [row, col] = props.position;
    const previous = props.previousLetter.current; // za pomocą referencji przechwytujemy poprzedni input

    const continuingDown = // tutaj zmienna, która sprawdza, czy poprzedni element miał kierunek w dół i czy element o 1 w dół od niego to nasz aktualny element
      previous?.direction === "down" &&
      previous.position[0] + 1 === row &&
      previous.position[1] === col;

    const direction = continuingDown ? "down" : props.direction; // ustawiamy aktualny kierunek w zależności od zmiennej continuingDown

    props.previousLetter.current = {
      // ustawiamy poprzedni znak na aktualne koordynaty inputa i jego kierunek
      position: props.position,
      direction,
    };

    const nextPosition =
      direction === "right" ? `${row}-${col + 1}` : `${row + 1}-${col}`; // następnie w zależnośći od aktualnego kierunku wybieramy koordynaty następnego inputa

    document
      .querySelector<HTMLInputElement>(`input[data-position="${nextPosition}"]`)
      ?.focus(); // i na końcu go focusujemy
  };

  return (
    <li
      className={`letter ${props.checked ? (correct ? "correct" : "incorrect") : ""}`}
      style={{ gridArea: `${props.position[0]} / ${props.position[1]}` }} // tutaj ustawienie gridu
    >
      <input
        disabled={props.checked ? true : false} // chcemy wyłączyć input po zakończeniu gry
        className={`position-${props.position[0]}-${props.position[1]}`}
        data-position={`${props.position[0]}-${props.position[1]}`} // data-position to props inputa który wykorzystujemy do jego unikalnego zidentyfikowania podczas wyszukiwania
        type="text"
        maxLength={1}
        onKeyDown={goToNextLetter}
        value={props.inputValue}
        onChange={(e) => props.onValueChange(e.currentTarget.value)}
      />
    </li> // zwracamy element listy z inputem w środku
  );
};
