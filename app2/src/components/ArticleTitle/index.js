import React,{Component} from 'react';
import { List, Avatar, Icon ,Divider} from 'antd';
import {formatTime,getArticleInfo} from '../../until';

class ArticleTitle extends Component{

    constructor() {
        super()
        this.state = {
        }
    }


    render(){
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
        }=getArticleInfo(this.props.detail);

        return (

            <div>
                <h2>{title}</h2>
                <ul className="clearfix detail-info" >
                    <li className="fl">发布时间：{formatTime(createTime)}</li>
                    <li className="fl">作者：{user}</li>
                    <li className="fl">浏览次数：{visitor}</li>
                    <li className="fl">最后修改：{formatTime(lastModify)}</li>
                    <li className="fl">修改次数：{modifyCount}</li>
                </ul>
                <Divider/>
            </div>
        )
    }
}

export default ArticleTitle