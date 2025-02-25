import "../css/ResultWrapper.css"
import { getErrorCount, getRightCount } from "./TypingStats"


export default function ResultWrapper() {
    const totalTyped = getRightCount() + getErrorCount()
    const accuracy = ((getRightCount() / totalTyped) * 100).toFixed(2);

    const WPM = totalTyped / 5;
    return (
        <div className="result-wrapper">
            <div className="accur-disp">
                <div style={{justifyContent: 'center', marginTop: '10px'}}>Accuracy</div>
                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: '1'}}>{isNaN(accuracy) ? 0 : accuracy}%</span>
            </div>
            <div className="wpm-disp">
                <div style={{justifyContent: 'center', marginTop: '10px'}}>Words per minute</div>
                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: '1'}}>{WPM}</span>
            </div>
        </div>
    )
}