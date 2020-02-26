'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {

  async checkLogin() {
    const { ctx } = this;
    console.log(ctx.request.body)
    let userName = ctx.request.body.userName, password = ctx.request.body.password;
    const sql = `SELECT userName FROM admin_user WHERE userName = '${userName}' AND password = '${password}' `
    const result = await this.app.mysql.query(sql)
    if (result.length > 0) {
      // 查到了，代表登陆成功
      let openId = new Date().getTime()
      ctx.session.openId = { openId }
      ctx.body = {
        success: true,
        message: '登陆成功',
        openId
      }
    } else {
      ctx.session = null;
      ctx.body = {
        success: false,
        message: '登陆失败'
      }
    }
  }

  async getTypeInfo() {
    const { ctx } = this;
    const resType = await this.app.mysql.select('type')
    ctx.body = {
      success: true,
      data: resType
    }
  }
}

module.exports = AdminController;
