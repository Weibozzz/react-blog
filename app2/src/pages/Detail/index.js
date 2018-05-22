import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb ,Row,Col,BackTop,Card } from 'antd';
import { List, Avatar, Icon ,Divider} from 'antd';
import { connect } from 'react-redux'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getDetail } from '../../actions'
import {formatTime,getArticleInfo,getHtml,OldTime} from '../../until';
// import ArticleTitle from '../../components/ArticleTitle';
import TopTips from '../../components/TopTips';

import marked from 'marked'
import {getDetailData,getDetailUrl,getCommentsData,getCommentsUrl} from '../../contains/fontEnd'
// import './index.css';

const {  Content } = Layout;

var html2markdown = require('html2markdown');
class Detail extends Component {
    componentWillMount () {
        let {id} =this.props.match.params ;
        this.props.dispatch(getDetailData(`${getDetailUrl}?id=${id}`))
        this.props.dispatch(getCommentsData(`${getCommentsUrl}?id=${id}`))
    }
    render() {

        let {
            content,
            createTime,
        }=getArticleInfo(this.props.detail);
        console.log(decodeURIComponent(content))
        return (
            <div className="Detail">
                <Header/>
                <Layout>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <TopTips/>
                        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                            {/*<ArticleTitle {...this.props} />*/}
                            <div
                                dangerouslySetInnerHTML={{__html:
                                        createTime>OldTime?
                                            marked(getHtml(decodeURIComponent(content),createTime), {breaks: true})
                                            :getHtml(decodeURIComponent(content),createTime)
                                }}
                            ></div>
                        </div>
                        <div style={{display:this.props.comments.length?'block':'none'}}>
                            <h2>评论：</h2>
                            {
                                this.props.comments.map((v,i)=>
                                    (
                                        <Card
                                            bodyStyle={{background:"#f8f8f8"}}
                                            key={i} title={
                                            <span>
                                                <span style={{color:'#34538b',fontWeight:'bold'}}>{v.user}</span>
                                                说道：
                                            </span>
                                        }
                                            extra={<a href="javascript:;">{formatTime(v.createTime)}</a>}>
                                            <p>{v.msg}</p>
                                        </Card>
                                    )
                                )
                            }
                        </div>
                    </Content>
                    <BackTop />
                </Layout>
                <Footer/>
            </div>
        );
    }
}
const select = (state) => {
    console.log(state)
    return {
        detail:state.detail,
        comments:state.comments
    }
}
export default connect(select)(Detail);
