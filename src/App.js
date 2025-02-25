import React, { useState, useRef, useEffect } from "react";
import useKeyListener from "./components/KeyListener";
import TextDisplay from "./components/TextDisplay";
import Timer from "./components/Timer.js";
import { getTargetText } from "./components/getTargetTexts.js"
import { GrPowerReset } from "react-icons/gr";
import "./css/App.css";
import ResultWrapper from "./components/ResultWrapper.js";

const App = () => {
    const [targetText, setTargetText] = useState(getTargetText());
    const [position, setPosition] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isBlurVisible, setIsBlurVisible] = useState(true);
    const [isResultVisible, setIsResultVisible] = useState(false);
    const [scrollOffset, setScrollOffset] = useState(0);
    const [isRotating, setIsRotating] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5); // time left
    const [resetKey, setResetKey] = useState(0); // Ключ для сброса таймера
    const currentRef = useRef(null);

    // Обработка скролла при изменении позиции курсора
    useEffect(() => {
        if (currentRef.current) {
            // Вычисляем на сколько строк опустился курсор
            const lines = Math.floor(currentRef.current.offsetTop / 42);
            setScrollOffset(lines * 42);
        }
    }, [position]);

    useKeyListener(isListening, position, setPosition, targetText, setIsError, setIsTimerRunning);

    const reset = () => {
        setPosition(0);
        setScrollOffset(0);
        setIsError(false);
        setTargetText(getTargetText());
        setResetKey((prev) => prev + 1); // Change key to reset timer
        setIsRotating(true); // Rotating animation
        setTimeout(() => setIsRotating(false), 1000);
    };

    const start = () => {
        setIsBlurVisible(false);
        setIsListening(true);
    }

    const end = () => {
        setIsResultVisible(true);
        setIsListening(false);
        setIsTimerRunning(false);
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

            {isResultVisible && (
                <ResultWrapper timeLeft={timeLeft}/>
                )}

            {isBlurVisible && (
                <div className="blur">
                    <button onClick={start} disabled={isListening}>
                        Start test
                    </button>
                </div>)}

            <div className="controls-container">
                <GrPowerReset className={`resetBtn ${isRotating ? "rotate-360" : ""}`} size={30} onClick={reset} />
                <Timer key={resetKey} isRunning={isTimerRunning} timeLeft={timeLeft} setTimeLeft={setTimeLeft} onEnd={end}/>
            </div>

        </div>
    );
};

export default App;
