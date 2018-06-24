import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Row, Col, Pagination, Input} from 'antd';
import {List, Avatar, Icon} from 'antd';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {Tabs} from 'antd';
import {Table} from 'antd';
import {connect} from 'react-redux';
import {
  getAdminBlogData,
  getAdminBlogUrl,
  _getAdminBlogData,
  _getAdminCommentsData,
  getAdminCommentsUrl
} from '../../contains/backEnd';
import {_getTotalData, getTotalUrl} from '../../contains/fontEnd'
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link
} from 'react-router-dom'
import TopTips from '../../components/TopTips';
import {formatTime} from '../../until';
import Loading from '../../components/Loading';

const TabPane = Tabs.TabPane;
const {Content} = Layout;
const Search = Input.Search;

class Admin extends Component {

  constructor() {
    super()
    this.state = {
      pageNum: 10,
      currentPage: 1,
      inputVal: ''
    }
  }

  componentWillMount() {
    _getAdminBlogData(this, 'all', 1, this.state.pageNum)
    _getAdminCommentsData(this, 'all')
    _getTotalData(this, 'all')
  }

  itemRender(current, type, originalElement) {
    if (type === 'prev') {
      return <a>Previous</a>;
    } else if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  }

  onChange(page, pageSize) {

    this.setState({
      currentPage: page
    })
    this.state.inputVal
      ? _getAdminBlogData(this, 'title', page, this.state.pageNum, this.state.inputVal)
      : _getAdminBlogData(this, 'all', page, this.state.pageNum)
  }

  onSearch(val) {
    this.setState({
      inputVal: val,
      currentPage: 1
    })
    if (val) {
      _getAdminBlogData(this, 'title', 1, this.state.pageNum, val)
      _getTotalData(this, 'title', val);
    } else {
      _getTotalData(this, 'all');
      _getAdminBlogData(this, 'all', 1, this.state.pageNum)
    }
  }
  handleDelComment(id){
    _getAdminCommentsData(this, 'all',id)
  }
  handleDelArticle(id){

    _getAdminBlogData(this, 'del', id)
  }
  render() {
    const {adminBlog,adminComments} = this.props;
    const keys = adminBlog.map(v => ([...Object.keys(v),'操作']));
    const CommentKeys = adminComments.map(v => ([...Object.keys(v),'操作']));
    const columns = keys && keys[0] ? keys[0].map(v => (
      v === 'title' ?
        {
          title: v, dataIndex: v, render: (text, row, index) =>
          <Link to={`/AdminDetail/${row.id}`}>{text}</Link>
        } :
        v==='操作'?
          {
            title: v, dataIndex: v, render: (text, row, index) =>
            <a href="javascript:;" onClick={this.handleDelArticle.bind(this,row.id)} >删除</a>
          }:
        {title: v, dataIndex: v}
    )) : [];
    const CommentsColumns = CommentKeys && CommentKeys[0] ? CommentKeys[0].map(v => (
      v === 'a_id' ?
        {
          title: v, dataIndex: v, render: (text, row, index) =>
          <Link to={`/Detail/${row.a_id}`}>{text}</Link>
        } :
        v==='操作'?
          {
            title: v, dataIndex: v, render: (text, row, index) =>
            <a href="javascript:;" onClick={this.handleDelComment.bind(this,row.id)} >删除</a>
          }:
        {title: v, dataIndex: v}
    )) : [];
    const total = this.props.total && this.props.total[0] && this.props.total[0].total ? this.props.total[0].total : 0;
    const data = adminBlog.map((v, i) => Object.assign({}, v, {key: i}, {createTime: formatTime(v.createTime)}))
    const CommentsData = adminComments.map((v, i) => Object.assign({}, v, {key: i}, {createTime: formatTime(v.createTime)}))

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
        <Loading data={this.props.adminBlog}/>
        <Layout>
          <Content style={{padding: '0 50px'}}>
            <Search placeholder="input search text" onSearch={this.onSearch.bind(this)} enterButton="Search"
                    size="large"/>
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
                    total={total} itemRender={this.itemRender.bind(this)} onChange={this.onChange.bind(this)}/>
                </TabPane>
                <TabPane tab="留言管理" key="2">

                  <Table
                    bordered={true}
                    columns={CommentsColumns}
                    dataSource={CommentsData}
                    pagination={false}
                  />
                </TabPane>
                <TabPane tab="浏览记录" key="3">Content of Tab Pane 3</TabPane>
              </Tabs>
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

const select = (state) => {
  console.log(state)
  return {
    adminBlog: state.adminBlog,
    total: state.total,
    adminComments:state.adminComments
  }
}
export default connect(select)(Admin);
