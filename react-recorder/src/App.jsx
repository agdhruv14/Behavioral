import "./App.css";
import { useState, useEffect } from "react";
import AudioRecorder from "../src/AudioRecorder";

const App = () => {
    const [recordOption, setRecordOption] = useState("audio");


    return (
        <div>
            <h1>Behavioral Interview Simulator</h1>
            <div>
                <AudioRecorder />
                {/* <p>{data.question}</p>     */}
            </div>
        </div>
    );
};

export default App;
