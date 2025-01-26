import { useState } from "react";
import useKeyListener from "./components/KeyListener";
import TextDisplay from "./components/TextDisplay";

const targetText = "Привет, мир!"; // Фиксированный текст

const App = () => {
    const [position, setPosition] = useState(0); // Позиция курсора
    const [isListening, setIsListening] = useState(false); // Включен ли слушатель

    useKeyListener(isListening, position, setPosition, targetText);

    // Функция сброса
    const reset = () => {
        setPosition(0);
        setIsListening(false);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <button
                onClick={() => setIsListening(true)}
                onKeyDown={(event) => event.key === " " && event.preventDefault()}
                disabled={isListening}
            >
                Начать
            </button>

            <button
                onClick={() => reset()}
                onKeyDown={(event) => event.key === " " && event.preventDefault()}
            >
                Заново
            </button>

            <TextDisplay targetText={targetText} position={position} />
        </div>
    );
};

export default App;
