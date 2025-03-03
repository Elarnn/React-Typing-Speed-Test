import React, { useState, useRef, useEffect } from "react";
import useKeyListener from "./components/KeyListener";
import TextDisplay from "./components/TextDisplay";
import Timer from "./components/Timer.js";
import { getTargetText } from "./components/getTargetTexts.js"
import { GrPowerReset } from "react-icons/gr";
import "./css/App.css";
import ResultWrapper from "./components/ResultWrapper.js";

const INITIAL_TIME = 60;

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
    const [resetKey, setResetKey] = useState(0); // Key for timer reset
    const currentRef = useRef(null);

    // Scroll processing when cursor position changes
    useEffect(() => {
        if (currentRef.current) {
            const lines = Math.floor(currentRef.current.offsetTop / 42); // Calculate how many lines the cursor has gone down
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

    const restart = () => {
        setIsResultVisible(false);
        setPosition(0);
        setScrollOffset(0);
        setTargetText(getTargetText());
        setIsListening(true);
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

            {isResultVisible ? (
                <ResultWrapper givenTime={INITIAL_TIME} />
            ) : (
                <TextDisplay
                    targetText={targetText}
                    position={position}
                    isError={isError}
                    scrollOffset={scrollOffset}
                    currentRef={currentRef}
                />
            )}

            {isBlurVisible && (
                <div className="blur">
                    <button onClick={start} disabled={isListening} style={{ padding: '15px 40px' }}>
                        Start test
                    </button>
                </div>)}

            {isResultVisible ? (
                <div className="controls-container">
                    <button className="restart-btn">
                        <GrPowerReset style={{ padding: '5px 10px' }} size={24} onClick={restart} />
                    </button>
                </div>
            ) : (
                <div className="controls-container">
                    <GrPowerReset className={`reset-btn ${isRotating ? "rotate-360" : ""}`} size={30} onClick={reset} />
                    <Timer
                        key={resetKey}
                        resetKey={resetKey}
                        isRunning={isTimerRunning}
                        initialTime={INITIAL_TIME}
                        onEnd={end}
                    />
                </div>
            )}

        </div>
    );
};

export default App;
