module.exports = app => {
  const {router, controller} = app;
  router.get('/admin/getArticleList', controller.admin.index.getArticleList)
} 