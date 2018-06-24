import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd'
import { List, Avatar, Icon,Pagination,Alert,Input,Button,Radio,Tooltip   } from 'antd'



class TopTips extends Component {
    componentWillReceiveProps(){
        //任何子页面发生改变，均可调用，完成路径切分以及形成面包屑 
    }
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
                    <Button href="https://github.com/Weibozzz/react-blog" icon="github">Github</Button>
                </div>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>网站首页</Breadcrumb.Item>
                    <Breadcrumb.Item>前端技术</Breadcrumb.Item>
                    <Breadcrumb.Item>171</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        )
    }
}

export default TopTips
