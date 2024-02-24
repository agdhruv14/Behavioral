import "./App.css";
import { useState } from "react";
import AudioRecorder from "../src/AudioRecorder";

const App = () => {
    const [recordOption, setRecordOption] = useState("audio");

    return (
        <div>
            <h1>React Media Recorder</h1>
            <div className="button-flex">
                <button onClick={() => setRecordOption("audio")}>
                    Record Audio
                </button>
            </div>
            <div>
                <AudioRecorder />
            </div>
        </div>
    );
};

export default App;
