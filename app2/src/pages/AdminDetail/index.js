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
import {updateHtml,spaceAdd} from '../../until';

var html2markdown = require('html2markdown');
var converter = require('html-to-markdown');
const {Content} = Layout;
const TabPane = Tabs.TabPane;

class AdminDetail extends Component {
    constructor() {
        super()
        this.state = {
            previewContent: '',
            previewHtmlContent:'',
            txt:'该文档不支持html-to-markdown'
        }
    }

    componentWillMount() {
        let {id} = this.props.match.params;
        this.props.dispatch(getDetailData(`${getDetailUrl}?id=${id}`))
        
    }

    onContentChange(e) {
        if(!this.state.isSupport)return;
        let str = marked(e.target.innerText, {breaks: true});
        this.setState({
            previewContent: str,
            previewHtmlContent:decodeURIComponent(str),
        })
    }
    onEditDetail(){
        let {id} = this.props.match.params;
        let txt = this.refs.textHtml.innerText;
        if(txt===''||txt===this.state.txt)return;
        alert('不能提交')
        this.props.dispatch(postAdminDetailData(postAdminDetailUrl,{content:encodeURIComponent(updateHtml(txt)),id:id}))
    }

    render() {
        
        let {
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
        content=content?decodeURIComponent(content):'正在加载......';
        let cont={
            txt:this.state.txt,
            isSupport:false
        };
        try {
            cont={
                txt:html2markdown(content),
                isSupport:true
            }
        } catch (err) {
            cont={
                txt:this.state.txt,
                isSupport:false
            }
        }
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
                            <h2>文章管理</h2>
                            <Divider/>
                            <Tabs>
                                <TabPane tab="marked" key="1">
                                    <div style={{minHeight: '100px', border: '1px solid'}}
                                         contentEditable="plaintext-only"
                                         onInput={this.onContentChange.bind(this)}>{cont.txt}</div>
                                </TabPane>
                                <TabPane tab="预览" key="2">
                                    <div dangerouslySetInnerHTML={{__html: this.state.previewContent}}></div>
                                </TabPane>
                                <TabPane tab="html" key="3">
                                    <Button onClick={this.onEditDetail.bind(this)}  type={cont.isSupport?"primary":"danger"}>修改</Button>
                                    <div ref="textHtml">{this.state.previewHtmlContent}</div>
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
    }
}
export default connect(select)(AdminDetail);
