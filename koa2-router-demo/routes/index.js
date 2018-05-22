const router = require('koa-router')()

const {
    querySql,
    getBlogSql,
    getDetailSql,
    getTotalSql,
    postArticleSql,
    getCommentsSql,
    getCommentsTotalSql,
    getURLParameters,
    getLifeSql
} =require('../until/frontEnd');
const {
    getAdminBlogSql,
    postAdminDetailSql
} =require('../until/backEnd');

const saveHtml=str=>{
    return str.replace(/'|"/g,function(str){
        if(str==='"'){
            return '@quot;'
        }else if(str==="'") {
            return '@apos;'
        }
    });
}



router.get('/getBlog', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let {type,num, pageNum,wd} = getURLParameters(ctx.originalUrl)
    let startIndex = pageNum * (num - 1)
    await querySql(getBlogSql(type,startIndex,pageNum,wd)).then((data) => {
        ctx.body = data
    })
})
router.get('/life', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    await querySql(getLifeSql()).then((data) => {
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
router.get('/comments', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let {id} = getURLParameters(ctx.originalUrl)
    await querySql(getCommentsSql(id)).then((data) => {
        ctx.body = data
    })
})
router.get('/commentsTotal', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let {id} = getURLParameters(ctx.originalUrl)
    await querySql(getCommentsTotalSql(id)).then((data) => {
        ctx.body = data
    })
})
const spaceAdd = str=>str&&str.replace(/\+/g,' ')
router.get('/detail', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let {id} = getURLParameters(ctx.originalUrl)
    await querySql(getDetailSql(id)).then((data) => {
        // console.log(data)
        ctx.body = spaceAdd(data)
        // ctx.body = spaceAdd(data)
    })
})
router.get('/getAdminBlog', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let {type,num, pageNum,wd} = getURLParameters(ctx.originalUrl)
    console.log(wd)
    let startIndex = pageNum * (num - 1)
    await querySql(getAdminBlogSql(type,startIndex,pageNum,wd)).then((data) => {
        ctx.body = data
    })
})
router.post('/postAdminDetail',async  (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    console.log(ctx.request.body)
    let {id,content}=ctx.request.body
    await querySql(postAdminDetailSql(content,id)).then((data) => {
        ctx.body = data
    })
})
router.post('/postArticle',async  (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    console.log(ctx.request.body)
    let {title,url,content,user,type,short}=ctx.request.body
    await querySql(postArticleSql(title,url,saveHtml(content),user,type,short)).then((data) => {
        ctx.body = data
    })
})

module.exports = router
