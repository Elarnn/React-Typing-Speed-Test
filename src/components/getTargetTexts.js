import targetTexts from "../assets/targetTexts.json";

export const getTargetText = () => {
    const randomIndex = Math.floor(Math.random() * targetTexts.length);
    return targetTexts[randomIndex];
};