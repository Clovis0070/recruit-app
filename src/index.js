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
import Login from './pages/login/login';
import Register from './pages/register/register';
import AuthRoute from './component/auth_route/auth_route'


// 建立store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));


function Boss() {
    return <h2>BOSS页面</h2>
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/boss" component={Boss}></Route>
                    <Route path='/login' component={Login}>登陆页</Route>
                    <Route path='/register' component={Register}>注册页</Route>
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
