
const {querySql,getURLParameters} = require('../common')

const getAdminBlogSql=(type,startIndex,pageNum,wd)=>{
    if(type === "all"){
        return  "select `id`,`title`,`user`,`createTime`,`visitor`,`like`,`img`,`recommend` from article2" +
            " order by concat(modifyCount,createTime) desc limit "+startIndex+","+pageNum+"";
    }else if(type === "title"){
        return "select `id`,`title`,`user`,`createTime`,week,`visitor`,`like`,`img`,`type` from article2" +
            " where title like '%"+decodeURIComponent(wd)+"%' order by concat(modifyCount,createTime)  desc limit "+startIndex+","+pageNum+"";
    }else{
        return  "select `id`,`title`,`user`,`createTime`,week,`visitor`,`like`,`img`,`type` from article2" +
            " where type='"+type+"' order by concat(modifyCount,createTime)  desc limit "+startIndex+","+pageNum+"";
    }
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