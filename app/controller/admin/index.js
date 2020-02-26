'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {

  async getArticleList() {
    const { ctx } = this;
    const sql = `SELECT article.id as id,
      article.title as title,
      article.introduction as introduction,
      FROM_UNIXTIME(article.created_time,'%Y-%m-%d %H:%i:%s') as created_time,
      article.view_count as view_count,
      type.typeName as typeName FROM article LEFT JOIN type ON article.type_id = type.id`

    const result = await this.app.mysql.query(sql)
    ctx.body = {
      data: result
    }
  }

  async ckeckLogin() {
    const { ctx } = this;
    let userName = ctx.request.body.userName, password = ctx.request.body.password;
    const sql = `SELECT userName from admin_user WHERE userName = ${userName} AND password = ${password} `
    const result = await this.app.mysql.query(sql)
    if (result.length > 0) {
      // 查到了，代表登陆成功
      let openId = new Date().getTime()
      ctx.session.openId = { openId }
      ctx.body={
        data: '登陆成功',
        openId
      }
    } else {
      ctx.body={
        data: '登陆失败'
      }
    }
  }
}

module.exports = AdminController;
