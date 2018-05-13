import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb ,Row,Col} from 'antd';
import { List, Avatar, Icon ,Divider} from 'antd';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
const {  Content } = Layout;

class Detail extends Component {

    render() {

        return (
            <div className="Detail">
                <Header/>
                <Layout>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                            <h2>标题</h2>
                            <Divider/>
                        </div>
                    </Content>
                </Layout>
                <Footer/>
            </div>
        );
    }
}

export default Detail;
