import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Row, Col} from 'antd';
import {
    Link
} from 'react-router-dom'
import TopTips from '../../components/TopTips';

const {Header, Content, Footer} = Layout;

class TopNav extends Component {
    constructor(){
        super()
        this.state={
            userName:null
        }
    }
    componentWillMount(){
        this.setState({
            userName:localStorage.userName
        })
    }
    logout(){
        localStorage.clear()
    }
    render() {
        return (
           <div className="header">
               <Layout>
                   <Header style={{position: 'fixed', width: '100%', padding: 0, zIndex: 10}}>
                       <Row>
                           <Col span={2}></Col>
                           <Col span={17}>
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

                                       <Link to="/Admin">
                                           前端技术
                                       </Link>
                                   </Menu.Item>
                                   <Menu.Item key="4">
                                       <Link to="/Life">
                                           生活与创作
                                       </Link>
                                   </Menu.Item>
                                   <Menu.Item key="5">
                                       <Link to="/Test">
                                           建议与反馈
                                       </Link>
                                   </Menu.Item>
                               </Menu>
                           </Col>
                           <Col span={3}>
                             {
                               this.state.userName==null?
                                 <Menu
                                   theme="dark"
                                   mode="horizontal"
                                   defaultSelectedKeys={['2']}
                                   style={{lineHeight: '64px'}}
                                 >
                                     <Menu.Item key="6">
                                         <Link to="/Login">
                                             登录
                                         </Link>
                                     </Menu.Item>

                                 </Menu>
                                 :
                                 <Menu
                                   theme="dark"
                                   mode="horizontal"
                                   defaultSelectedKeys={['2']}
                                   style={{lineHeight: '64px'}}
                                 >
                                     <Menu.Item key="6">
                                         <Link to="/Admin">
                                           {this.state.userName}
                                         </Link>
                                     </Menu.Item>
                                     <Menu.Item key="7" onClick={this.logout.bind(this)}>
                                         退出
                                     </Menu.Item>

                                 </Menu>
                             }
                           </Col>
                           <Col span={2}/>
                       </Row>
                   </Header>
                   <Content style={{padding: '0 50px', marginTop: 64}}>
                       <TopTips/>
                   </Content>
               </Layout>
           </div>
        );
    }
}

export default TopNav;
