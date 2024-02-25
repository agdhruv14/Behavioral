


const Feedback=() => {

    const [data, setdata] = useState({
        analysis: "check"
    });

    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch("http://127.0.0.1:8080/analysis").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setdata({
                    analysis: data.analysis,
                });
            })
        );
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
                {data.analysis}
            </div>
        </div>
    );
};

export default Feedback;