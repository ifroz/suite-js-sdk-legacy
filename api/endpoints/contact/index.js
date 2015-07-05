'use strict';

var logger = require('logentries-logformat')('suite-sdk');

var Contact = function(request) {
  this._request = request;
};

Contact.prototype = {

  create: function(customerId, payload, options) {
    logger.log('contact_create');
    return this._request.post(customerId, '/contact', payload, options);
  },

  update: function(customerId, payload) {
    logger.log('contact_update');
    return this._request.put(customerId, '/contact', payload);
  },

  get: function(customerId, contactIds) {
    logger.log('contact_get');
    return this._request.post(customerId, '/contact/getdata', {
      keyId: 'id',
      keyValues: contactIds
    });
  },

  fields: function(customerId) {
    logger.log('contact_fields');
    return this._request.get(customerId, '/field');
  },

  fieldChoices: function(customerId, fieldId, language) {
    logger.log('contact_field_choices');
    var url = '/field/' + fieldId + '/choice/translate/' + (language || 'en');
    return this._request.get(customerId, url);
  }

};

Contact.create = function(request) {
  return new Contact(request);
};

module.exports = Contact;
