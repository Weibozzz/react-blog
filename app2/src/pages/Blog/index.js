import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd'
import { List, Avatar, Icon,Pagination,Alert,Input,Button,Radio,Tooltip   } from 'antd'
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
import {formatTime} from '../../until';
import TopTips from '../../components/TopTips';
import ListTitle from '../../components/ListTitle';

const {Content} = Layout
const Search = Input.Search;



class Blog extends Component {
    constructor (){
        super()
        this.state={
            pageNum:10,
            inputVal:'',
            currentPage:1
        }
    }
    componentWillMount () {
        console.log(this.props,this.state)


        _getTotalData(this,getTotalUrl,'all');
        _getBlogData(this,getBlogUrl,'all',1,this.state.pageNum)
    }
    onChange(page, pageSize){
        console.log(page,pageSize)
        this.setState({
            currentPage:page
        })
        this.state.inputVal
            ? _getBlogData(this,getBlogUrl,'title',page,this.state.pageNum,this.state.inputVal)
            : _getBlogData(this,getBlogUrl,'all',page,this.state.pageNum)

    }
    onSearch(val){
        this.setState({
            inputVal:val,
            currentPage:1
        })
        if(val){
            _getBlogData(this,getBlogUrl,'title',1,this.state.pageNum,val)
            _getTotalData(this,getTotalUrl,'title',val);
        }else {
            _getBlogData(this,getBlogUrl,'all',1,this.state.pageNum)
            _getTotalData(this,getTotalUrl,'all');
        }
    }
     itemRender(current, type, originalElement) {
        if (type === 'prev') {
            return <a>Previous</a>;
        } else if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    }
    render () {
        const total = this.props.total&&this.props.total[0]&&this.props.total[0].total? this.props.total[0].total : 0;

        return (
            <div className="Blog">
                <Header/>
                <Layout>
                    <Content style={{padding: '0 50px', marginTop: 64}}>
                        <TopTips/>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={22}>
                                <Search placeholder="input search text" onSearch={this.onSearch.bind(this)} enterButton="Search" size="large" />
                            </Col>
                            <Col className="gutter-row" span={2}>
                                <Link to={`/PostArticle`}>
                                    <Button size="large" type="primary">发布文章</Button>
                                </Link>
                            </Col>
                        </Row>
                        <div style={{background: '#fff', padding: 24, minHeight: 380}}>
                            <ListTitle {...this.props} />

                            <Pagination total={total} itemRender={this.itemRender.bind(this)} onChange={this.onChange.bind(this)} />
                        </div>
                    </Content>
                </Layout>
                <Footer/>
            </div>
        )
    }
}

const select = (state) => {
    console.log(state)
    return {
        testAsync: state.testAsync,
        total:state.total
    }
}
// export default Blog;
export default connect(select)(Blog)
