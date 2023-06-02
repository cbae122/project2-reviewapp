const User = require('./User');
// const Result = require('./Result');
const Comment = require('./Comment');
const Place = require('./Place');

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Place, {
  foreignKey: 'place_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Place.hasMany(Comment, {
  foreignKey: 'place_id'
});

User.hasMany(Place, {
  foreignKey: 'user_id'
});

// Result.hasMany(Comment, {
//   foreignKey: 'result_id'
// });

module.exports = { User, Comment, Place };