import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Row, Col} from 'antd';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

const {Header, Content, Footer} = Layout;

class TopNav extends Component {
    render() {
        return (
            <Layout>
                <Header style={{position: 'fixed', width: '100%', padding: 0, zIndex: 10}}>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={17}>
                            <Router>
                                <Menu
                                    theme="dark"
                                    mode="horizontal"
                                    defaultSelectedKeys={['2']}
                                    style={{lineHeight: '64px'}}
                                >
                                    <Menu.Item key="2">
                                        <Link to="/">
                                            网站首页
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="3">

                                        <Link to="/Detail">
                                            前端技术
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="4">生活与创作</Menu.Item>
                                    <Menu.Item key="5">建议与反馈</Menu.Item>
                                </Menu>
                            </Router>
                        </Col>
                        <Col span={3}>
                            <Router>
                                <Menu
                                    theme="dark"
                                    mode="horizontal"
                                    defaultSelectedKeys={['2']}
                                    style={{lineHeight: '64px'}}
                                >
                                    <Menu.Item key="6">
                                        <Link to="/Admin">
                                            登录
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="7">注册</Menu.Item>
                                </Menu>
                            </Router>
                        </Col>
                        <Col span={2}/>
                    </Row>
                </Header>
            </Layout>
        );
    }
}

export default TopNav;
