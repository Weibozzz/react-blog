const router = require('koa-router')()

const {
  querySql,
  getBlogSql,
  getDetailSql,
  getTotalSql,
  postArticleSql,
  getCommentsSql,
  getCommentsTotalSql,
  getLifeSql,
  getNextIdSql,
  getLastIdSql,
  postCommentsSql
} = require('../sql/frontEnd');
const {
  getAdminBlogSql,
  postAdminDetailSql,
  getAdminCommentsSql
} = require('../sql/backEnd');
const {
  saveHtml,
  spaceAdd,
  getURLParameters
} = require('../until')


router.get('/api/getAdminComments', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  let {a_id,id} = getURLParameters(ctx.originalUrl)
  if(id!=null){
    await querySql(getAdminCommentsSql(a_id,id))
  }
  await querySql(getAdminCommentsSql(a_id)).then((data) => {
    ctx.body = data
  })
})
router.get('/api/getBlog', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  let {type, num, pageNum, wd} = getURLParameters(ctx.originalUrl)
  if(type==='id'){
    //说明值查询title
    await querySql(getBlogSql(type, num)).then((data) => {
      ctx.body = data
    });
    return

  }
  let startIndex = pageNum * (num - 1)
  await querySql(getBlogSql(type, startIndex, pageNum, wd)).then((data) => {
    ctx.body = data
  })
})
router.get('/api/life', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  await querySql(getLifeSql()).then((data) => {
    ctx.body = data
  })
})
router.get('/api/total', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  let {type, wd} = getURLParameters(ctx.originalUrl)
  await querySql(getTotalSql(type, wd)).then((data) => {
    ctx.body = data
  })
})
router.get('/api/comments', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  let {id} = getURLParameters(ctx.originalUrl)
  await querySql(getCommentsSql(id)).then((data) => {
    ctx.body = data
  })
})
router.get('/api/commentsTotal', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  let {id} = getURLParameters(ctx.originalUrl)
  await querySql(getCommentsTotalSql(id)).then((data) => {
    ctx.body = data
  })
})
router.get('/api/detail', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  let {id} = getURLParameters(ctx.originalUrl)
  await querySql(getDetailSql(id)).then((data) => {
    // console.log(data)
    ctx.body = spaceAdd(data)
    // ctx.body = spaceAdd(data)
  })
})
router.get('/api/lastId', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  let {id} = getURLParameters(ctx.originalUrl)
  let data=await querySql(getLastIdSql(id))
  //说明值查询title
  const titleId = JSON.parse(data);
  if(!titleId.length){
    ctx.body = null
  }else {
    await querySql(getBlogSql('id', titleId[0].id)).then((titleData) => {
      ctx.body = titleData
    });
  }


})
router.get('/api/nextId', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  let {id} = getURLParameters(ctx.originalUrl)
  await querySql(getNextIdSql(id)).then((data) => {
    ctx.body = data
  })
  let data=await querySql(getNextIdSql(id))
  //说明值查询title
  const titleId = JSON.parse(data);
  if(!titleId.length){
    ctx.body = null
  }else {
    await querySql(getBlogSql('id', titleId[0].id)).then((data) => {
      ctx.body = data
    });
  }
})
router.get('/api/getAdminBlog', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  let {type, num, pageNum, wd} = getURLParameters(ctx.originalUrl)
  console.log(wd)
  if(type==='del'){
    console.log(type,num)
    await querySql(getAdminBlogSql(type, num))
    type='all';
    num=1;
    pageNum=10;
  }
  let startIndex = pageNum * (num - 1)
  await querySql(getAdminBlogSql(type, startIndex, pageNum, wd)).then((data) => {
    ctx.body = data
  })
})
router.post('/api/postAdminDetail', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  console.log(ctx.request.body)
  let {id, content} = ctx.request.body
  await querySql(postAdminDetailSql(content, id)).then((data) => {
    ctx.body = data
  })
})
router.post('/api/postComment', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  let {id,nickname,email,website,comment} = ctx.request.body
  await querySql(postCommentsSql(id,nickname,email,website,comment)).then((data) => {
    ctx.body = data
  })
})
router.post('/api/postArticle', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  console.log(ctx.request.body)
  let {title, url, content, user, type, short} = ctx.request.body
  await querySql(postArticleSql(title, url, saveHtml(content), user, type, short)).then((data) => {
    ctx.body = data
  })
})

module.exports = router
