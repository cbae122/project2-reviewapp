const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Result extends Model {}

Result.init(
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        // autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
post_content: {
    type: DataTypes.TEXT,
    allowNull: true,
    
},
comment_id: {
    type: DataTypes.INTEGER,
    references: {
    model: 'comment',
    key: 'id'
    }
}

},
{
    sequelize,
freezeTableName: true,
underscored: true,
modelName: 'result'
}
);

module.exports = Result;