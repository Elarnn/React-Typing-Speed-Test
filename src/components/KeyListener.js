import { useEffect } from "react";

const useKeyListener = (isListening, position, setPosition, targetText, setIsError) => {
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
                } else {
                    setIsError(true); // Подсветка красным
                    setTimeout(() => setIsError(false), 500); // Убираем красный через 0.5 сек
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isListening, position, targetText, setPosition, setIsError]);
};

export default useKeyListener;
