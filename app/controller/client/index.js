'use strict';

const Controller = require('egg').Controller;

class ClientController extends Controller {

  // 获取全部文章
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

  // 根据typeId获取对应类别的文章
  async getArticleListById () {
    const { ctx } = this;
    const typeId = ctx.query.typeId
    console.log('typeid:' + typeId)
    const sql = `SELECT article.id as id,
    article.title as title,
    article.introduction as introduction,
    FROM_UNIXTIME(article.created_time,'%Y-%m-%d %H:%i:%s') as created_time,
    article.view_count as view_count,
    type.typeName as typeName FROM article LEFT JOIN type ON article.type_id = type.id WHERE article.type_id=${typeId}  AND article.isShow = '1'`

    const result = await this.app.mysql.query(sql)
    console.log(result)
    ctx.body = {
      data: result
    }
  }

  async getArticleById() {
    const { ctx } = this;
    const id = ctx.query.id
    const sql = `SELECT article.id as id,
    article.title as title,
    article.content as content,
    FROM_UNIXTIME(article.created_time,'%Y-%m-%d %H:%i:%s') as created_time,
    article.view_count as view_count,
    type.typeName as typeName FROM article LEFT JOIN type ON article.type_id = type.id WHERE article.id=${id}`

    const result = await this.app.mysql.query(sql)
    ctx.body = {
      data: result[0]
    }
  }

  // 获取全部文章类型
  async getArticleType() {
    const { ctx } = this;
    const result = await this.app.mysql.select('type')
    ctx.body = {
      data: result
    }
  }
}

module.exports = ClientController;
