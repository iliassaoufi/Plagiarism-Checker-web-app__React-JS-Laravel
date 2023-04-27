import React from 'react'
import RegisterForm from '../components/auth/RegisterForm';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'
import "./Login.css"

export default function Register() {
    const user = useSelector((state) => state.authentication.user);
    const history = useHistory();
    React.useEffect(() => {
        if (user) {
            history.push("/plagiarism");
        }
    }, [])
    return (
        <div className="background">
            <div className="glass-box glass-box-login">
                {/* <div className="border"></div> */}
                <h1 className="header-1 mg-tb-50">
                    Register
                </h1>

                <RegisterForm />
            </div>
        </div>
    );
}