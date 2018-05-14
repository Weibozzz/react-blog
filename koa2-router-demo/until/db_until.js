const mysql = require('mysql')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog'
})

let querySql = ( sql )=> {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            // Use the connection
            connection.query(sql, (error, results, fields) => {
                // And done with the connection.
                resolve(JSON.stringify(results))
                connection.release()
                // Handle error after the release.
                if (error) throw error
            })
        })
    })
}





let getBlogSql=(startIndex,pageNum)=>{
    return "select `id`,`title`,`user`,`createTime`,week,`visitor`,`like`,`img`,`type` from article2 order by " +
        "createTime desc limit "+startIndex+","+pageNum+"";
}
let getDetailSql=(id)=>{
    return "select * from article2 where id="+id+"";
}
let getTotalSql=()=>{
    return "select count(*) as 'total' from article2";
}
const getURLParameters = url =>
    url.match(/([^?=&]+)(=([^&]*))/g).reduce(
        (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
    )

module.exports = {
    querySql,
    getBlogSql,
    getDetailSql,
    getTotalSql,
    getURLParameters
}