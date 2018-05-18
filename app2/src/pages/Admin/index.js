import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Row, Col,Pagination,Input} from 'antd';
import {List, Avatar, Icon} from 'antd';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {Tabs} from 'antd';
import {Table} from 'antd';
import {connect} from 'react-redux';
import {getAdminBlogData, getAdminBlogUrl,_getAdminBlogData} from '../../contains/backEnd';
import { _getTotalData, getTotalUrl} from '../../contains/fontEnd'
import {
    BrowserRouter as Router,
    HashRouter,
    Route,
    Link
} from 'react-router-dom'
import TopTips from '../../components/TopTips';
import {formatTime} from '../../until';

const TabPane = Tabs.TabPane;
const {Content} = Layout;
const Search = Input.Search;

class Admin extends Component {

    constructor (){
        super()
        this.state={
            pageNum:10,
            currentPage:1,
            inputVal:''
        }
    }
    componentWillMount() {
        _getAdminBlogData(this,getAdminBlogUrl,'all',1,this.state.pageNum)
        // this.props.dispatch(getAdminBlogData(`${getAdminBlogUrl}?type=all&num=1&pageNum=${this.state.pageNum}`))
        // this.props.dispatch(getTotalData(`${getTotalUrl}?type=all`))
        _getTotalData(this,getTotalUrl,'all')
    }
    itemRender(current, type, originalElement) {
        if (type === 'prev') {
            return <a>Previous</a>;
        } else if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    }
    onChange(page, pageSize){

        this.setState({
            currentPage:page
        })
        console.log(page,pageSize)
        // if(thi)
        this.state.inputVal
            ?  _getAdminBlogData(this,getAdminBlogUrl,'title',page,this.state.pageNum,this.state.inputVal)
            :  _getAdminBlogData(this,getAdminBlogUrl,'all',page,this.state.pageNum)

        // this.props.dispatch(getAdminBlogData(`${getAdminBlogUrl}?type=all&num=${page}&pageNum=${this.state.pageNum}`))
    }
    onSearch(val){
        this.setState({
            inputVal:val,
            currentPage:1
        })
        if(val){
            _getAdminBlogData(this,getAdminBlogUrl,'title',1,this.state.pageNum,val)
            _getTotalData(this,getTotalUrl,'title',val);
        }else {
            _getTotalData(this,getTotalUrl,'all');
            _getAdminBlogData(this,getAdminBlogUrl,'all',1,this.state.pageNum)
        }
    }
    render() {
        const {adminBlog} = this.props;
        const keys = adminBlog.map(v => Object.keys(v));
        const columns = keys && keys[0] ? keys[0].map(v => (
            v === 'title' ?
                {
                    title: v, dataIndex: v, render: (text,row,index) =>
                        <HashRouter>
                            <Link to={`/AdminDetail/${row.id}`}>{text}</Link>
                        </HashRouter>
                } :
                {title: v, dataIndex: v}
        )) : []
        const total = this.props.total&&this.props.total[0]&&this.props.total[0].total? this.props.total[0].total : 0;
        const data = adminBlog.map((v, i) => Object.assign({}, v, {key: i},{createTime:formatTime(v.createTime)}))

        function onChange(pagination, filters, sorter) {
            console.log('params', pagination, filters, sorter);
        }

        function onClick(pagination, filters, sorter) {
            console.log('onClick', pagination, filters, sorter);
        }

        function callback(key) {
            console.log(key);
        }

        return (
            <div className="Admin">
                <Header/>

                <Layout>
                    <Content style={{padding: '0 50px', marginTop: 64}}>
                        <TopTips/>
                        <Search placeholder="input search text" onSearch={this.onSearch.bind(this)} enterButton="Search" size="large" />
                        <div style={{background: '#fff', padding: 24, minHeight: 380}}>
                            <Tabs defaultActiveKey="1" onChange={callback}>
                                <TabPane tab="文章管理" key="1">
                                    <Table
                                        bordered={true}
                                        columns={columns}
                                        dataSource={data}
                                        pagination={false}
                                        onChange={onChange}
                                        onRow={(record) => {
                                            return {
                                                onClick: () => {
                                                    console.log(record)
                                                },       // 点击行
                                                onMouseEnter: () => {
                                                },  // 鼠标移入行
                                            };
                                        }}
                                    />
                                    <Pagination

                                        defaultCurrent={this.state.currentPage}
                                        total={total} itemRender={this.itemRender.bind(this)} onChange={this.onChange.bind(this)} />
                                </TabPane>
                                <TabPane tab="留言管理" key="2">Content of Tab Pane 2</TabPane>
                                <TabPane tab="浏览记录" key="3">Content of Tab Pane 3</TabPane>
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
        adminBlog: state.adminBlog,
        total:state.total
    }
}
export default connect(select)(Admin);
