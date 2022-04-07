import React, {useState} from 'react';
import axios from 'axios';
import './Styles/login.css';

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const login = () => {
    axios.post("http://localhost:5000/login", {
      username,
      password
    }, {withCredentials: true}).then(res => {
      if (res.data === 'success') {
        window.location.href = '/';
      }
    })
  };

  return (<div className="bodyWrap">
    <div className="contentLoginWrap">
      <div className="loginSide">
        <div className="loginWrap">
          <h1>Log in</h1>
          <div className="input-group">
            <input type="text" className="input" onChange={e => setUsername(e.target.value)} required="required"/>
            <label className={`${username.length > 0 ? "focusLabel" : ""}`}>Login</label>
          </div>
          <div className="input-group">
            <input type="text" className="input password" onChange={e => setPassword(e.target.value)} required="required"/>
            <label className={`${password.length > 0 ? "focusLabel" : ""}`}>Password</label>
          </div>
          <button onClick={login}>Login</button>
        </div>
      </div>
      <div className="infoSide">
        <div className="loginWrap">
          <h2>Hello again!</h2>
          <p>Log in to your account to get access to app.</p>
        </div>
      </div>
    </div>
  </div>)
}
