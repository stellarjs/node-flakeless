'use strict';

const Flakeless = require('./lib/flakeless');

module.exports = {
  Flakeless,
  get Server() {
    return require('./lib/server');
  },
  get Client() {
    return require('./lib/client');
  }
};
