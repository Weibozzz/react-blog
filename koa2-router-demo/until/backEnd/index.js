
const {querySql,getURLParameters} = require('../common')

const getAdminBlogSql=(startIndex,pageNum)=>{
    return "select `id`,`title`,`user`,`createTime`,`visitor`,`like`,`img`,`recommend` from article2" +
        " order by concat(modifyCount,createTime) desc limit "+startIndex+","+pageNum+"";
}
const postAdminDetailSql=(content,id)=>{
    return "update `article2` set content='"+content+"' where `id`='"+id+"'";
}



module.exports = {
    querySql,
    getAdminBlogSql,
    postAdminDetailSql,
    getURLParameters
}