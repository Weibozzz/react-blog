import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd'
import { List, Avatar, Icon,Pagination,Alert,Input,Button   } from 'antd'
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
        // _getBlogData(this,getBlogUrl,'all',1,this.state.pageNum)
        // this.props.dispatch(getBlogData(`${getBlogUrl}?type=all&num=1&pageNum=${this.state.pageNum}`))
        // this.props.dispatch(getTotalData(`${getTotalUrl}?type=all`))
    }
    onChange(page, pageSize){
        console.log(page,pageSize)
        this.setState({
            currentPage:page
        })
        // this.props.dispatch(getBlogData(`${getBlogUrl}?type=all&num=${page}&pageNum=${this.state.pageNum}`))
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

        const listData = []
        this.props.testAsync.forEach((v, i) => {
            let {id, title, createTime, week, visitor, like, img, type, user} = v
            listData.push(
                Object.assign({}, {id, title, createTime, week, visitor, like, img, type, user}, {
                    href: 'http://ant.design',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                })
            )
        })
        /* for (let i = 0; i < 23; i++) {
             listData.push({
                 href: 'http://ant.design',
                 id:i,
                 title: `ant design part ${i}`,
                 avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                 description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                 content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
             });
         }*/

        const IconText = ({type, text}) => (
            <span>
    <Icon type={type} style={{marginRight: 8}}/>
                {text}
  </span>
        )

        return (
            <div className="Blog">
                <Header/>
                <Layout>
                    <Content style={{padding: '0 50px', marginTop: 64}}>
                        <Alert
                            message="博客正在重构和开发中......"
                            type="warning"
                            closable
                            banner={true}
                        />
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={22}>
                                <Search placeholder="input search text" onSearch={this.onSearch.bind(this)} enterButton="Search" size="large" />
                            </Col>
                            <Col className="gutter-row" span={2}>
                                <Button size="large" type="primary">发布文章</Button>
                            </Col>
                        </Row>
                        <div style={{background: '#fff', padding: 24, minHeight: 380}}>
                            <List
                                itemLayout="vertical"
                                size="large"
                                /*pagination={{
                                    onChange: (page) => {
                                        console.log(page)
                                    },
                                    pageSize: 10,
                                }}*/
                                dataSource={listData}
                                footer={<div><b>ant design</b> footer part</div>}
                                renderItem={item => (
                                    <List.Item
                                        key={item.title}
                                        actions={[<IconText type="star-o" text="156"/>,
                                            <IconText type="like-o" text={item.like}/>, <IconText type="message" text="2"/>]}
                                        // extra={<img width={272} alt="logo"
                                        //             src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.avatar}/>}
                                            title={
                                                <HashRouter >
                                                    <div>
                                                        <Link to={`/Detail/${item.id}`}>
                                                            {item.title}
                                                        </Link>
                                                    </div>
                                                </HashRouter>
                                            }
                                            // description={item.description}
                                        />
                                        {/*{item.content}*/}
                                    </List.Item>
                                )}
                            />
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
