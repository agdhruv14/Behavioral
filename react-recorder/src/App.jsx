import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState, useEffect } from "react";
import AudioRecorder from "../src/AudioRecorder";
import Feedback from "../src/Feedback"

const App = () => {
    const [showAudioRecorder, setShowAudioRecorder] = useState(true);

    const handleStateChange = () => {
        setShowAudioRecorder(!showAudioRecorder);
    };

    return (
        <div>
            <h1>Behavioral Interview Simulator</h1>
            <div>
                {showAudioRecorder ? <AudioRecorder /> : <Feedback />}
            </div>
            <div>
                <button onClick={handleStateChange}>
                    Get Feedback
                </button>
            </div>
        </div>
    );
};

export default App;
