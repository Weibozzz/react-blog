const {querySql, getURLParameters} = require('../common')

const getAdminBlogSql = (type, startIndex, pageNum, wd) => {
  if (type === "all") {
    return "select `id`,`title`,`user`,`createTime`,`visitor`,`like`,`img`,`recommend` from article2" +
      " order by createTime desc limit " + startIndex + "," + pageNum + "";
    // " order by concat(modifyCount,createTime) desc limit "+startIndex+","+pageNum+"";
  } else if (type === "title") {
    return "select `id`,`title`,`user`,`createTime`,week,`visitor`,`like`,`img`,`type` from article2" +
      " where title like '%" + decodeURIComponent(wd) + "%' order by createTime desc limit " + startIndex + "," + pageNum + "";
    // " where title like '%"+decodeURIComponent(wd)+"%' order by concat(modifyCount,createTime)  desc limit "+startIndex+","+pageNum+"";
  } else if(type==='del'){
    return "delete from article2 where id="+startIndex
  }

  else {
    return "select `id`,`title`,`user`,`createTime`,week,`visitor`,`like`,`img`,`type` from article2" +
      " where type='" + type + "' order by concat(modifyCount,createTime)  desc limit " + startIndex + "," + pageNum + "";
  }
}
const postAdminDetailSql = (content, id) => {
  return "update `article2` set content='" + content + "' where `id`='" + id + "'";
}
const getAdminCommentsSql = (a_id, id) => {
  if (a_id === 'all') {
    return id==null?
      "select * from comment  order by createTime desc "
      :"delete from comment where id= " + id;
  } else {
    return "select * from comment where `a_id`=" + a_id + " order by createTime desc ";
  }
}


module.exports = {
  querySql,
  getAdminBlogSql,
  postAdminDetailSql,
  getURLParameters,
  getAdminCommentsSql

}