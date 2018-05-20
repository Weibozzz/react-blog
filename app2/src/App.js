import React, {Component} from 'react';

import {connect} from 'react-redux';
import Blog from './pages/Blog/index';
import Admin from './pages/Admin/index';

import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'
import Detail from './pages/Detail/index';
import AdminDetail from './pages/AdminDetail/index';
import PostArticle from './pages/PostArticle';
import Life from './pages/Life';
import Login from './pages/Login';
import {
    BrowserRouter as Router,
    HashRouter,
    Route,
    Link
} from 'react-router-dom'
import './App.css';
import createHistory from 'history/createBrowserHistory'
import {asyncTest} from './actions';

const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
// const middleware = routerMiddleware(history)

class App extends Component {
    render() {
        const {dispatch, testAsync} = this.props;
        return (
            <ConnectedRouter history={history}>
                <div>
                    <Route exact path="/" component={Blog}/>
                    <Route path="/Admin" component={Admin}/>
                    <Route path="/PostArticle" component={PostArticle}/>
                    <Route path="/Login" component={Login}/>
                    <Route path="/Life" component={Life}/>
                    <Route path="/Detail/:id" component={Detail}/>
                    <Route path="/AdminDetail/:id" component={AdminDetail}/>
                </div>
            </ConnectedRouter>
        );
    }
}

const select = (state) => {
    return {
        testAsync: state.testAsync
    }
}
export default connect(select)(App);
