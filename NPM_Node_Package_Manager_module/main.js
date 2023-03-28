'use strict';

const { format } = require('date-fns'),
  { v4: uuid } = require('uuid');

console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));
console.log(uuid());
