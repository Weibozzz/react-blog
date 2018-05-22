import React from 'react';
import ReactDOM from 'react-dom';
import LzEditor from 'react-lz-editor'
class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            htmlContent: `<h1>Yankees, Peeking at the Red Sox, Will Soon Get an Eyeful</h1>
                <p>Whenever Girardi stole a glance, there was rarely any good news for the Yankees. While Girardi’s charges were clawing their way to a split of their four-game series against the formidable Indians, the Boston Red Sox were plowing past the rebuilding Chicago White Sox, sweeping four games at Fenway Park.</p>`,
            markdownContent: "## HEAD 2 \n markdown examples \n ``` welcome ```",
            responseList: [],
            responseList2: [],
        }
        this.receiveHtml=this.receiveHtml.bind(this);
        this.receiveMarkdown=this.receiveMarkdown.bind(this);
    }
    receiveHtml(content) {
        console.log("recieved HTML content", content);
        this.setState({responseList:[]});
    }
    receiveMarkdown(content) {
        console.log("recieved HTML content", content);
        this.setState({responseList2:[]});
    }
    render() {
        let policy = "";
        const uploadProps = {
            action: "http://v0.api.upyun.com/devopee",
            onChange: this.onChange,
            listType: 'picture',
            fileList: this.state.responseList,
            data: (file) => {

            },
            multiple: true,
            beforeUpload: this.beforeUpload,
            showUploadList: true
        }
        return (
            <div>
                <div>Editor demo 1 (use default html format ):
                </div>
                <LzEditor active={true} importContent={this.state.htmlContent} cbReceiver={this.receiveHtml}
                          lang="en"/>
                <br/>
                <div>Editor demo 2 (use markdown format ):
                </div>
                <LzEditor
                    active={true}
                    importContent={this.state.markdownContent}
                    cbReceiver={this.receiveMarkdown}
                    image={true}
                    video={false}
                    audio={false}
                    uploadProps={uploadProps}
                    convertFormat="markdown"/>
            </div>
        );
    }
}
export default Test;