import React, {Component} from 'react'
import {Layout, Menu, Breadcrumb, Row, Col} from 'antd'
import {List, Avatar, Icon, Pagination, Alert, Input, Button, Radio, Tooltip} from 'antd'
import {connect} from 'react-redux'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {
    BrowserRouter as Router,
    HashRouter,
    Route,
    Link
} from 'react-router-dom'
import {asyncTest, getTotal} from '../../actions'
import 'whatwg-fetch'
import {getBlogUrl, getTotalUrl, getBlogData, getTotalData, _getTotalData, _getBlogData} from '../../contains/fontEnd'
import {formatTime} from '../../until';
import TopTips from '../../components/TopTips';
import {getPathName} from '../../until';

const {Content} = Layout
const Search = Input.Search;


class ListTitle extends Component {

    render() {
        let pathname = getPathName(this.props);// 这里有两个地方，目前路径 为 ''或者'Life'
        let data = pathname===''? this.props.testAsync: this.props.life;
        const listData = []
        data&&data.forEach((v, i) => {
            let {id, title, createTime, week, visitor, like, img, type, user} = v
            listData.push(
                Object.assign({}, {id, title, createTime, week, visitor, like, img, type, user}, {
                    href: 'http://ant.design',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                    // content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                })
            )
        })

        const IconText = ({type, text}) => (
            <span>
    <Icon type={type} style={{marginRight: 8}}/>
                {text}
  </span>
        )

        return (
            <List
                itemLayout="vertical"
                size="large"
                dataSource={listData}
                footer={<div><b>ant design</b> footer part</div>}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[
                            formatTime(item.createTime),
                            <IconText type="star-o" text="156"/>,
                            <IconText type="like-o" text={item.like}/>,
                            <IconText type="message" text="2"/>,
                            <IconText type="eye-o" text={item.visitor}/>,
                        ]}
                        extra={pathname===''?'':<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar}/>}
                            title={
                                <Link to={`/Detail/${item.id}`}>
                                    {item.title}
                                </Link>
                            }
                            description={pathname===''?'':item.short}
                        />
                        {
                            pathname===''?'':
                                <Link to={`/Detail/${item.id}`}>
                                    阅读全文......
                                </Link>
                        }
                    </List.Item>
                )}
            />

        )
    }
}

export default connect()(ListTitle)
