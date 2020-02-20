'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async index() {
    const { ctx } = this;
    // let DBresult = await this.app.mysql.get("blog_content", {})
    // console.log(DBresult)
    ctx.body = 'blog admin api'
  }

  async getArticleList() {
    const sql = `SELECT article.id as id,
      article.title as title,
      article.introduction as introduction,
      article.created_time as created_time,
      article.view_count as view_count,
      type.typeName as typeName FROM article LEFT JOIN type ON article.type_id = type.id`
    
      const result = await this.app.mysql.query(sql)
      this.ctx.body = result
  }
}

module.exports = AdminController;
