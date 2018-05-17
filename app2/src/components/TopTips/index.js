import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd'
import { List, Avatar, Icon,Pagination,Alert,Input,Button,Radio,Tooltip   } from 'antd'



class TopTips extends Component {
    render () {
        return (
            <div className="Blog">
                <Alert
                    message="博客正在重构和开发中......"
                    type="warning"
                    closable
                    banner={true}
                />
                <div>
                    <Button href="https://github.com/Weibozzz/react-blog" icon="github">Star</Button>
                </div>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        )
    }
}

export default TopTips
