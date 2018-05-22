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
import {formatTime} from '../../until';
import ArticleTitle from '../../components/ArticleTitle';

var html2markdown = require('html2markdown');
var converter = require('html-to-markdown');
const {Content} = Layout;
const TabPane = Tabs.TabPane;

class AdminDetail extends Component {
    constructor() {
        super()
    }

    componentWillMount() {
        if(this.props.location.pathname==='/PostArticle')return;
        let adminDetailId=/AdminDetail\/(\d+)/.exec(this.props.location.pathname)[1]
        this.props.dispatch(getDetailData(`${getDetailUrl}?id=${adminDetailId}`))
    }


    render() {
        return (
            <div className="AdminDetail">
                <Layout>
                    <Content style={{padding: '0 50px'}}>
                        <div style={{background: '#fff', padding: 24, minHeight: 380}}>
                            <ArticleTitle {...this.props} />
                            <Markeder {...Object.assign({},this.props)} />
                        </div>
                    </Content>
                </Layout>
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
