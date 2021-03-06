'use strict';

var querystring = require('querystring');
var logger = require('logentries-logformat')('suite-sdk');

var Contact = function(request) {
  this._request = request;
};

Contact.prototype = {

  create: function(customerId, payload, options) {
    logger.log('contact_create');
    return this._request.post(customerId, '/contact', payload, options);
  },

  update: function(customerId, payload, create_if_not_exists) {
    logger.log('contact_update');
    const url = create_if_not_exists === true ?
        '/contact/create_if_not_exists=1' :
        '/contact';
    return this._request.put(customerId, url, payload);
  },

  query: function(customerId, payload) {
    logger.log('contact_query');
    const url = '/contact/query/' + querystring.stringify(payload);
    return this._request.get(customerId, url);
  },

  get: function(customerId, keyValues, keyId, fields) {
    logger.log('contact_get');
    keyId = keyId || 'id';
    return this._request.post(customerId, '/contact/getdata', fields ?
        { keyId, keyValues, fields } : { keyId, keyValues });
  },

  createField: function(customerId, options) {
    logger.log('contact_create_field');
    return this._request.post(customerId, '/field', options);
  },


  fields: function(customerId, options) {
    options = options || {};
    logger.log('contact_fields');
    return this._request.get(customerId, options.language ?
        '/field/translate/' + options.language :
        '/field');
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
