import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb ,Row,Col} from 'antd';
import { List, Avatar, Icon ,Divider} from 'antd';
import { connect } from 'react-redux'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getDetail } from '../../actions'

import axios from 'axios'
import {getDetailData,getDetailUrl} from '../../contains/fontEnd'
const {  Content } = Layout;

class AdminDetail extends Component {
    componentWillMount () {
        let {id} =this.props.match.params ;
        console.log(id)
    }
    render() {

        
        return (
            <div className="AdminDetail">
                <Header/>
                <Layout>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                            <h2>AdminDetail</h2>
                            <Divider/>
                        </div>
                    </Content>
                </Layout>
                <Footer/>
            </div>
        );
    }
}

export default connect()(AdminDetail);
