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
    if (e.key === "ArrowUp") {
      const inp = document.querySelector<HTMLInputElement>(
        `.position-${props.position[0] - 1}-${props.position[1]}`,
      );
      inp?.focus();
      return;
    }
    if (e.key === "ArrowDown") {
      const inp = document.querySelector<HTMLInputElement>(
        `.position-${props.position[0] + 1}-${props.position[1]}`,
      );
      inp?.focus();
      return;
    }
    if (e.key === "ArrowRight") {
      const inp = document.querySelector<HTMLInputElement>(
        `.position-${props.position[0]}-${props.position[1] + 1}`,
      );
      inp?.focus();
      return;
    }
    if (e.key === "ArrowLeft") {
      const inp = document.querySelector<HTMLInputElement>(
        `.position-${props.position[0]}-${props.position[1] - 1}`,
      );
      inp?.focus();
      return;
    }

    if (e.key === "Backspace") props.onValueChange("");

    if (e.key.length !== 1) {
      console.log(e.key);
      return;
    }

    e.preventDefault();

    props.onValueChange(e.key.toUpperCase());

    const [row, col] = props.position;
    const previous = props.previousLetter.current;

    const continuingDown =
      previous?.direction === "down" &&
      previous.position[0] + 1 === row &&
      previous.position[1] === col;

    const direction = continuingDown ? "down" : props.direction;

    props.previousLetter.current = {
      position: props.position,
      direction,
    };

    const nextPosition =
      direction === "right" ? `${row}-${col + 1}` : `${row + 1}-${col}`;

    document
      .querySelector<HTMLInputElement>(`input[data-position="${nextPosition}"]`)
      ?.focus();
  };

  return (
    <li
      className={`letter ${props.checked ? (correct ? "correct" : "incorrect") : ""}`}
      style={{ gridArea: `${props.position[0]} / ${props.position[1]}` }}
    >
      <input
        disabled={props.checked ? true : false}
        className={`position-${props.position[0]}-${props.position[1]}`}
        data-position={`${props.position[0]}-${props.position[1]}`}
        type="text"
        maxLength={1}
        onKeyDown={goToNextLetter}
        value={props.inputValue}
        onChange={(e) => props.onValueChange(e.currentTarget.value)}
      />
    </li>
  );
};
