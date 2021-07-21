'use strict';
require('dotenv').config();
const assert = require('assert');

const  {PORT, DATABASE, JWT_SECRET} = process.env;

assert(PORT , 'PORT is required');
assert(DATABASE , 'DATABASE is required');
assert(JWT_SECRET , 'JWT_SECRET is required');


module.exports = {
    PORT : PORT,
    DATABASE : DATABASE,
    JWT_SECRET : JWT_SECRET
};

