import React from 'react'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import ResultQuery from "../utils/ResultCard"
import "./PlagiatResult.css"

// function useForceUpdate() {
//     const [value, setValue] = React.useState(0); // integer state
//     return () => setValue(1); // update the state to force render
// }

export default function PlagiatResult() {

    const plagitResult = useSelector((state) => state.plagiarism.result);

    // const plagiatDetails = plagitResult.result.map((q, index) => {
    //     console.log(q);
    //     return <ResultQuery key={q.id} query={q} />
    // });

    return (
        <div>
            <br />
            <h1 className="header-1 mg-b-25 ">
                Plagiat Result
                <div className="border"></div>
            </h1>

            <div className="result-box">
                <ResultHeader result={plagitResult} />
                {/* <h2>More Details </h2> */}
                {/* {plagiatDetails} */}
                <ResultDetails result={plagitResult} />
            </div>
        </div>
    );
}

function ResultHeader({ result }) {
    return (
        <div className="result-header">
            <div className="glass-box result-header-item result-header-item-1" >
                <p>
                    <i className="far fa-file-alt"></i>
                    Total sentence checked is
                    <strong> {result.result.length}</strong>
                </p>
                <p>
                    <i className="fas fa-times clr-red"> </i>
                    Plagiat sentence is
                    <strong> {Math.floor(result.plagiat * 100)}%</strong>
                </p>
                <p>
                    <i className="fas fa-check clr-green"></i>
                    Unique sentence is
                    <strong> {Math.floor(100 - result.plagiat * 100)}%</strong>
                </p>
            </div>
            <div className="glass-box result-header-item result-header-item-2" >

                {/* <i class="fas fa-quote-right"></i> */}
                <i className={result.plagiat > 0.30 ? "fas fa-file-contract clr-red" : " fas fa-file-contract clr-green"}></i>
                <h2>{result.plagiat > 0.30 ? "Rejected" : "Accepted"}</h2>

                <button className="btn-out">
                    <i className="fas fa-download"></i>
                    report
                </button>
            </div>
        </div>
    );
}
function ResultDetails({ result }) {
    return (
        <>
            {
                result.result.map((q, index) => {
                    return <ResultQuery key={index + "_" + q[1]} query={q} />
                })
            }
        </>
    );
}