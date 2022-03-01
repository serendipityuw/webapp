import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGP9fkPk1EfT-bl8O2BqJ627Hy6zYqPwo",
  authDomain: "serendipity-2f854.firebaseapp.com",
  projectId: "serendipity-2f854",
  storageBucket: "serendipity-2f854.appspot.com",
  messagingSenderId: "305536146214",
  appId: "1:305536146214:web:e74548a840696158967fe7"
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
