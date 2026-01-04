// import React from 'react';
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { Provider } from 'react-redux';
// import store from './redux/store.js';
// import { PersistGate } from 'redux-persist/lib/integration/react.js';
// import { persistStore } from 'redux-persist';

// const persistor = persistStore(store);
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>,
// )

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

