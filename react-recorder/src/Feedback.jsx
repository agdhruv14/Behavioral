import { useState, useRef } from "react";
import { useEffect } from "react";

const Feedback=() => {

    const [data, setdata] = useState({
        description: "",
        speed: "0",
        tone: "neutral" 
    });

        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
    const GetAnalysis=()=> {
        const fetchData=async () => {
        fetch("http://127.0.0.1:8080/analysis", {
            mode: "cors"
        }).then((res) => {
            return res.json();
        })
        .then((responseData) => {
            setdata({
                description: responseData.Analysis,
                speed: responseData.Speed,
                tone: responseData.Tone
            });
        }) 
        }
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                fetchData();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        // Fetch data when component mounts
        fetchData();
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    };

    return (
        <div>
            <button onClick={GetAnalysis} className="play">Get Feedback</button>
            <div class="Tone">
                <p>Tone: { data.tone }</p>
            </div>
            <div class="Speed">
                <p>Speed: { data.speed }</p>
            </div>
            <div class="textbox"> 
                <p> Quality analysis: {data.description}</p>
            </div>
        </div>
    );
};

export default Feedback;