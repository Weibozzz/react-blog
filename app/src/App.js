import React, { Component } from 'react';

import {connect} from 'react-redux';
import Blog from './pages/Blog/index';
import Admin from './pages/Admin/index';
import Detail from './pages/Detail/index';
import {
    BrowserRouter as Router,
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
                <Router >
                    <div>
                        <Route  exact path="/" component={Blog}/>
                        <Route  path="/Admin" component={Admin}/>
                        <Route  path="/Detail/:id" component={Detail}/>
                    </div>
                </Router>
            </div>
        );
    }
}
const select = (state) => {
    console.log(state)
    return {
        testAsync:state.testAsync
    }
}
export default connect(select)(App);
