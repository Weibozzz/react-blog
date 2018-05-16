
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
    let cteateTime = Date.now();
    return "insert into article2(title,url,content,createTime,user,`type`,img,short,week) " +
        "values('"+title+"','"+url+"','"+content+"','"+cteateTime+"','"+user+"','"+type+"','"+short+"')";
}


module.exports = {
    querySql,
    getBlogSql,
    getDetailSql,
    getTotalSql,
    postArticleSql,
    getURLParameters
}