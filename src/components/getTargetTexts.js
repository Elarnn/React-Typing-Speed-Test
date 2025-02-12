import targetTexts from "../assets/targetTexts.json";

let previousIndex = -1;

export const getTargetText = () => {
    let randomIndex;
    do {
       randomIndex = Math.floor(Math.random() * targetTexts.length);
    } while (randomIndex === previousIndex)
    previousIndex = randomIndex;
    return targetTexts[randomIndex];
};