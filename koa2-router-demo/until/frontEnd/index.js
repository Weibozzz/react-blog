
const {querySql,getURLParameters} = require('../common')

const getBlogSql=(type,startIndex,pageNum,wd)=>{
    if(type === "all"){
        return "select `id`,`title`,`user`,`createTime`,week,`visitor`,`like`,`img`,`type` from article2 order by " +
            "createTime desc limit "+startIndex+","+pageNum+"";
    }else if(type === "title"){
        console.log(wd)
        return "select `id`,`title`,`user`,`createTime`,week,`visitor`,`like`,`img`,`type` from article2" +
            " where title like '%"+decodeURIComponent(wd)+"%' order by createTime desc limit "+startIndex+","+pageNum+"";
    }else{
        return  "select `id`,`title`,`user`,`createTime`,week,`visitor`,`like`,`img`,`type` from article2" +
            " where type='"+type+"' order by createTime desc limit "+startIndex+","+pageNum+"";
    }

}
const getDetailSql=(id)=>{
    return "select * from article2 where id="+id+"";
}
const getCommentsSql=(a_id)=>{
    return "select * from comment where `a_id`='"+a_id+"' order by createTime desc";
}
const getCommentsTotalSql=(a_id)=>{
    return "select count(*) as 'total' from comment where a_id = "+a_id+";";
}
const getLifeSql=()=>{
    return "select `id`,`title`,`user`,`createTime`,`visitor`,`like`,`img`,`type`,`short` from article2" +
        " where `type`='interesting' or `type`='fight' order by createTime";
}
const getTotalSql=(type,wd)=>{
    if(type === "all"){
        return "select count(*) as 'total' from article2";
    }else if(type === "title"){
        return "select count(*) as 'total' from article2 where title like '%"+wd+"%'";
    }else{
        return "select count(*) as 'total' from article2 where type='"+type+"'";
    }

}

const postArticleSql =(title,url,content,user,type,short)=>{
    let cteateTime = Date.now()/1000|0;
    return "insert into article2(title,url,content,createTime,user,`type`,short) " +
        "values('"+title+"','"+url+"','"+content+"','"+cteateTime+"','"+user+"','"+type+"','"+short+"')";
}


module.exports = {
    querySql,
    getBlogSql,
    getDetailSql,
    getLifeSql,
    getTotalSql,
    postArticleSql,
    getCommentsSql,
    getCommentsTotalSql,
    getURLParameters
}