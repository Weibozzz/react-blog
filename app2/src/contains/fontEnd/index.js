import axios from 'axios';
import { asyncTest, getDetail, getTotal } from '../../actions'
import {domain} from '../common';
export const getBlogUrl = domain+'/getBlog'
export const getTotalUrl = domain+'/total'
export const getDetailUrl = domain+'/detail'


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
export const getDetailData= (url)=> {
    return dispatch => {
        axios.get(url).then(res => {
            dispatch(getDetail(res.data))
        })
    }
}
