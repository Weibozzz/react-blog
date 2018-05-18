import React, { Component } from 'react';

import {connect} from 'react-redux';
import Blog from './pages/Blog/index';
import Admin from './pages/Admin/index';
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

import { asyncTest} from './actions';
class App extends Component {
    render() {
        const {dispatch,testAsync} = this.props;
        console.log(this.props)
        return (
            <div className="App">
                <HashRouter   >
                    <div>
                        <Route  exact path="/" component={Blog}/>
                        <Route   path="/Admin" component={Admin}/>
                        <Route   path="/PostArticle" component={PostArticle}/>
                        <Route   path="/Login" component={Login}/>
                        <Route   path="/Life" component={Life}/>
                        <Route  path="/Detail/:id" component={Detail}/>
                        <Route  path="/AdminDetail/:id" component={AdminDetail}/>
                    </div>
                </HashRouter >
            </div>
        );
    }
}
const select = (state) => {
    return {
        testAsync:state.testAsync
    }
}
export default connect(select)(App);
