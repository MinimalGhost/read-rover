import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const options = {
  position: 'bottom center',
  timeout: 5000,
  offset: '130px',
  transition: 'scale'
}

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>,
  document.getElementById('root')
);
registerServiceWorker();
