'use strict';

const Controller = require('egg').Controller;

class ClientController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'this is API for client pages';
  }
}

module.exports = ClientController;
