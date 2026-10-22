import { Letter } from "./Letter";

type WordProps = {
  word: string;
  //length: number;
  //direction: "right" | "down";
  definition: string;
  //beginning: [number, number];
  cells: [[number, number]];
};

export const Word = (props: WordProps) => {
  const mapped = Array.from(props.word);
  return (
    <ul className="word">
      {props.cells.map((letter, i) => {
        return <Letter position={letter} value={mapped[i]} />;
      })}
    </ul>
  );
};
