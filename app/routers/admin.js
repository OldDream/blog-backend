module.exports = app => {
  const {router, controller} = app;
  const checkAuth = app.middleware.checkAuth() // 检查授权
  router.post('/admin/checkLogin', controller.admin.index.checkLogin)
  router.post('/admin/addOrEditArticle', checkAuth, controller.admin.index.addOrEditArticle)
  router.get('/admin/getTypeInfo', checkAuth, controller.admin.index.getTypeInfo)
  router.get('/admin/getArticleList', checkAuth, controller.admin.index.getArticleList)
  router.delete('/admin/deleteArticle/:id', checkAuth, controller.admin.index.deleteArticle)
}