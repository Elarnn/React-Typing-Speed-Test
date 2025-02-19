import { useState, useEffect } from "react";
import "../css/Timer.css"

export default function Timer() {
    const [timeLeft, setTimeLeft] = useState(60); // 60 секунд (1 минута)

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

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