import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './Styles/login.css';

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const login = () => {
    axios.post("http://localhost:5000/login", {
      username,
      password
    }, {
      withCredentials: true
    }).then(res => {
      if (res.data === 'success') {
        window.location.href = '/';
      }
    })
  };

  return (
  <div className="bodyWrap">
    <div className="contentLoginWrap">
    <div className="loginSide">
    <div className="loginWrap">
      <h1>Logowanie</h1>
      <div className="input-group">
        <input type="text" className="input" onChange={e => setUsername(e.target.value)} required />
        <label>Login</label>
      </div>
      <div className="input-group">
        <input type="text" className="input" onChange={e => setPassword(e.target.value)} required />
        <label>Hasło</label>
      </div>
      <button onClick={login}>Zaloguj</button>
    </div>
    </div>
    <div className="infoSide">
      <div className="loginWrap">
        <h2>Witaj z powrotem!</h2>
        <p>Zaloguj się do swojego konta, aby korzystać z serwisu</p>
      </div>
    </div>
    </div>
  </div>
  )
}
