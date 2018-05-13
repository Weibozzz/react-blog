import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb ,Row,Col} from 'antd';
import { List, Avatar, Icon } from 'antd';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
const {  Content } = Layout;

class Blog extends Component {

    render() {
        const listData = [];
        for (let i = 0; i < 23; i++) {
            listData.push({
                href: 'http://ant.design',
                id:i,
                title: `ant design part ${i}`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            });
        }

        const IconText = ({ type, text }) => (
            <span>
    <Icon type={type} style={{ marginRight: 8 }} />
                {text}
  </span>
        );

        return (
            <div className="Blog">
                <Header/>
                <Layout>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                            <List
                                itemLayout="vertical"
                                size="large"
                                pagination={{
                                    onChange: (page) => {
                                        console.log(page);
                                    },
                                    pageSize: 3,
                                }}
                                dataSource={listData}
                                footer={<div><b>ant design</b> footer part</div>}
                                renderItem={item => (
                                    <List.Item
                                        key={item.title}
                                        actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                                        extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.avatar} />}
                                            title={
                                                <Router>
                                                    <Link to={`Detail/${item.id}`}>
                                                        {item.title}
                                                    </Link>
                                                </Router>
                                            }
                                            description={item.description}
                                        />
                                        {item.content}
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Content>
                </Layout>
                <Footer/>
            </div>
        );
    }
}

export default Blog;
