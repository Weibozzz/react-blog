import React, { Component } from 'react';
import Blog from './pages/Blog/index';
import Admin from './pages/Admin/index';
import Detail from './pages/Detail/index';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router >
                    <div>
                        <Route exact path="/" component={Blog}/>
                        <Route  path="/Admin" component={Admin}/>
                        <Route  path="/Detail/:id" component={Detail}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
