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

const {Content} = Layout



class Life extends Component {
    componentWillMount(){
        this.props.dispatch(getLifeData(getLifeUrl))
        console.log( this.props)
    }
    render () {
        const listData = [];
        this.props.life.forEach((v, i) => {
            console.log(v)
            let {id, title, createTime, week, visitor, like, img, type, user,short} = v
            listData.push(
                Object.assign({}, {id, title, createTime, week, visitor, like, img, type, user,short}, {
                    href: 'http://ant.design',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                })
            )
        })


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
                    <Content style={{padding: '0 50px', marginTop: 64}}>
                        <TopTips/>
                        <div style={{background: '#fff', padding: 24, minHeight: 380}}>
                            <List
                                itemLayout="vertical"
                                size="large"
                                dataSource={listData}
                                footer={<div><b>ant design</b> footer part</div>}
                                renderItem={item => (
                                    <List.Item
                                        key={item.title} actions={[
                                        formatTime(item.createTime),
                                        <IconText type="star-o" text="156"/>,
                                        <IconText type="like-o" text={item.like}/>,
                                        <IconText type="message" text="2"/>,
                                        <IconText type="eye-o" text={item.visitor}/>,
                                    ]}
                                        extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.avatar} />}
                                            title={
                                                <Link to={`/Detail/${item.id}`}>
                                                    {item.title}
                                                </Link>
                                            }
                                            description={item.short}
                                        />
                                        <Link to={`/Detail/${item.id}`}>
                                            阅读全文......
                                        </Link>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Content>
                </Layout>
                <Footer/>
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
