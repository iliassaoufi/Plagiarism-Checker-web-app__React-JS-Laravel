import React from 'react'
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'
import BarHestoric from '../components/plagiarism/BarHistoric';
import BarProfile from '../components/plagiarism/BarProfile';
import PlagiatForm from '../components/plagiarism/PlagiatForm';

import SideRouter from "../routers/SideRouter";

import "./Plagiarism.css"

export default function Plagiarism() {
    const user = useSelector((state) => state.authentication.user);
    const history = useHistory();
    React.useEffect(() => {
        if (!user) {
            history.push("/login");
        }
    }, [])
    return (
        <div className="background">
            <div className="glass-box glass-box-plagiat">
                <div className="side-bar ">
                    <BarProfile />
                    <BarHestoric />
                </div>
                <div className="main-container">

                    <SideRouter>
                    </SideRouter>


                    {/* <PlagiatForm /> */}
                </div>
            </div>
        </div>
    );
}