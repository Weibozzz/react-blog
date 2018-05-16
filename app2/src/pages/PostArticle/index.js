import React, {Component} from 'react'
import {Layout, Menu, Breadcrumb, Row, Col} from 'antd'
import {List, Avatar, Icon, Pagination, Alert, Input, Button,Select } from 'antd'
import {connect} from 'react-redux'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {
    BrowserRouter as Router,
    HashRouter,
    Route,
    Link
} from 'react-router-dom'
import Markeder from '../../components/Markeder';

const {Content} = Layout;
const {TextArea} = Input;
const Option = Select.Option;


class PostArticle extends Component {
    constructor(){
        super()
        this.state={
            selectVal:'',
            titleVal:'',
            shortVal:'',
            urlVal:''
        }
    }
    handleChangeSelect(value) {
        this.setState({
            selectVal:value
        })
    }
    handleChangeTitle(e) {
        this.setState({
            titleVal:e.target.value
        })
    }
    handleChangeUrl(e) {
        this.setState({
            urlVal:e.target.value
        })
    }
    handleChangeShort(e) {
        this.setState({
            shortVal:e.target.value
        })
    }
    onSubmit(){
        console.log(this.state)
    }
    render() {
        return (
            <div className="PostArticle">
                <Header/>
                <Layout>
                    <Content style={{padding: '0 50px', marginTop: 64}}>
                        <Alert
                            message="博客正在重构和开发中......"
                            type="warning"
                            closable
                            banner={true}
                        />
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <div>
                            <Row>
                                <Col span={20}>
                                    <Input  onChange={this.handleChangeTitle.bind(this)} placeholder="文章标题"/>
                                </Col>
                                <Col span={1}>
                                </Col>
                                <Col span={3}>
                                    <Select defaultValue="文章类型" style={{ width: '100%' }} onChange={this.handleChangeSelect.bind(this)}>
                                        <Option value="h5">html</Option>
                                        <Option value="css">css</Option>
                                        <Option value="js">javascript</Option>
                                        <Option value="vue">vue</Option>
                                        <Option value="react">react</Option>
                                        <Option value="angular">angular</Option>
                                        <Option value="node">node</Option>
                                        <Option value="php">php</Option>
                                        <Option value="mysql">mysql</Option>
                                        <Option value="server">服务器之类</Option>
                                        <Option value="interesting">生活喜好</Option>
                                        <Option value="fight">激励向上</Option>
                                        <Option value="others">其他</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Input onChange={this.handleChangeUrl.bind(this)} placeholder="原文的URL链接地址"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <TextArea
                                        onChange={this.handleChangeShort.bind(this)}
                                        placeholder='简短介绍'
                                        rows={2}/>
                                </Col>
                            </Row>

                        </div>
                        <Markeder {...Object.assign({},this.props,this.state)}></Markeder>
                        <Button type="primary" onClick={this.onSubmit.bind(this)}>提交</Button>
                    </Content>
                </Layout>
                <Footer/>
            </div>
        )
    }
}

export default connect()(PostArticle)
