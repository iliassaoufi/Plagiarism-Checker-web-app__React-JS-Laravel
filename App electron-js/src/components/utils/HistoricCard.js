import React from "react"
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { deleteFromHestoric, setResult } from '../../redux/PlagiatSlice';
import axios from "axios";


export default function HistoricCard({ data, full = false }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const styleNone = full ? { display: "block" } : { display: "none" };
    const text = full ? data.result[0][1].slice(0, 140) : data.result[0][1].slice(0, 49);

    const handleClickShow = () => {
        console.log("shhhhhhhhhhhow");
        dispatch(setResult(data));
        history.push("/plagiarism/result/");
    }
    const handleClickDelete = () => {
        dispatch(deleteFromHestoric(data.id));
        const url = `/plagiat/${data.id}`;
        axios.delete(url);
    }

    return (
        <div className="bar-historics-box">
            {/* <h1>{data.id}</h1> */}
            <h4>{data.plagiat > 0.40 ? "Rejected " : "Accepted "} <span>( {Math.floor(data.plagiat * 100)}% plagiat )</span></h4>
            <p>{text + " ..."}</p>
            <div style={{ ...styleNone, marginBottom: 20 }}></div>
            <div className="bar-historics-btn-box" >
                <button
                    style={styleNone}
                    className="link clr-red"
                    onClick={handleClickDelete} >
                    <i class="fas fa-trash clr-red"></i>
                    Delete
                </button>
                {/* <button style={styleNone} className="link clr-gray " >
                    <i class="fas fa-download clr-gray"></i>
                    Download
                </button> */}
                <button
                    className="link"
                    onClick={handleClickShow}
                >
                    <i className="fas fa-compress"></i>
                    More
                </button>
            </div>

        </div>
    );
}