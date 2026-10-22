type LetterProps = {
  position: [number, number];
  value: String | null;
};

export const Letter = (props: LetterProps) => {
  return (
    <div className={props.value ? "letter shown" : "letter hidden"}>
      <input type="text" maxLength={1} minLength={1} />
    </div>
  );
};
