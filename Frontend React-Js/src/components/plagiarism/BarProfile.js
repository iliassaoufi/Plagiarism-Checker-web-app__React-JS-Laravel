import React from 'react'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser, deleteToken } from '../../redux/AuthSlice'
import { deleteResult, deleteHestoric } from '../../redux/PlagiatSlice'
//import profile from "../../assets/images/profil.png"

export default function BarProfile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authentication.user);
    const history = useHistory();
    const handleLogout = () => {
        dispatch(deleteUser());
        dispatch(deleteToken());
        dispatch(deleteResult());
        dispatch(deleteHestoric());
        history.push("/");
    }

    return (
        <div className="profile">
            {/* <img src={profile} /> */}
            {/* <i class="fas fa-user"></i> */}
            <i className="far fa-user"></i>
            <div>
                <h3>{user?.name}</h3>
                <p>{user?.email}</p>
                <button className="link" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
}