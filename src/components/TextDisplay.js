import "../css/TextDisplay.css";

const TextDisplay = ({ targetText, position, isError, scrollOffset, currentRef }) => {
  // Разбиваем текст на слова, включая пробелы после них (если они есть)
  const words = targetText.match(/(\S+\s*)/g) || [];
  let globalIndex = 0; // для отслеживания глобальной позиции символа

  return (
    <div className="text-wrapper">
      <div className="text" style={{ transform: `translateY(-${scrollOffset}px)` }}>
        {words.map((word, wordIndex) => (
          <div className="text-word" key={wordIndex}>
            {Array.from(word).map((char, charIndex) => {
              const currentLetterIndex = globalIndex;
              globalIndex++;

              let className = "";
              let spanProps = {};

              if (currentLetterIndex < position) {
                className = "text-correct";
              } else if (currentLetterIndex === position) {
                className = `text-current ${isError ? "text-error" : ""}`;
                spanProps.ref = currentRef;
              } else {
                className = "text-remaining";
              }

              return (
                <span className={className} key={charIndex} {...spanProps}>
                  {char === " " ? "\u00A0" : char}
                  {currentLetterIndex === position && (
                    <span className="text-cursor"></span>
                  )}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextDisplay;
