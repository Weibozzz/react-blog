
export const TEST_ASYNC = 'TEST_ASYNC';
export const GET_TOTAL = 'GET_TOTAL';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_ADMIN_BLOG = 'GET_ADMIN_BLOG';

export const POST_ADMIN_DETAIL = 'POST_ADMIN_DETAIL';


// 异步请求

export const asyncTest = data =>{
    return {
        type:TEST_ASYNC,
        data
    }
};
export const getTotal = data =>{
    return {
        type:GET_TOTAL,
        data
    }
};
export const getDetail = data =>{
    console.log(data)
    return {
        type:GET_DETAIL,
        data
    }
};
export const getAdminBlog = data =>{
    return {
        type:GET_ADMIN_BLOG,
        data
    }
};
export const postAdminDetail = data =>{
    return {
        type:POST_ADMIN_DETAIL,
        data
    }
};