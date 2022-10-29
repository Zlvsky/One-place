import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './Assets/Styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { AuthLogin } from './AuthComponents/AuthLogin';
import { Provider } from "react-redux"
import { store } from "/app/store";

ReactDOM.render(
  <Provider store={store}>
    <AuthLogin>
      <App />
    </AuthLogin>
  </Provider>
    ,document.getElementById('root'));
registerServiceWorker();
