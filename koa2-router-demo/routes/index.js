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
    let {num, pageNum} = getURLParameters(ctx.originalUrl)
    let startIndex = pageNum * (num - 1)
    await querySql(getAdminBlogSql(startIndex,pageNum)).then((data) => {
        ctx.body = data
    })
})
router.post('/postAdminDetail',async  (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    console.log(Object.keys(ctx.request.body)[0])
    console.log(ctx.request.body)
    let {id,content}=JSON.parse(Object.keys(ctx.request.body)[0])
    console.log(content,id)
    await querySql(postAdminDetailSql(content,id)).then((data) => {
        ctx.body = data
    })
})

module.exports = router
