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
import {getBlogUrl,getTotalUrl,getBlogData,getTotalData,_getTotalData,_getBlogData} from '../../contains/fontEnd'
import {formatTime} from '../../until';
import TopTips from '../../components/TopTips';

const {Content} = Layout
const Search = Input.Search;



class ListTitle extends Component {
    componentWillMount(){
        console.log(this.props)
    }
    
    
    render () {
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
                /*pagination={{
                    onChange: (page) => {
                        console.log(page)
                    },
                    pageSize: 10,
                }}*/
                dataSource={this.props.listData}
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
                        // extra={<img width={272} alt="logo"
                        //             src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar}/>}
                            title={
                                <HashRouter >
                                    <div>
                                        <Link to={`/Detail/${item.id}`}>
                                            {item.title}
                                        </Link>
                                    </div>
                                </HashRouter>
                            }
                            // description={item.description}
                        />
                        {/*{item.content}*/}
                    </List.Item>
                )}
            />
        )
    }
}

export default connect()(ListTitle)
