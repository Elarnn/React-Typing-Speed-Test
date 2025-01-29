import "../css/TextDisplay.css"; // Импортируем стили

const TextDisplay = ({ targetText, position, isError }) => {
    return (
        <p className="text-display">
            <span className="text-correct">{targetText.slice(0, position)}</span>
            <span className={`text-current ${isError ? "text-error" : ""}`}>
                {targetText[position] || " "}
            </span>
            <span className="text-remaining">{targetText.slice(position + 1)}</span>
        </p>
    );
};

export default TextDisplay;
