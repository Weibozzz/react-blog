import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Row, Col} from 'antd';
import {List, Avatar, Icon, Divider, Tabs, Button} from 'antd';
import {connect} from 'react-redux'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {getDetail} from '../../actions'
import axios from 'axios'
import marked from 'marked'
import {getDetailData, getDetailUrl} from '../../contains/fontEnd'
import {postAdminDetailData,postAdminDetailUrl} from '../../contains/backEnd'

var html2markdown = require('html2markdown');
const {Content} = Layout;
const TabPane = Tabs.TabPane;

class AdminDetail extends Component {
    constructor() {
        super()
        this.state = {
            previewContent: ''
        }
    }

    componentWillMount() {
        let {id} = this.props.match.params;
        this.props.dispatch(getDetailData(`${getDetailUrl}?id=${id}`))
    }

    onContentChange(e) {
        this.setState({
            previewContent: marked(e.target.innerText, {breaks: true})
        })
    }
    onEditDetail(){
        let {id} = this.props.match.params;
        console.log(this.refs.textHtml.innerText)
        // console.log(Object.prototype.toString.call(this.textHtml))
        // this.props.dispatch(postAdminDetailData(postAdminDetailUrl,{content:encodeURIComponent(this.refs.textHtml).innerText,id:id}))
        // this.props.dispatch(postAdminDetailData(postAdminDetailUrl,{content:encodeURIComponent(this.refs.textHtml.innerText),id:id}))
    }

    render() {
        const {
            content,
            createTime,
            id,
            img,
            lastModify,
            like,
            modifyCount,
            recommend,
            short,
            title,
            type,
            url,
            user,
            visitor,
            week
        } = this.props.detail && this.props.detail[0] ? this.props.detail[0] : {};
        return (
            <div className="AdminDetail">
                <Header/>
                <Layout>
                    <Content style={{padding: '0 50px', marginTop: 64}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{background: '#fff', padding: 24, minHeight: 380}}>
                            <h2>AdminDetail</h2>
                            <Divider/>
                            <Tabs>
                                <TabPane tab="marked" key="1">
                                    <div style={{minHeight: '100px', border: '1px solid'}}
                                         contentEditable="plaintext-only"
                                         onInput={this.onContentChange.bind(this)}>{html2markdown(decodeURIComponent(content))}</div>
                                </TabPane>
                                <TabPane tab="预览" key="2">
                                    <div dangerouslySetInnerHTML={{__html: this.state.previewContent}}></div>
                                </TabPane>
                                <TabPane tab="html" key="3">
                                    <Button onClick={this.onEditDetail.bind(this)} type="primary">修改</Button>
                                    <div ref="textHtml">{decodeURIComponent(content)}</div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Content>
                </Layout>
                <Footer/>
            </div>
        );
    }
}

const select = (state) => {
    console.log(state)
    return {
        detail: state.detail,
        adminDetail:state.adminDetail
    }
}
export default connect(select)(AdminDetail);
