const router = require('koa-router')()

const {
    querySql,
    getBlogSql,
    getDetailSql,
    getTotalSql,
    getURLParameters,
} =require('../until/frontEnd');
const {
    getAdminBlogSql,
    postAdminDetailSql
} =require('../until/backEnd');



router.get('/getBlog', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let {type,num, pageNum,wd} = getURLParameters(ctx.originalUrl)
    let startIndex = pageNum * (num - 1)
    await querySql(getBlogSql(type,startIndex,pageNum,wd)).then((data) => {
        ctx.body = data
    })
})
router.get('/total', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let {type, wd} = getURLParameters(ctx.originalUrl)
    await querySql(getTotalSql(type,wd)).then((data) => {
        ctx.body = data
    })
})
const spaceAdd = str=>str&&str.replace(/\+/g,'&nbsp;')
router.get('/detail', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let {id} = getURLParameters(ctx.originalUrl)
    await querySql(getDetailSql(id)).then((data) => {
        ctx.body = spaceAdd(data)
    })
})
router.get('/getAdminBlog', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let {type,num, pageNum,wd} = getURLParameters(ctx.originalUrl)
    let startIndex = pageNum * (num - 1)
    await querySql(getAdminBlogSql(type,startIndex,pageNum,wd)).then((data) => {
        ctx.body = data
    })
})
router.post('/postAdminDetail',async  (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let {id,content}=JSON.parse(Object.keys(ctx.request.body)[0])
    await querySql(postAdminDetailSql(content,id)).then((data) => {
        ctx.body = data
    })
})

module.exports = router
