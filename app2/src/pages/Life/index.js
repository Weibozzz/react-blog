import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd'
import { List, Avatar, Icon,Pagination,Alert,Input,Button,Radio,Tooltip   } from 'antd'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {
    BrowserRouter as Router,
    HashRouter,
    Route,
    Link
} from 'react-router-dom'
import { asyncTest,getTotal } from '../../actions'
import 'whatwg-fetch'
import {getBlogUrl,getTotalUrl,getBlogData,getTotalData,_getTotalData,_getBlogData,getLifeData,getLifeUrl} from '../../contains/fontEnd'
import Detail from '../Detail'
import TopTips from '../../components/TopTips';
import {formatTime} from "../../until";
import ListTitle from '../../components/ListTitle';
import Loading from '../../components/Loading';

const {Content} = Layout



class Life extends Component {
    componentWillMount(){
        this.props.dispatch(getLifeData(getLifeUrl));
    }
    render () {
        return (
            <div className="Blog">
                <Loading data={this.props.life}/>
                <Layout>
                    <Content style={{padding: '0 50px'}}>
                        <div style={{background: '#fff', padding: 24, minHeight: 380}}>
                            <ListTitle {...this.props}/>
                        </div>
                    </Content>
                </Layout>
            </div>
        )
    }
}

const select = (state) => {
    console.log(state)
    return {
       life:state.life
    }
}
// export default Blog;
export default connect(select)(Life)
