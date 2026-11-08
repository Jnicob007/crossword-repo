type LetterProps = {
  position: [number, number];
  value: String | null;
  direction: "right" | "down";
};

export const Letter = (props: LetterProps) => {
  const goToNextLetter = () => {
    if (props.direction === "right") {
      const element = document.getElementsByClassName(
        `${props.position[0]}-${props.position[1] + 1}`,
      );

      document
        .querySelector<HTMLInputElement>(
          `.position-${props.position[0]}-${props.position[1] + 1}`,
        )
        ?.focus();
      console.log(props.direction, element);
    }
  };

  if (
    !document.querySelector<HTMLInputElement>(
      `.position-${props.position[0]}-${props.position[1]}`,
    )
  ) {
    return (
      <li
        className={props.value ? "letter shown" : "letter hidden"}
        style={{ gridArea: `${props.position[0]} / ${props.position[1]}` }}
      >
        <input
          className={`position-${props.position[0]}-${props.position[1]}`}
          type="text"
          maxLength={1}
          minLength={1}
          onChange={goToNextLetter}
          name=""
        />
      </li>
    );
  } else {
    return;
  }
};
