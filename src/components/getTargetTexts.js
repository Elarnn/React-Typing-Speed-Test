import targetTexts from "../assets/targetTexts.json";

let previousIndex = -1;
let cachedText = null;

export const getTargetText = () => {
    if (!cachedText) {
        let randomIndex;
        do {
           randomIndex = Math.floor(Math.random() * targetTexts.length);
        } while (randomIndex === previousIndex);
        previousIndex = randomIndex;
        cachedText = targetTexts[randomIndex];
    }
    return cachedText;
};

export const getTargetTextLength = () => {
    return cachedText.length;
}

