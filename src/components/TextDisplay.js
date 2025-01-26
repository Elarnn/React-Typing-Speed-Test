const TextDisplay = ({ targetText, position }) => {
    return (
        <p style={{ fontSize: "24px", marginTop: "20px" }}>
            <span style={{ color: "green" }}>{targetText.slice(0, position)}</span>
            <span style={{ borderBottom: "2px solid black" }}>{targetText[position] || " "}</span>
            <span style={{ color: "gray" }}>{targetText.slice(position + 1)}</span>
        </p>
    );
};

export default TextDisplay;
