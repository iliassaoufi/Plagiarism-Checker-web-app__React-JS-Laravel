import React from 'react'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import HistoricCard from "../utils/HistoricCard";

export default function PlagiatHistoric() {


    const historic = useSelector((state) => state.plagiarism.hestoric);

    return (
        <div className="bar-historic">
            <br />
            <h1 className="header-1 mg-t-20 mg-b-40 ">
                Historics
                <div className="border"></div>
            </h1>
            {
                historic.slice(-historic.length).reverse().map((data, index) => {
                    return <HistoricCard key={index} data={data} full={true} />
                })
            }
        </div>
    )
}
