import React, {Component} from 'react';
import {
  Layout, Menu, Breadcrumb, Row, Col, BackTop, Card, Form,
  Input, Tooltip, Cascader, Select,  Checkbox, Button, AutoComplete
} from 'antd';
import {List, Avatar, Icon, Divider} from 'antd';
import {connect} from 'react-redux'
import {getDetail} from '../../actions'
import {formatTime, getArticleInfo, getHtml, OldTime} from '../../until';
import ArticleTitle from '../../components/ArticleTitle';
import TopTips from '../../components/TopTips';
import Loading from '../../components/Loading';
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link
} from 'react-router-dom'
import marked from 'marked'
import {
  getDetailData,
  getLastIdData,
  getLastIdUrl,
  getNextIdUrl,
  getDetailUrl,
  getNextIdData,
  getCommentsData,
  getCommentsUrl,
  postCommentData
} from '../../contains/fontEnd'
import './index.css';


const {Content} = Layout;

var html2markdown = require('html2markdown');
const FormItem = Form.Item;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;


class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lastArticleTitle: '上一篇文章',
      nextArticleTitle: '下一篇文章',
      confirmDirty: false,
      autoCompleteResult: [1,2],
    }
  }

  componentWillMount() {
    let {id} = this.props.match.params;
    this.props.dispatch(getDetailData(`${getDetailUrl}?id=${id}`))
    this.props.dispatch(getCommentsData(`${getCommentsUrl}?id=${id}`))
    this.props.dispatch(getLastIdData(`${getLastIdUrl}?id=${id}`))
    this.props.dispatch(getNextIdData(`${getNextIdUrl}?id=${id}`))
  }


  handleSubmit = (e) => {
    e.preventDefault();
    let {id} = this.props.match.params;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {comment,email,nickname,website} = values;
        console.log('Received values of form: ', values);

        console.log({id,comment,email,nickname,website})
        console.log(this)
        this.props.dispatch(postCommentData({id,comment,email,nickname,website}))
      }
    });
  }
  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({autoCompleteResult});
  }

  render() {

    const {nextId, lastId} = this.props;
    let {
      content,
      createTime,
    } = getArticleInfo(this.props.detail);

    const {getFieldDecorator} = this.props.form;
    const {autoCompleteResult} = this.state;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
    return (
      <div className="Detail">
        <Loading data={this.props.detail}/>
        <Layout>
          <Content style={{padding: '0 50px'}}>
            <div style={{background: '#fff', padding: 24, minHeight: 380}}>
              <ArticleTitle {...this.props} />
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    createTime > OldTime ?
                      marked(getHtml(decodeURIComponent(content), createTime), {breaks: true})
                      : getHtml(decodeURIComponent(content), createTime)
                }}
              ></div>
              {
                lastId && lastId.map(v =>
                  <div key={v.id}>
                    <Link to={`/Detail/${v.id}`}>
                      上一篇：
                      {v.title}
                    </Link>
                  </div>
                )
              }
              {
                nextId && nextId.map(v =>
                  <div key={v.id}>
                    <Link to={`/Detail/${v.id}`}>
                      下一篇：
                      {v.title}
                    </Link>
                  </div>
                )
              }
            </div>
            <div className="comments-content">
              <h2>发表评论：</h2>
              <Row>
                <Col span={8}>
                  <Form onSubmit={this.handleSubmit}>
                    <FormItem
                      {...formItemLayout}
                      label={(
                        <span>
              Nickname&nbsp;
                          <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
                      )}
                    >
                      {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="E-mail"
                    >
                      {getFieldDecorator('email', {
                        rules: [{
                          type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                          required: false, message: 'Please input your E-mail!',
                        }],
                      })(
                        <Input/>
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="Website"
                    >
                      {getFieldDecorator('website', {
                        rules: [{required: false, message: 'Please input website!'}],
                      })(
                        <AutoComplete
                          dataSource={websiteOptions}
                          onChange={this.handleWebsiteChange}
                          placeholder="website"
                        >
                          <Input/>
                        </AutoComplete>
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="comment"
                    >
                      {getFieldDecorator('comment', {
                        rules: [ {
                          required: true, message: 'Please input your E-mail!',
                        }],
                      })(
                        <TextArea/>
                      )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                      <Button type="primary" htmlType="submit">提交评论</Button>
                    </FormItem>
                  </Form>
                </Col>
              </Row>
            </div>
            <div style={{display: this.props.comments.length ? 'block' : 'none'}}>
              {
                this.props.comments.map((v, i) =>
                  (
                    <Card
                      bodyStyle={{background: "#f8f8f8"}}
                      key={i} title={
                      <span>
                                                <span style={{color: '#34538b', fontWeight: 'bold'}}>{v.user}</span>
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
        </Layout>
      </div>
    );
  }
}

const select = (state) => {
  console.log(state)
  return {
    detail: state.detail,
    comments: state.comments,
    lastId: state.lastId,
    nextId: state.nextId
  }
}
const WrappedRegistrationForm = Form.create()(Detail);
export default connect(select)(WrappedRegistrationForm);
