import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb ,Row,Col} from 'antd';
import { List, Avatar, Icon ,Divider} from 'antd';
import { connect } from 'react-redux'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getDetail } from '../../actions'

import axios from 'axios'
import {getDetailData,getDetailUrl} from '../../contains/fontEnd'
const {  Content } = Layout;

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
        return (
            <div className="Detail">
                <Header/>
                <Layout>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                            <h2>{title}</h2>
                            <Divider/>
                            <div
                                dangerouslySetInnerHTML={{__html:decodeURIComponent(content)}}
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
    console.log(state)
    return {
        detail:state.detail
    }
}
export default connect(select)(Detail);
