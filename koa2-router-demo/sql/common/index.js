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

module.exports = {
    querySql
}