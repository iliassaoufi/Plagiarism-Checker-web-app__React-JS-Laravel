import React from 'react'
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import FormError from '../utils/FormError';
import Loading from '../utils/Loading';
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setToken } from '../../redux/AuthSlice'


export default function RegisterForm() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authentication.user);
    const history = useHistory();

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confPassword, setConfPassword] = React.useState("");
    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    if (user) {
        history.push("/plagiarism");
    }
    React.useEffect(() => {

    }, [])

    const handleAPI = async () => {
        setErrors([]);
        try {
            const user = {
                "name": name,
                "email": email,
                "password": password,
                "password_confirmation": confPassword
            }
            const response = await axios.post("/register", user);
            const data = response.data;
            dispatch(setUser(data.user))
            dispatch(setToken(data.token))
            // console.log(data);
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
    }

    const validation = () => {
        let er = [];
        if (!name)
            er.push("Name is required")
        if (!email)
            er.push("Email is required")

        if (!password)
            er.push("Password is required")
        if (!confPassword)
            er.push("Password confirmation is required")
        else if (password !== confPassword)
            er.push("Password doesn't match")

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
            <input type="text"
                className="form-input input-login"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
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
                onChange={(e) => setPassword(e.target.value)
                }
            />
            <input type="password"
                className="form-input input-login"
                placeholder="Password confirmation"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)
                }
            />
            {
                loading && <Loading type={2} />
            }

            <FormError errors={errors} />
            <button type="submit" className=" btn-submit mg-t-25 ">submit</button>

            <p className="mg-tb-20 "> I have an account
                <Link to="/login" className="link" > Login </Link>
            </p>
        </form>
    );
}

