import { useState, useRef } from "react";
import { useEffect } from "react";

const AudioRecorder = () => {
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audioURL, setAudioURL] = useState(null);
    const [soundFile, setSoundFile] = useState(null);
    const [src, setSrc] = useState("");
    const [data, setdata] = useState({
        question: "Question:"
    });
    
    //Audio Playing
    const [value,setValue] = useState(0);
    useEffect(()=> {
        if (value > 0) {
            Show();
        }
    }, [value]);
    
    async function importFile() {
        const file = await import(
        './../../app-server/ai_audio/voice.mp3'
        );
        setSoundFile(file.default);
    }

    //function for showing
    const Show=() => {
        fetch("http://127.0.0.1:8080/questions", {
            mode: "cors"
        }).then((res) => {
            return res.json();
        })
        .then((responseData) => {
            setdata({
                question: responseData.Question
            });
        }).then(() => {
            console.log("importing file now");
            importFile();
        })
    }

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        setRecordingStatus("recording");
        const media = new MediaRecorder(stream, { type: mimeType });
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };

    const stopRecording = () => {
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioURL(audioUrl);
            let data = new FormData();
            data.append('wavfile', audioBlob, "recording.wav");
    
            const config = {
                headers: {'content-type': 'multipart/form-data'}
            }
            fetch('http://localhost:8080/analyze', {
                method: "POST",
                body: data,
              }).then((res) => console.log(res.data));;
    
            URL.revokeObjectURL(audioUrl);
            setAudioChunks([]);
        };
    };

    return (    
       <div className="chatbot-container">     
        <div className="audio-playe">
            {!permission ? (
                <button onClick={getMicrophonePermission} type="button">
                    Get Microphone
                </button>
            ) : null}
            {permission && recordingStatus === "inactive" ? (
                <button onClick={startRecording} type="button">
                    Start Recording
                </button>
            ) : null}
            {recordingStatus === "recording" ? (
                <button onClick={stopRecording} type="button">
                    Stop Recording
                </button>
            ) : null}
        </div>
        <div className="audio-player">
            <button onClick={()=>setValue(value+1)} > 
                Play Question
            </button>
            <div class = "textbox"> 
                <p> {data.question} </p>
            </div>  
        </div>
    </div>
    );
};

const mimeType = "audio/webm";

export default AudioRecorder;
