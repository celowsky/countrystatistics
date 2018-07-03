import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './components/App';
import mainReducer from './reducers';
import 'bootstrap/dist/css/bootstrap.min.css';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    countries: [],
    searchString: '',
    isFetching: false,
};

const store = createStore(
    mainReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
