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
}

module.exports = AdminController;
