import { useEffect } from "react";
import { setErrorCount, getErrorCount, setRightCount, getRightCount } from "./TypingStats";

const useKeyListener = (isListening, position, setPosition, targetText, setIsError, setIsTimerRunning) => {
    useEffect(() => {
        if (!isListening) return;

        const handleKeyDown = (event) => {
            // Игнорируем специальные клавиши
            if (event.key.length > 1) return;

            if (event.key === " ") {
                event.preventDefault(); // Блокируем пробел
            }

            if (position < targetText.length) {
                if (event.key === targetText[position]) {
                    setPosition((prev) => prev + 1);
                    setIsError(false); // Убираем ошибку
                    setRightCount(getRightCount() + 1);
                } else {
                    setIsError(true); // Подсветка красным
                    setTimeout(() => setIsError(false), 500);
                    setErrorCount(getErrorCount() + 1);
                }
            }
            setIsTimerRunning(true);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isListening, position, targetText, setPosition, setIsError, setIsTimerRunning]);
};

export default useKeyListener;
