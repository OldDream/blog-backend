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

  // 保存文章（含草稿）
  // 草稿待实现
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

  // 删除文章
  async deleteArticle() {
    const { ctx } = this;
    const id = ctx.params.id
    const result = await this.app.mysql.delete('article', { id })
    const success = result.affectedRows === 1
    ctx.body = { success, data: result }
  }

  // 根据id获取文章
  async getArticleById() {
    const { ctx } = this;
    const id = ctx.params.id
    const sql = `SELECT article.id as id,
    article.title as title,
    article.type_id as type_id,
    article.content as content,
    article.introduction as introduction,
    article.created_time as created_time FROM article  WHERE article.id=${id}`

    const result = await this.app.mysql.query(sql)
    ctx.body = {
      success: result.length === 1,
      data: result[0]
    }
  }

  // 获取全部文章
  async getArticleList() {
    const { ctx } = this;
    const sql = `SELECT article.id as id,
      article.title as title,
      article.introduction as introduction,
      FROM_UNIXTIME(article.created_time,'%Y-%m-%d %H:%i:%s') as created_time,
      article.view_count as view_count,
      type.typeName as typeName FROM article LEFT JOIN type ON article.type_id = type.id 
      ORDER BY article.id DESC`

    const result = await this.app.mysql.query(sql)
    ctx.body = {
      data: result
    }
  }
}

module.exports = AdminController;
