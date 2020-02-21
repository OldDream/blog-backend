module.exports = app => {
  const { router, controller } = app;
  router.get('/client/getArticleList', controller.client.index.getArticleList)
  router.get('/client/getArticleById', controller.client.index.getArticleById) 
  router.get('/client/articleType', controller.client.index.getArticleType) // 获取文章类型，header用
  router.get('/client/getArticleListById', controller.client.index.getArticleListById)
} 