import { useEffect } from "react";

const useKeyListener = (isListening, position, setPosition, targetText) => {
    useEffect(() => {
        if (!isListening) return;

        const handleKeyDown = (event) => {
            if (event.key === " ") {
                event.preventDefault(); // Блокируем пробел
            }
            if (position < targetText.length && event.key === targetText[position]) {
                setPosition((prev) => prev + 1);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isListening, position, targetText, setPosition]);
};

export default useKeyListener;
