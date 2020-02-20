module.exports = app => {
  const {router, controller} = app;
  router.get('/admin/index', controller.admin.index.index)
  router.get('/admin/getArticleList', controller.admin.index.getArticleList)
} 