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
import {updateHtml,spaceAdd,NbspToSpace} from '../../until';
import Markeder from '../../components/Markeder';
import TopTips from '../../components/TopTips';

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
            txt:'该文档不支持html-to-markdown',
            isSupport:true,
            id:'',
            title:''
        }
    }

    componentWillMount() {
        console.log(this.props)
        if(this.props.location.pathname==='/PostArticle')return;
        let adminDetailId=/AdminDetail\/(\d+)/.exec(this.props.location.pathname)[1]
        this.props.dispatch(getDetailData(`${getDetailUrl}?id=${adminDetailId}`))
        let {content,createTime,id,img, lastModify, like, modifyCount, recommend, short, title, type, url, user, visitor, week} =
            this.props.detail && this.props.detail[0] ? this.props.detail[0] : {};
        content=content?decodeURIComponent(content):'正在加载......';
        this.setState({
            markData:content,
            title:title
        })
    }


    render() {
        return (
            <div className="AdminDetail">
                <Header/>
                <Layout>
                    <Content style={{padding: '0 50px', marginTop: 64}}>
                        <TopTips/>
                        <div style={{background: '#fff', padding: 24, minHeight: 380}}>
                            <h2>{this.state.title}</h2>
                            <Divider/>
                            {/*<Markeder  />*/}
                            <Markeder {...Object.assign({},this.props,this.state)} />
                        </div>
                    </Content>
                </Layout>
                <Footer/>
            </div>
        );
    }
}

const select = (state) => {
    return {
        detail: state.detail,
    }
}
export default connect(select)(AdminDetail);
