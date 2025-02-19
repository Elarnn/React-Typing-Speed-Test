import React, { useState, useRef, useEffect } from "react";
import useKeyListener from "./components/KeyListener";
import TextDisplay from "./components/TextDisplay";
import Timer from "./components/Timer.js";
import { getTargetText } from "./components/getTargetTexts.js"
import { GrPowerReset } from "react-icons/gr";
import "./css/App.css";

const App = () => {
    const [targetText, setTargetText] = useState(getTargetText());
    const [position, setPosition] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [scrollOffset, setScrollOffset] = useState(0);
    const [isRotating, setIsRotating] = useState(false);
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
        setTargetText(getTargetText());
        setIsRotating(true); // Rotating animation
        setTimeout(() => setIsRotating(false), 1000);
    };

    const start = () => {
        setIsVisible(false);
        setIsListening(true)
    }


    return (
        <div className="container">

            <TextDisplay
                targetText={targetText}
                position={position}
                isError={isError}
                scrollOffset={scrollOffset}
                currentRef={currentRef}
            />

            {isVisible && (<div className="blur">
                <button onClick={() => start()} disabled={isListening}>
                    Start test
                </button>
            </div>)}

            <div className="controls-container">
                <GrPowerReset className={`resetBtn ${isRotating ? "rotate-360" : ""}`} size={30} onClick={reset} />
                <Timer/>
            </div>

        </div>
    );
};

export default App;
