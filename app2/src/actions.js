
export const TEST_ASYNC = 'TEST_ASYNC';

// 异步请求

export const asyncTest = data =>{
    return {
        type:TEST_ASYNC,
        data
    }
};