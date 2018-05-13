const router = require('koa-router')()

var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog'
});


router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})
router.post('/post3',  (ctx, next) => {
    console.log(ctx.request.body);
    var json = ctx.req;
    ctx.body = ctx.request.body
})

router.get('/mysql', async (ctx, next) => {
    const test = new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            // Use the connection
            connection.query('SELECT id FROM article2', (error, results, fields) => {
                // And done with the connection.
                resolve(JSON.stringify(results))
                connection.release();
                // Handle error after the release.
                if (error) throw error;
            });
        });
    });
    await test.then((data) => {
        ctx.body = data
    })
})
router.get('/getBlog', async (ctx, next) => {
    const test = new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            // Use the connection
            let sql = "select `id`,`title`,`user`,`createTime`,week,`visitor`,`like`,`img`,`type` from article2 order by createTime desc limit 10";
            connection.query(sql, (error, results, fields) => {
                // And done with the connection.
                resolve(JSON.stringify(results))
                connection.release();
                // Handle error after the release.
                if (error) throw error;
            });
        });
    });
    await test.then((data) => {
        ctx.body = data
    })
})

module.exports = router
