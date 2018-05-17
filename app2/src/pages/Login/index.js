import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Row, Col,Tabs } from 'antd'
import { List, Avatar, Icon,Pagination,Alert,Input,Button   } from 'antd'
import { Form, Checkbox } from 'antd';
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
import Detail from '../Detail'
import TopTips from '../../components/TopTips';

const {Content} = Layout
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

function callback(key) {
    console.log(key);
}


class Login extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render () {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="Login">
                <Header/>
                <Layout>
                    <Content style={{padding: '0 50px', marginTop: 64}}>
                        <TopTips/>

                        <Row>
                            <Col span={8}></Col>
                            <Col span={8}>

                                <Tabs defaultActiveKey="1" onChange={callback}>
                                    <TabPane tab="用户登录" key="1">
                                        <Form onSubmit={this.handleSubmit} className="login-form">
                                            <FormItem>
                                                {getFieldDecorator('userName', {
                                                    rules: [{ required: true, message: 'Please input your username!' }],
                                                })(
                                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                                )}
                                            </FormItem>
                                            <FormItem>
                                                {getFieldDecorator('password', {
                                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                                })(
                                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                                )}
                                            </FormItem>
                                            <FormItem>
                                                {getFieldDecorator('remember', {
                                                    valuePropName: 'checked',
                                                    initialValue: true,
                                                })(
                                                    <Checkbox>Remember me</Checkbox>
                                                )}
                                                <Button type="primary" htmlType="submit" className="login-form-button">
                                                    Log in
                                                </Button>
                                            </FormItem>
                                        </Form>
                                    </TabPane>
                                    <TabPane tab="管理员登录" key="2">
                                        <Form onSubmit={this.handleSubmit} className="login-form">
                                            <FormItem>
                                                {getFieldDecorator('userName', {
                                                    rules: [{ required: true, message: 'Please input your username!' }],
                                                })(
                                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                                )}
                                            </FormItem>
                                            <FormItem>
                                                {getFieldDecorator('password', {
                                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                                })(
                                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                                )}
                                            </FormItem>
                                            <FormItem>
                                                {getFieldDecorator('remember', {
                                                    valuePropName: 'checked',
                                                    initialValue: true,
                                                })(
                                                    <Checkbox>Remember me</Checkbox>
                                                )}
                                                <Button type="primary" htmlType="submit" className="login-form-button">
                                                    Log in
                                                </Button>
                                            </FormItem>
                                        </Form>
                                    </TabPane>
                                </Tabs>

                            </Col>
                            <Col span={8}></Col>
                        </Row>
                    </Content>
                </Layout>
                <Footer/>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm

