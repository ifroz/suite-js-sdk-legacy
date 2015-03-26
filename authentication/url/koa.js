'use strict';

var Authenticator = require('./');


module.exports.getMiddleware = function(options) {

  return function* (next) {
    var request = this.request;
    var authenticator = Authenticator.create(options);

    try {
      authenticator.authenticate(request.url, request.header.host);
      request.validatedData = (request.method === 'GET') ? request.query : request.body;
    } catch (ex) {
      this.throw(401, ex.message);
    }

    if (next) yield next;
  };
};
