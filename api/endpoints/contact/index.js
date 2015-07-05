'use strict';

var util = require('util');
var _ = require('lodash');
var logger = require('logentries-logformat')('suite-sdk');

var Base = require('../_base');

var Contact = function(request, options) {
  Base.call(this, options);
  this._request = request;
};

util.inherits(Contact, Base);

_.extend(Contact.prototype, {

  create: function(payload, options) {
    logger.log('contact_create');
    return this._request.post(
      this._getCustomerId(options),
      '/contact',
      payload,
      options
    );
  },

  update: function(customerId, payload) {
    logger.log('contact_update');
    return this._request.put(customerId, '/contact', payload);
  },

  get: function(payload, options) {
    logger.log('contact_get');
    return this._request.post(
        this._getCustomerId(options),
        '/contact/getdata',
        payload);
  },

  fields: function(options) {
    logger.log('contact_fields');
    return this._request.get(this._getCustomerId(options), '/field');
  },

  fieldChoices: function(payload, options) {
    logger.log('contact_field_choices');
    var url = '/field/' + payload.fieldId + '/choice/translate/' +
        (payload.language || 'en');
    return this._request.get(options.customerId, url);
  }

});

Contact.create = function(request, options) {
  return new Contact(request, options);
};

module.exports = Contact;
