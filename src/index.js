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
import AuthRoute from './component/authRoute/authRoute'
import BossInfo from './pages/bossInfo/bossInfo';
import GeniusInfo from './pages/geniusInfo/geniusInfo';


// 建立store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));



ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/geniusinfo' component={GeniusInfo}></Route>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/login' component={Login}>登陆页</Route>
                    <Route path='/register' component={Register}>注册页</Route>
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
