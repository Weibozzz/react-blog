const router = require('koa-router')()

const dbUntil = require('../until/db_until');
const {
    querySql,
    getBlogSql,
    getDetailSql,
    getTotalSql,
    getURLParameters
} =dbUntil;



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

module.exports = router
