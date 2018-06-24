const {querySql, getURLParameters} = require('../common')

const getBlogSql = (type, startIndex, pageNum, wd) => {
  if (type === "all") {
    return "select `id`,`title`,`user`,`createTime`,week,`visitor`,`like`,`img`,`type` from article2 order by " +
      "createTime desc limit " + startIndex + "," + pageNum + "";
  } else if (type === "title") {
    return "select `id`,`title`,`user`,`createTime`,week,`visitor`,`like`,`img`,`type` from article2" +
      " where title like '%" + decodeURIComponent(wd) + "%' order by createTime desc limit " + startIndex + "," + pageNum + "";
  } else if(type==='id') {
    console.log(startIndex)
    return "select id,title from article2 where id="+startIndex;
  }
  else {
    return "select `id`,`title`,`user`,`createTime`,week,`visitor`,`like`,`img`,`type` from article2" +
      " where type='" + type + "' order by createTime desc limit " + startIndex + "," + pageNum + "";
  }

}
const getDetailSql = (id) => {
  return "select * from article2 where id=" + id + "";
}
// 上一篇文章id
const getLastIdSql = (currentId) => {
  return 'select id from article2  where id < ' + currentId + ' order by id desc limit 1 '
}
// 下一篇文章id
const getNextIdSql = (currentId) => {
  return 'select id from article2  where id > ' + currentId + ' order by id asc limit 1 '
}
const getCommentsSql = (a_id) => {
  return "select * from comment where `a_id`='" + a_id + "' order by createTime desc";
}
const postCommentsSql = (a_id,user,email,website,msg) => {
  let createTime = Date.now() / 1000 | 0;
  return "insert into comment(a_id,`user`,email,website,msg,createTime) " +
  "values('" + a_id + "','" + user + "','" + email+ "','" + website + "','" + msg + "','" + createTime+"')";
}
const getCommentsTotalSql = (a_id) => {
  return "select count(*) as 'total' from comment where a_id = " + a_id + ";";
}
const getLifeSql = () => {
  return "select `id`,`title`,`user`,`createTime`,`visitor`,`like`,`img`,`type`,`short` from article2" +
    " where `type`='interesting' or `type`='fight' order by createTime";
}
const getTotalSql = (type, wd) => {
  if (type === "all") {
    return "select count(*) as 'total' from article2";
  } else if (type === "title") {
    return "select count(*) as 'total' from article2 where title like '%" + wd + "%'";
  } else {
    return "select count(*) as 'total' from article2 where type='" + type + "'";
  }

}

const postArticleSql = (title, url, content, user, type, short) => {
  let createTime = Date.now() / 1000 | 0;
  return "insert into article2(title,url,content,createTime,user,`type`,short) " +
    "values('" + title + "','" + url + "','" + content + "','" + createTime + "','" + user + "','" + type + "','" + short + "')";
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
  getURLParameters,
  getLastIdSql,
  getNextIdSql,
  postCommentsSql
}