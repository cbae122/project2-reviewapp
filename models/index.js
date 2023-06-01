const User = require('./User');
const Result = require('./Result');
const Comment = require('./Comment');

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});


Comment.belongsTo(Result, {
    foreignKey: 'result_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Result.hasMany(Comment, {
    foreignKey: 'result_id'
});

Result.hasMany(Comment, {
    foreignKey: 'result_id'
})

module.exports = { User, Result, Comment};


