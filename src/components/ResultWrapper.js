import "../css/ResultWrapper.css"
import { getErrorCount, getRightCount } from "./TypingStats"


export default function ResultWrapper() {
    const totalTyped = getRightCount() + getErrorCount()
    const accuracy = (getRightCount() / totalTyped) * 100;

    // const CPM;
    return (
        <div className="result-wrapper">
            Accuracy: {isNaN(accuracy) ? 0 : accuracy}%
        </div>
    )
}