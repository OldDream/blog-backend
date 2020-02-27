'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  // 后台登录接口
  async checkLogin() {
    const { ctx } = this;
    // console.log(ctx)
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

  // 获取文章分类信息
  async getTypeInfo() {
    const { ctx } = this;
    const resType = await this.app.mysql.select('type')
    ctx.body = {
      success: true,
      data: resType
    }
  }

  // 保存文章（含草稿？）
  async addOrEditArticle() {
    const { ctx } = this;
    let tempArticle = ctx.request.body
    let result = null
    if (tempArticle.id) { // 编辑文章
      result = await this.app.mysql.update('article', tempArticle)
    } else { // 添加文章
      result = await this.app.mysql.insert('article', tempArticle)
    }
    const success = result.affectedRows === 1
    const insertId = result.insertId
    if (success) {
      ctx.body = {
        success: true,
        message: '操作成功',
        data: {
          id: insertId
        }
      }
    } else {
      ctx.body = {
        success: false,
        message: '插入失败'
      }
    }
  }
}

module.exports = AdminController;
