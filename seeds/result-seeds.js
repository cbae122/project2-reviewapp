const { Result } = require('../models');

const resultData = [];



const seedResults = () => Result.bulkCreate(resultData);

module.exports = seedResults;