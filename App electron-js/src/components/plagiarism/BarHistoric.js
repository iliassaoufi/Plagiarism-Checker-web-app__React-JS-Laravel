import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setHestoric } from '../../redux/PlagiatSlice';
import HistoricCard from "../utils/HistoricCard";



export default function BarHestoric() {


    const historic = useSelector((state) => state.plagiarism.hestoric);
    const dispatch = useDispatch();
    React.useEffect(() => {
        handleAPI()
    }, [])

    const handleAPI = async () => {
        try {
            const response = await axios.get("/user-plagiat-Checks");
            const result = response.data;
            dispatch(setHestoric(result));
            return true;
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="bar-historic">
            <div className="bar-historic-head">
                <h2>Last Historic</h2>
                <Link to="/plagiarism/historic" className="link" >see All</Link>
            </div>
            {
                historic.length < 1 ? "no historics" : historic.slice(-3).reverse().map((data, index) => {
                    return <HistoricCard key={index} data={data} />
                })
            }
        </div>
    );
}
