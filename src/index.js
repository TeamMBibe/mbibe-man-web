import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import routes from "./components/routes.jsx";
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Raleway', 'sans-serif']
  }
});

ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();
