module.exports = app => {
  const {router, controller} = app;
  const checkAuth = app.middleware.checkAuth()
  router.get('/admin/getArticleList', controller.admin.index.getArticleList)
  router.post('/admin/ckeckLogin', controller.admin.index.ckeckLogin)
} 