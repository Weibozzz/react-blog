import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb ,Row,Col} from 'antd';
const { Header, Content, Footer } = Layout;
class blogFooter extends Component {
    render() {
        return (
            <Footer style={{ textAlign: 'center' }}>
                <p> Power & Designed by liuweibo</p>
                <p>© 2017   陕ICP备17015350号</p>
            </Footer>
        );
    }
}

export default blogFooter;
