import React from "react";
import {
    BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams, useHistory
} from "react-router-dom";

import Form from "../components/plagiarism/PlagiatForm";
import Result from "../components/plagiarism/PlagiatResult";
import Historic from "../components/plagiarism/PlagiatHistoric";

export default function SideRouter(props) {
    let match = useRouteMatch();
    const history = useHistory();
    window.scrollTo({
        top: 0, behavior: 'smooth'
    });
    const handleClickGoBack = () => {
        history.goBack();
        window.scrollTo(0, 0);
    }
    return (
        <div>
            <button className="btn-go-back" onClick={handleClickGoBack}>
                <i class="fas fa-arrow-left"></i>
            </button>
            {props.children}
            <Switch>
                <Route path={`${match.path}/result`}>
                    <Result />
                </Route>
                <Route path={`${match.path}/historic`}>
                    <Historic />
                </Route>
                <Route path={`${match.path}/`} >
                    <Form />
                </Route>
            </Switch>
        </div>
    );
}

// <ul>
//     <li>
//         <Link to={`${match.url}/form`}>
//             plagiat-form
//         </Link>
//     </li>
//     <li>
//         <Link to={`${match.url}/result`}>
//             result
//         </Link>
//     </li>
//     <li>
//         <Link to={`${match.url}/historic`}>
//             historic
//         </Link>
//     </li>
// </ul>