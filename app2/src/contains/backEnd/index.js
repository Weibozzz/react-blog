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
