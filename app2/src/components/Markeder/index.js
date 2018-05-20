import React,{Component} from 'react';
import {Tabs,Button,Input,message} from 'antd';
import {NbspToSpace, updateHtml} from "../../until";
import {connect} from 'react-redux'
import {getDetailData, getDetailUrl,postArticleData,postArticleUrl} from "../../contains/fontEnd";
import {postAdminDetailData, postAdminDetailUrl} from "../../contains/backEnd";
import marked from 'marked'
var html2markdown = require('html2markdown');
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class MarkedComponent extends Component{

    constructor() {
        super()
        this.state = {
            previewContent: '',
            previewHtmlContent:'',
            txt:'该文档不支持html-to-markdown',
            isSupport:true,
            markToHtml:'',
            markData:'',
            id:null,
            isAdminDetail:false,
            isPostArticle:false,
        }
    }
    componentWillMount(){
        let {content,createTime,id,img, lastModify, like, modifyCount, recommend, short, title, type, url, user, visitor, week} =
            this.props.detail && this.props.detail[0] ? this.props.detail[0] : {};
        let {pathname} = this.props.location;
        if(/AdminDetail/.test(pathname)){
            this.setState({
                isAdminDetail:true,
                isPostArticle:false,
                markData:decodeURIComponent(content),
            })
        }else if(/PostArticle/.test(pathname)){
            this.setState({
                isPostArticle:true,
                isAdminDetail:false,
                markData:'',
            })
        }
    }

    onContentChange(e) {
        if(!this.state.isSupport)return;
        let str = marked(e.target.value, {breaks: true});
        this.setState({
            previewContent: str,
            previewHtmlContent:str,
            markToHtml:e.target.value,
            markData:e.target.value
        })
    }
    onSubmitDetail(){

        let txt = this.refs.textHtml.innerText;
        if(this.state.isAdminDetail){
            let id=/AdminDetail\/(\d+)/.exec(this.props.location.pathname)[1]
            console.log(this.props,id,this.props.location.pathname)
            message.success('这是修改文章')

            if(txt===''||txt===this.state.txt){
                message.error('不能提交')
                return;
            }
            message.warning('不一定修改成功，待检测')
            this.props.dispatch(postAdminDetailData(postAdminDetailUrl,{content:encodeURIComponent(this.state.markData),id:id}))
        }else if(this.state.isPostArticle){
            message.success('这是发表文章')
            let {selectVal,
                titleVal,
                shortVal,
                urlVal}=this.props;
            if(selectVal===''||titleVal===''||shortVal===''||urlVal===''||txt===''){
                message.error('空值不能提交')
                return
            }
            this.props.dispatch(postArticleData(postArticleUrl,{"title":titleVal,"url":urlVal,"content":encodeURIComponent(this.state.markToHtml),
                "user":"刘伟波","type":selectVal,"short":shortVal}))
        }else {
            message.warning('不知道在做什么文章')
        }
    }
    render(){
        console.log(this.state)
        let cont;
        if(this.state.isPostArticle){
            cont=''
        }else if(this.state.isAdminDetail){
            cont=this.props.detail.length?decodeURIComponent(this.props.detail[0].content):'无内容'
        }
        return (

            <div>
                <Tabs>
                    <TabPane tab="预览" key="2">
                        <div dangerouslySetInnerHTML={{__html: this.state.previewContent}}></div>
                    </TabPane>
                    <TabPane tab="html" key="3">
                        <Button onClick={this.onSubmitDetail.bind(this)}  type={this.props.isSupport?"primary":"danger"}>修改</Button>
                        <div ref="textHtml">{this.state.previewHtmlContent}</div>
                    </TabPane>
                    <TabPane tab="marked" key="4">
                        <TextArea rows={15}
                                  onInput={this.onContentChange.bind(this)}
                                  defaultValue={this.props.detail.length?cont:'无内容'} />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
const select = (state) => {
    return {
        detail: state.detail,
    }
}
export default connect(select)(MarkedComponent)