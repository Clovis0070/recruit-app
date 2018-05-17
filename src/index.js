import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {
    BrowserRouter as Router,
    // Link,
    Route,
    // Redirect,
    Switch
} from 'react-router-dom';

// import './index.css';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import Login from './container/login/login';
import Register from './container/register/register';


// 建立store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));
// login

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route path='/login' component={Login}>登陆页</Route>
                <Route path='/register' component={Register}>注册页</Route>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
