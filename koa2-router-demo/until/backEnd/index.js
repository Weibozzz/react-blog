
const {querySql,getURLParameters} = require('../common')

const getAdminBlog=(nums)=>{
    return "select `id`,`title`,`user`,`createTime`,`visitor`,`like`,`img`,`recommend` from article2 order by concat(modifyCount,createTime) desc limit "+nums+"";
}



module.exports = {
    querySql,
    getAdminBlog,
    getURLParameters
}