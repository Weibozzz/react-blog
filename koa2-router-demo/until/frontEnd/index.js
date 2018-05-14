
const {querySql,getURLParameters} = require('../common')

const getBlogSql=(startIndex,pageNum)=>{
    return "select `id`,`title`,`user`,`createTime`,week,`visitor`,`like`,`img`,`type` from article2 order by " +
        "createTime desc limit "+startIndex+","+pageNum+"";
}
const getDetailSql=(id)=>{
    return "select * from article2 where id="+id+"";
}
const getTotalSql=()=>{
    return "select count(*) as 'total' from article2";
}


module.exports = {
    querySql,
    getBlogSql,
    getDetailSql,
    getTotalSql,
    getURLParameters
}