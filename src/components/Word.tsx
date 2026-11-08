import { Letter } from "./Letter";

type WordProps = {
  word: string;
  // length: number;
  direction: "right" | "down";
  definition: string;
  // beginning: [number, number];
  cells: Array<[number, number]>;
};

export const Word = (props: WordProps) => {
  const mapped = Array.from(props.word);
  console.log(props.cells[0][0], props.cells[0][1]);
  return (
    <ul className="word">
      <li
        style={{
          gridArea: `${props.direction === "right" ? props.cells[0][0] : props.cells[0][0] - 1} / ${props.direction === "right" ? props.cells[0][1] - 1 : props.cells[0][1]}`,
        }}
        className="definition-field"
      >
        {props.definition}
      </li>
      {props.cells.map((letter, i) => {
        return (
          <Letter
            position={letter}
            value={mapped[i]}
            direction={props.direction}
          />
        );
      })}
    </ul>
  );
};
