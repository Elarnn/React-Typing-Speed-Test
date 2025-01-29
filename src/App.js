import { useState } from "react";
import useKeyListener from "./components/KeyListener";
import TextDisplay from "./components/TextDisplay";
import "./css/App.css"

const targetText = "Экосистема - это совокупность живых организмов и окружающей их неживой среды";

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
        <div className="container">
            <TextDisplay targetText={targetText} position={position} isError={isError} />
            <div className="button-container">
              <button onClick={() => setIsListening(true)} disabled={isListening}>
                  Начать
              </button>
              <button onClick={reset}>Заново</button>
            </div>
        </div>
    );
};

export default App;
