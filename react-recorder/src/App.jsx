import "./App.css";
import { useState, useEffect } from "react";
import AudioRecorder from "../src/AudioRecorder";

const App = () => {
    const [recordOption, setRecordOption] = useState("audio");

    const [data, setdata] = useState({
        name: "",
        age: 0,
        date: "",
        programming: "",
    });

    // Using useEffect for single rendering
    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch("http://127.0.0.1:8080/data", {
            mode: "cors"
        }).then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                console.log("help")
                setdata({
                    name: data.Name,
                    age: data.Age,
                    date: data.Date,
                    programming: data.programming,
                });
            })
        );
    }, []);

    return (
        <div>
            <h1>Behavioral Interview Simulator</h1>
            <div>
                <AudioRecorder />
                <p>{data.name}</p>
                <p>{data.age}</p>
                <p>{data.date}</p>
                <p>{data.programming}</p>
            </div>
        </div>
    );
};

export default App;
