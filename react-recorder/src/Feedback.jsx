import { useState, useRef } from "react";
import { useEffect } from "react";

const Feedback=() => {

    const [data, setdata] = useState({
        description: "check"
    });

    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        const fetchData=async () => {
        fetch("http://127.0.0.1:8080/analysis", {
            mode: "cors"
        }).then((res) => {
            return res.json();
        })
        .then((responseData) => {
            setdata({
                description: responseData.Analysis
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
        }, []); 
               
    return (
        <div>
            <div class="Tone">
                <p>Tone</p>
            </div>
            <div class="Speed">
                <p>Speed</p>
            </div>
            <div class="Quality">
                <p>Quality</p>
                {data.description}
            </div>
        </div>
    );
};

export default Feedback;