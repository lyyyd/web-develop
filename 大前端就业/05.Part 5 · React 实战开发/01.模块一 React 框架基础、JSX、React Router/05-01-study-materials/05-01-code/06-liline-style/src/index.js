import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {StyleRoot} from 'radium'

ReactDOM.render(
  <React.StrictMode>
    <StyleRoot><App /></StyleRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

