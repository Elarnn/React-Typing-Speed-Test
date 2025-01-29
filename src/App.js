import { useState } from "react";
import useKeyListener from "./components/KeyListener";
import TextDisplay from "./components/TextDisplay";

const targetText = "Привет, мир!"; // Фиксированный текст

const App = () => {
    const [position, setPosition] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const [isError, setIsError] = useState(false); // Ошибка (мигание красным)

    useKeyListener(isListening, position, setPosition, targetText, setIsError);

    const reset = () => {
        setPosition(0);
        setIsListening(false);
        setIsError(false);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <button onClick={() => setIsListening(true)} disabled={isListening}>
                Начать
            </button>
            <button onClick={reset}>Заново</button>

            <TextDisplay targetText={targetText} position={position} isError={isError} />
        </div>
    );
};

export default App;
