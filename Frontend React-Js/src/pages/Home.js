import React from 'react'
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Home() {
    const history = useHistory();
    history.push("/login");
    return <></>;
}



{/* <div>
    <nav>
        <ul>
            <li>
                <Link to="/" >Home</Link>
            </li>
            <li>
                <Link to="/login" >login</Link>
            </li>
            <li>
                <Link to="/register" >register</Link>
            </li>
            <li>
                <Link to="/plagiarism" >plagiarism</Link>
            </li>

        </ul>
    </nav>
</div> */}