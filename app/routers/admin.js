module.exports = app => {
  const {router, controller} = app;
  const checkAuth = app.middleware.checkAuth() // 检查授权
  router.post('/admin/checkLogin', controller.admin.index.checkLogin)
  router.get('/admin/getTypeInfo', checkAuth, controller.admin.index.getTypeInfo)
} 