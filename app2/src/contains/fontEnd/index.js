import axios from 'axios';
import {asyncTest, getDetail, getTotal, postAdminDetail, postArticle,getLife} from '../../actions'
import {domain} from '../common';
var qs = require("qs");
export const getBlogUrl = domain+'/getBlog'
export const getTotalUrl = domain+'/total'
export const getLifeUrl = domain+'/life'
export const getDetailUrl = domain+'/detail'
export const postArticleUrl = domain+'/postArticle'

export const getBlogData = url=>{
    return dispatch => {
        axios.get(url).then(res => {
            dispatch(asyncTest(res.data))
        })
    }
}
export const getTotalData =(url)=> {
    return dispatch => {
        axios.get(url).then(res => {
            dispatch(getTotal(res.data))
        })
    }
}
export const getLifeData =(url)=> {
    return dispatch => {
        axios.get(url).then(res => {
            dispatch(getLife(res.data))
        })
    }
}
export const getDetailData= (url)=> {
    return dispatch => {
        axios.get(url).then(res => {
            dispatch(getDetail(res.data))
        })
    }
}
export const postArticleData = (url,data)=>{
    return dispatch => {
        axios({
            method: 'POST',
            url,
            data:qs.stringify(data),
            headers: {"Content-Type": "application/x-www-form-urlencoded",},

        }).then(res => {
            dispatch(postArticle(res.data))
        })
    }
}
export const _getTotalData= (_this,url,type,val)=> {
    return val
        ? _this.props.dispatch(getTotalData(`${url}?type=${type}&wd=${val}`))
        :_this.props.dispatch(getTotalData(`${url}?type=${type}`))
}

export const _getBlogData= (_this,url,type,num,pageNum,val)=> {
    return val
        ?_this.props.dispatch(getBlogData(`${url}?type=${type}&num=${num}&pageNum=${pageNum}&wd=${val}`))
        :_this.props.dispatch(getBlogData(`${url}?type=${type}&num=${num}&pageNum=${pageNum}`))
}

