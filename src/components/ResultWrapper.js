import "../css/ResultWrapper.css"
import { getErrorCount, getRightCount } from "./TypingStats"


export default function ResultWrapper({ givenTime }) {

    function calculateTypingSpeed() {
        const rightCount = getRightCount();
        const errorCount = getErrorCount();
        const totalAttempts = rightCount + errorCount;
    
        if (givenTime <= 0) return { CPM: 0, WPM: 0, accuracy: "0.00" };
    
        const CPM = (rightCount / givenTime) * 60;
        const WPM = CPM / 5;
        const accuracy = totalAttempts > 0 ? (rightCount / totalAttempts) * 100 : 100;
    
        return {  
            WPM: WPM,
            accuracy: accuracy.toFixed(2) 
        };
    }
    const { WPM, accuracy } = calculateTypingSpeed(givenTime);

    return (
        <div className="result-wrapper">
            
            <div className="res-block" style={{backgroundColor: 'rgb(48, 50, 156)'}}>
                <div className="res-block-head" style={{ backgroundColor: '#1234' }}>
                    <span style={{ marginTop: '5px', marginBottom: '5px' }}>Accuracy</span>
                </div>
                <div className="res-block-content">
                    <span style={{ fontSize: '40px' }} >{accuracy}%</span>
                </div>
            </div>

            <div className="res-block" style={{backgroundColor: 'rgb(97, 48, 156)'}}>
                <div className="res-block-head" style={{ backgroundColor: '#1234' }}>
                    <span style={{ marginTop: '5px', marginBottom: '5px' }}>WPM</span>
                </div>
                <div className="res-block-content">
                    <span style={{ fontSize: '40px' }} >{WPM}</span>
                </div>
            </div>

        </div>
    )
}