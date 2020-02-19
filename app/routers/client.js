module.exports = app => {
  const {router, controller} = app;
  router.get('/client/index', controller.client.index.index)
} 