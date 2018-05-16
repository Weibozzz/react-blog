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
            markToHtml:''
        }
    }
    componentWillMount(){
        console.log(this.props)
        this.setState({
            markToHtml: this.props.txt,
        })
    }

    onContentChange(e) {
        if(!this.state.isSupport)return;
        console.log(e.target.value)
        let str = marked(e.target.value, {breaks: true});
        this.setState({
            previewContent: str,
            previewHtmlContent:decodeURIComponent(str),
            markToHtml:e.target.value
        })
    }
    onSubmitDetail(){

        let {pathname} = this.props.location;
        let {id} = this.props;
        let txt = this.refs.textHtml.innerText;
        if(/AdminDetail/.test(pathname)){
            message.success('这是修改文章')

            if(txt===''||txt===this.state.txt){
                message.error('不能提交')
                return;
            }
            message.warning('不一定修改成功，待检测')
            this.props.dispatch(postAdminDetailData(postAdminDetailUrl,{content:encodeURIComponent(updateHtml(txt)),id:id}))
        }else if(/PostArticle/.test(pathname)){
            message.success('这是发表文章')
            console.log(this.props)
            let {selectVal,
                titleVal,
                shortVal,
                urlVal}=this.props;
            if(selectVal===''||titleVal===''||shortVal===''||urlVal===''||txt===''){
                message.error('空值不能提交')
                return
            }
            this.props.dispatch(postArticleData(postArticleUrl,{title:titleVal,url:urlVal,content:encodeURIComponent(updateHtml(txt)),user:"测试用户",type:selectVal,short:shortVal}))
        }else {
            message.warning('不知道在做什么文章')
        }
    }
    render(){
        return (

            <div>
                <Tabs>
                    <TabPane tab="marked" key="1">
                        <TextArea rows={15}
                             onInput={this.onContentChange.bind(this)} value={this.state.markToHtml} />
                    </TabPane>
                    <TabPane tab="预览" key="2">
                        <div dangerouslySetInnerHTML={{__html: this.state.previewContent}}></div>
                    </TabPane>
                    <TabPane tab="html" key="3">
                        <Button onClick={this.onSubmitDetail.bind(this)}  type={this.props.isSupport?"primary":"danger"}>修改</Button>
                        <div ref="textHtml">{this.state.previewHtmlContent}</div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
export default connect()(MarkedComponent)