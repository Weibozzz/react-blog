import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import myBlog from './reducers';
import thunkMiddleWare from 'redux-thunk'

import registerServiceWorker from './registerServiceWorker';

let store = createStore(myBlog,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleWare)
);
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();

