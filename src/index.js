import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // BrowserRouter'ı Router olarak da kullanabilirsiniz
import './index.css';
import App from './App';
import SecondPage from './Pages/SecondPage';
import ThirdPage from './Pages/ThirdPage';
import ForthPage from './Pages/ForthPage';
import FifthPage from './Pages/FifthPage';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/second-page" element={<SecondPage />} />
      <Route path="/third-page" element={<ThirdPage />} />
      <Route path="/forth-page" element={<ForthPage />} />
      <Route path="/fifth-page" element={<FifthPage />} />
    </Routes>
  </Router>,
  root
);
