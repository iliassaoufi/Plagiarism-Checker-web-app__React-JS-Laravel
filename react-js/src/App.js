import React from "react";
import MainRouter from "./routers/MainRouter";
import "./App.css";
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setToken } from './redux/AuthSlice'
import { setResult, setHestoric } from './redux/PlagiatSlice'
import axios from "axios";

export default function App() {
  const dispatch = useDispatch();

  const checkExist = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const user = JSON.parse(localStorage.getItem('user'));
    const historic = JSON.parse(localStorage.getItem('hestoric'));
    const result = JSON.parse(localStorage.getItem('result'));
    if (token && user) {
      dispatch(setUser(user));
      dispatch(setToken(token));
      // console.log("++++++++++++++++");
    }
    if (result) {
      dispatch(setResult(result));
    }
    if (historic) {
      dispatch(setHestoric(historic));
    }
  }

  checkExist();

  AxiosConf();

  return (
    <div className="App">
      <MainRouter>
      </MainRouter>
    </div>
  );
}

function AxiosConf() {
  const AUTH_TOKEN = useSelector((state) => state.authentication.token);
  //console.log(AUTH_TOKEN);
  axios.defaults.baseURL = 'http://localhost/plagiat-project/laravel/public/api';
  axios.defaults.headers.common['Authorization'] = "Bearer " + AUTH_TOKEN;
  axios.defaults.headers.post['Accept'] = 'application/json';
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
}


