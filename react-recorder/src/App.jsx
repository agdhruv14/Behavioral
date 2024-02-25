import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState, useEffect } from "react";
import AudioRecorder from "../src/AudioRecorder";
import Feedback from "../src/Feedback"
import logo from './Logo.png';
const App = () => {
    const [showAudioRecorder, setShowAudioRecorder] = useState(true);
    const [text, setText] = useState('Get Feedback');

    const handleStateChange = () => {
        setShowAudioRecorder(!showAudioRecorder);
        setText(text === 'Get Feedback' ? 'Home' : 'Get Feedback');
        if (text === "Home") {
            fetch("http://127.0.0.1:8080/delete", {
            mode: "cors"
        })
        }
    };
    return (
        <div>
            <div className = "header"><img src={logo}/></div>
            <div>
                {showAudioRecorder ? <AudioRecorder /> : <Feedback />}
            </div>
            <div>
                <button onClick={handleStateChange}>
                    {text}
                </button>
            </div>
        </div>
    );
};

export default App;
