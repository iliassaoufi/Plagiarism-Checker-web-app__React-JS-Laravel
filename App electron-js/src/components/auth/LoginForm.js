import React from 'react'
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import FormError from '../utils/FormError';
import Loading from '../utils/Loading';
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setToken } from '../../redux/AuthSlice'


export default function LoginForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);



    const handleAPI = async () => {
        setErrors([]);
        try {
            const user = {
                "email": email,
                "password": password,
            }
            const response = await axios.post("/login", user);
            const data = response.data;
            dispatch(setUser(data.user))
            dispatch(setToken(data.token))
            //  console.log(data);
            history.push("/plagiarism");
            return true;
        }
        catch (err) {
            console.log(err);
            setErrors(["Bad Request"]);

        }
        finally {
            setLoading(false);
        };
        return false;
    }
    const validation = () => {
        let er = [];
        if (!email)
            er.push("Email is required")
        if (!password)
            er.push("Password is required")
        return er;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation().length > 0) setErrors(validation());
        else {
            setLoading(true);
            handleAPI();
        }

    }

    return (
        <form className="form-login" onSubmit={handleSubmit}>
            <input type="email"
                className="form-input input-login"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input type="password"
                className="form-input input-login"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {
                loading && <Loading type={2} />
            }
            <FormError errors={errors} />
            <button type="submit" className=" btn-submit mg-t-25 ">submit</button>

            <p className="mg-tb-20 "> create new accounte
                <Link to="/register" className="link" > Register </Link>
            </p>
        </form>
    );
}

