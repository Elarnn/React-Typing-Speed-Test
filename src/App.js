import React, { useState, useRef, useEffect } from "react";
import useKeyListener from "./components/KeyListener";
import TextDisplay from "./components/TextDisplay";
import "./css/App.css";

const targetText = "Экосистема - это совокупность живых организмов и окружающей их неживой среды с живых организмов и окружающей их неживой среды Экосистема - это совокупность живых организмов и окружающей их неживой среды";

const App = () => {
    const [position, setPosition] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const [isError, setIsError] = useState(false);
    const [scrollOffset, setScrollOffset] = useState(0);
    const currentRef = useRef(null);

    // Обработка скролла при изменении позиции курсора
    useEffect(() => {
        if (currentRef.current) {
            // Вычисляем на сколько строк опустился курсор
            const lines = Math.floor(currentRef.current.offsetTop / 42);
            setScrollOffset(lines * 42);
        }
    }, [position]);

    useKeyListener(isListening, position, setPosition, targetText, setIsError);

    const reset = () => {
        setPosition(0);
        setIsListening(false);
        setIsError(false);
        setScrollOffset(0);
    };

    return (
        <div className="container">
            <TextDisplay 
                targetText={targetText} 
                position={position} 
                isError={isError} 
                scrollOffset={scrollOffset} 
                currentRef={currentRef}
            />
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
