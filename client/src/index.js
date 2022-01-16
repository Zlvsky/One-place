import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './Assets/Styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { AuthLogin } from './AuthComponents/AuthLogin';

ReactDOM.render(
  <AuthLogin>
    <App />
  </AuthLogin>
    ,document.getElementById('root'));
registerServiceWorker();
