
const {querySql,getURLParameters} = require('../common')

const getAdminBlogSql=(nums)=>{
    return "select `id`,`title`,`user`,`createTime`,`visitor`,`like`,`img`,`recommend` from article2 order by concat(modifyCount,createTime) desc limit "+nums+"";
}
const postAdminDetailSql=(content,id)=>{
    return "update `article2` set content="+content+",where `id`="+id+"";
}



module.exports = {
    querySql,
    getAdminBlogSql,
    postAdminDetailSql,
    getURLParameters
}