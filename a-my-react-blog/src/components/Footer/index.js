import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb ,Row,Col} from 'antd';
const { Header, Content, Footer } = Layout;
class TopNav extends Component {
    render() {
        return (
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
            </Footer>
        );
    }
}

export default TopNav;
