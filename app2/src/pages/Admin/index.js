import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Row, Col,Pagination} from 'antd';
import {List, Avatar, Icon} from 'antd';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {Tabs} from 'antd';
import {Table} from 'antd';
import {connect} from 'react-redux';
import {getAdminBlogData, getAdminBlogUrl} from '../../contains/backEnd';
import {getTotalData,getTotalUrl} from '../../contains/fontEnd'
import {
    BrowserRouter as Router,
    HashRouter,
    Route,
    Link
} from 'react-router-dom'

const TabPane = Tabs.TabPane;
const {Content} = Layout;

class Admin extends Component {

    constructor (){
        super()
        this.state={
            pageNum:10
        }
    }
    componentWillMount() {
        console.log(this.props)
        this.props.dispatch(getAdminBlogData(`${getAdminBlogUrl}?num=1&pageNum=${this.state.pageNum}`))
        this.props.dispatch(getTotalData(getTotalUrl))
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

        console.log(page,pageSize)
        this.props.dispatch(getAdminBlogData(`${getAdminBlogUrl}?num=${page}&pageNum=${this.state.pageNum}`))
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
        /*const columns = [{
            title: 'Name',
            dataIndex: 'name',
        }, {
            title: 'Age',
            dataIndex: 'age',
        }, {
            title: 'Address',
            dataIndex: 'address',
        }];*/
        const total = this.props.total&&this.props.total[0]&&this.props.total[0].total? this.props.total[0].total : 0;
        const data = adminBlog.map((v, i) => Object.assign({}, v, {key: i}))
        console.log(data)

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
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
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
                                    <Pagination total={total} itemRender={this.itemRender.bind(this)} onChange={this.onChange.bind(this)} />
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
