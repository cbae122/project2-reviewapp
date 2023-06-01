const { Comment } = require('../models');
var ideal = document.getElementById('btn');
const commentData = [];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
