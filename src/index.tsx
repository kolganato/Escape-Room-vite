import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import store from './store';
import { checkAuthStatus } from './store/api-actions';
import { Provider } from 'react-redux';


store.dispatch(checkAuthStatus());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="wrapper">
        <App />
      </div>
    </Provider>
  </React.StrictMode>
);
