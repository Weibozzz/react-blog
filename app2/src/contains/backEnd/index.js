import axios from 'axios';
import { getAdminBlog,postAdminDetail} from '../../actions'

import {domain} from '../common';
export const getAdminBlogUrl = domain+'/getAdminBlog'
export const postAdminDetailUrl = domain+'/postAdminDetail'


export const getAdminBlogData = url=>{
    return dispatch => {
        axios.get(url).then(res => {
            dispatch(getAdminBlog(res.data))
        })
    }
}
export const postAdminDetailData = (url,data)=>{
    return dispatch => {
        axios.post(url,JSON.stringify(data)).then(res => {
            dispatch(postAdminDetail(res.data))
        })
    }
}

export const _getAdminBlogData= (_this,url,type,num,pageNum,val)=> {
    return val
        ?_this.props.dispatch(getAdminBlogData(`${url}?type=${type}&num=${num}&pageNum=${pageNum}&wd=${val}`))
        :_this.props.dispatch(getAdminBlogData(`${url}?type=${type}&num=${num}&pageNum=${pageNum}`))
}