
export const TEST_ASYNC = 'TEST_ASYNC';
export const GET_TOTAL = 'GET_TOTAL';
export const GET_DETAIL = 'GET_DETAIL';

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
    return {
        type:GET_DETAIL,
        data
    }
};