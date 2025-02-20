import { useState, useEffect, useRef } from "react";
import "../css/Timer.css";

export default function Timer({ isRunning, onEnd }) {
    const [timeLeft, setTimeLeft] = useState(60);
    const timerRef = useRef(null); // Храним ID интервала

    useEffect(() => {
        if (!isRunning || timeLeft <= 0) {
            clearInterval(timerRef.current); // Чистим старый интервал
            return;
        }

        timerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [isRunning, timeLeft]);
    useEffect(() => {
        if (timeLeft === 0 && onEnd) {
            clearInterval(timerRef.current);
            onEnd();
        }
    }, [timeLeft, onEnd]);

    // Форматирование в MM:SS
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    return (
        <div className="timer-container">
            <span className="timer-text">{formattedTime}</span>
        </div>
    );
}
