import "../css/TextDisplay.css";

const TextDisplay = ({ targetText, position, isError }) => {
    const currentChar = targetText[position] === " " || position >= targetText.length ? "\u00A0" : targetText[position];

    return (
        <div className="text-display">
            <span className="text-correct">{targetText.slice(0, position)}</span>
            <span className={`text-current ${isError ? "text-error" : ""}`}>
                {currentChar}
                <span className="text-cursor"></span> {/* Курсор внутри text-current */}
            </span>
            <span className="text-remaining">{targetText.slice(position + 1)}</span>
        </div>
    );
};

export default TextDisplay;
