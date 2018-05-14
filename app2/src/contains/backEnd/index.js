import axios from 'axios';
import { getAdminBlog} from '../../actions'

import {domain} from '../common';
export const getAdminBlogUrl = domain+'/getAdminBlog'


export const getAdminBlogData = url=>{
    return dispatch => {
        axios.get(url).then(res => {
            dispatch(getAdminBlog(res.data))
        })
    }
}
