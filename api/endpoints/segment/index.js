'use strict';

var util = require('util');
var logger = require('logentries-logformat')('suite-sdk');
var _ = require('lodash');

var Base = require('../_base');

var Segment = function(request, options) {
  Base.call(this, options);
  this._request = request;
};

util.inherits(Segment, Base);

_.extend(Segment.prototype, {

  listContacts: function(payload, options) {
    return this._requireParameters(payload, ['segment_id']).then(function() {
      var url = util.format('/filter/%s/contacts', payload.segment_id);
      logger.log('segment_list_contacts');

      return this._request.get(
        this._getCustomerId(options),
        this._buildUrl(url, payload, ['segment_id']),
        options
      );
    }.bind(this));
  },

  listSegments: function(payload, options) {
    logger.log('segment_list');

    return this._request.get(
      this._getCustomerId(options),
      this._buildUrl('/filter', payload),
      options
    );
  }

});

Segment.create = function(request, options) {
  return new Segment(request, options);
};

module.exports = Segment;

