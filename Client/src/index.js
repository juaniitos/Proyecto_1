import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['es', 'en', 'pt'],
    fallbackLng: "es",
    detection: {
      order: ['htmlTag', 'cookie', 'path', 'localStorage', 'sessionStorage', 'navigator', 'subdomain'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    }
  });

  const loadingMarkup = (
    <div className='py-4 text-center'>
      <h2>Loading...</h2>    
    </div>
  )

ReactDOM.render(  
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={loadingMarkup}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
