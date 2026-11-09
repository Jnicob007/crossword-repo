import { Letter } from "./Letter";

type WordProps = {
  word: string;
  direction: "right" | "down";
  definition: string;
  cells: Array<[number, number]>;
  uniquePositions: Set<string>;
};

export const Word = (props: WordProps) => {
  const mapped = Array.from(props.word);
  console.log(props.cells[0][0], props.cells[0][1]);

  const focusFirstLetter = () => {
    document
      .querySelector<HTMLInputElement>(
        `.position-${props.cells[0][0]}-${props.cells[0][1]}`,
      )
      ?.focus();
    const p = document.querySelector(".actual-definition");
    console.log(p);
    if (p instanceof HTMLParagraphElement) {
      console.log(p, props.definition);
      p.textContent = props.definition;
    }
  };
  return (
    <ul className="word">
      <li
        style={{
          gridArea: `${props.direction === "right" ? props.cells[0][0] : props.cells[0][0] - 1} / ${props.direction === "right" ? props.cells[0][1] - 1 : props.cells[0][1]}`,
        }}
        className="definition-field"
        onClick={focusFirstLetter}
      >
        {props.definition}
      </li>

      {/* {props.cells.map((position, i) => {
        const key = `${position[0]}-${position[1]}`;

        // if (props.renderedPositions.has(key)) {
        //   return null;
        // }

        // props.renderedPositions.add(key);

        return (
          <Letter
            key={key}
            position={position}
            value={mapped[i]}
            direction={props.direction}
          />
        );
      })} */}
    </ul>
  );
};
