import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb ,Row,Col} from 'antd';
import { List, Avatar, Icon ,Divider} from 'antd';
import { connect } from 'react-redux'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getDetail } from '../../actions'
import {spaceAdd} from '../../until';
import TopTips from '../../components/TopTips';

import marked from 'marked'
import {getDetailData,getDetailUrl} from '../../contains/fontEnd'
const {  Content } = Layout;

const TIME = 1526625828;
const getHtml=(str,time)=>{
    if(TIME>time){ //这是曾经的文章
        return str? str.replace(/@quot;|@apos;|\+/g,function(str){
                if(str==='@quot;'){
                    return '"'
                }else if(str==="@apos;") {
                    return "'"
                }else if(str==="+") {
                    return "&nbsp;"
                }
            })
            :null
    }else {
        return str? str.replace(/@quot;|@apos;/g,function(str){
                if(str==='@quot;'){
                    return '"'
                }else if(str==="@apos;") {
                    return "'"
                }
            })
            :null
    }
}
class Detail extends Component {
    componentWillMount () {
        let {id} =this.props.match.params ;
        this.props.dispatch(getDetailData(`${getDetailUrl}?id=${id}`))
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
        }=this.props.detail&&this.props.detail[0]?this.props.detail[0]:{};
        console.log(content)
        return (
            <div className="Detail">
                <Header/>
                <Layout>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <TopTips/>
                        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                            <h2>{title}</h2>
                            <Divider/>
                            <ul className="clearfix" >
                                <li className="fl">发布时间:{createTime}{week}</li>
                                <li className="fl">作者：{user}</li>
                                <li className="fl">浏览次数：{visitor}</li>
                                <li className="fl">最后修改：{lastModify}</li>
                                <li className="fl">修改次数：{modifyCount}</li>
                            </ul>
                            <div
                                dangerouslySetInnerHTML={{__html:marked(getHtml(decodeURIComponent(content),createTime), {breaks: true})}}
                            ></div>
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
        detail:state.detail
    }
}
export default connect(select)(Detail);
