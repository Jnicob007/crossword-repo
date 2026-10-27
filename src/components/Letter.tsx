type LetterProps = {
  position: [number, number];
  value: String | null;
};

export const Letter = (props: LetterProps) => {
  return (
    <li
      className={props.value ? "letter shown" : "letter hidden"}
      style={{ gridArea: `${props.position[0]} / ${props.position[1]}` }}
    >
      <input type="text" maxLength={1} minLength={1} />
    </li>
  );
};
