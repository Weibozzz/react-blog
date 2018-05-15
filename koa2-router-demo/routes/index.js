const router = require('koa-router')()

const {
    querySql,
    getBlogSql,
    getDetailSql,
    getTotalSql,
    getURLParameters
} =require('../until/frontEnd');
const {
    getAdminBlogSql
} =require('../until/backEnd');



router.get('/getBlog', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let {num, pageNum} = getURLParameters(ctx.originalUrl)
    let startIndex = pageNum * (num - 1)
    await querySql(getBlogSql(startIndex,pageNum)).then((data) => {
        ctx.body = data
    })
})
router.get('/total', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    await querySql(getTotalSql()).then((data) => {
        ctx.body = data
    })
})
router.get('/detail', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let {id} = getURLParameters(ctx.originalUrl)
    await querySql(getDetailSql(id)).then((data) => {
        ctx.body = data
    })
})
router.get('/getAdminBlog', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let {num} = getURLParameters(ctx.originalUrl);
    await querySql(getAdminBlogSql(num)).then((data) => {
        ctx.body = data
    })
})

module.exports = router
