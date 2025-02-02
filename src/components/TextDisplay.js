import "../css/TextDisplay.css";

const TextDisplay = ({ targetText, position, isError, scrollOffset, currentRef }) => {
    // Если текущий символ — пробел или позиция вне диапазона, используем неразрывный пробел
    const currentChar = targetText[position] === " " || position >= targetText.length ? "\u00A0" : targetText[position];

    return (
        <div className="text-wrapper">
            <div
                className="text"
                style={{ transform: `translateY(-${scrollOffset}px)` }}
            >
                <span className="text-correct">{targetText.slice(0, position)}</span>
                <span className={`text-current ${isError ? "text-error" : ""}`} ref={currentRef}>
                    {currentChar}
                    <span className="text-cursor"></span>
                </span>
                <span className="text-remaining">{targetText.slice(position + 1)}</span>
            </div>
        </div>
    );
};

export default TextDisplay;
