import "./App.css";
import { useState } from "react";
import AudioRecorder from "../src/AudioRecorder";

const App = () => {
    const [recordOption, setRecordOption] = useState("audio");

    return (
        <div>
            <h1>Behavioral Interview Simulator</h1>
            <div>
                <AudioRecorder />
            </div>
        </div>
    );
};

export default App;
