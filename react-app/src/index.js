import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store'

const store = configureStore();

ReactDOM.render(
  // Strict mode makes error messages better
  <React.StrictMode>
    {/* Provider is Redux. */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
