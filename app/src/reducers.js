
/*reducer 是纯方法
* 传入旧状态和action
* 返回新状态
*/
import { combineReducers } from 'redux'

// 异步
const testAsync = (state=[],action)=>{
    return ['reducers']
}
// 不同响应合并成一个reducer
const myBlog = combineReducers({
    testAsync,
})

export default myBlog
