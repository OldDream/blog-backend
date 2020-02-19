'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async index() {
    const { ctx } = this;
    let DBresult = await this.app.mysql.get("blog_content", {})
    // console.log(DBresult)
    ctx.body = DBresult
  }
}

module.exports = AdminController;
