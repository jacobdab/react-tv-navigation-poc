import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import { createStore, compose, applyMiddleware } from 'redux'
import navigation from "./redux/navigation/navigation";
import {BrowserRouter} from "react-router-dom";
import { default as thunk } from "redux-thunk";
import Navigation from "./Navigation/Navigation";
import {initialState as focus}  from "./constants/initialState";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(navigation, {focus}, composeEnhancers(
    applyMiddleware(thunk)
));


    // const {whyDidYouUpdate} = require('why-did-you-update');
    // whyDidYouUpdate(React);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <Navigation>
                <App />
            </Navigation>
        </BrowserRouter>
    </Provider>
    );

    ReactDOM.render(app, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
