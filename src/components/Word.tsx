import { Letter } from "./Letter";

type WordProps = {
  // propsy do komponentu Word
  word: string;
  direction: "right" | "down";
  definition: string;
  cells: Array<[number, number]>; // Array arrayów [number, number], czyli array koordynatów liter w słowie
  uniquePositions: Set<string>; // unikalne pozycje liter w formie Set ze stringami koordynatów
};

export const Word = (props: WordProps) => {
  const mapped = Array.from(props.word);
  console.log(props.cells[0][0], props.cells[0][1]);

  const focusFirstLetter = () => {
    // tutaj ustawiamy focus na pierwszą literę w naszym słowie
    document
      .querySelector<HTMLInputElement>(
        `.position-${props.cells[0][0]}-${props.cells[0][1]}`,
      )
      ?.focus();
    const p = document.querySelector(".actual-definition"); // bierzemy paragraf do definicji
    console.log(p);
    if (p instanceof HTMLParagraphElement) {
      // jeśli w zmiennej p jest element paragrafu
      console.log(p, props.definition);
      p.textContent = props.definition; // to wpisujemy do niego definicje
    }
  };
  return (
    // zwracamy komponent Word
    <ul className="word">
      <li
        style={{
          // tutaj ustawianie stylu naszego elementu do grida, generalnie to stylowanie sprawia, że definicja naszego słowa ustawia się w prawidłowym miejscu w gridzie w sposób dynamiczny
          gridArea: `${props.direction === "right" ? props.cells[0][0] : props.cells[0][0] - 1} / ${props.direction === "right" ? props.cells[0][1] - 1 : props.cells[0][1]}`,
        }}
        className="definition-field"
        onClick={focusFirstLetter} // kliknięcie w definicje powoduje sfocusowanie pierwszej litery słowa
      >
        {props.definition}
      </li>
    </ul>
  );
};
