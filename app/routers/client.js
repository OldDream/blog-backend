module.exports = app => {
  const { router, controller } = app;
  router.get('/client/getArticleList', controller.client.index.getArticleList)
  router.get('/client/getArticleById', controller.client.index.getArticleById)
} 