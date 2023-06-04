const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Place extends Model {}

Place.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,

    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // img: {
    //     type: DataTypes.STRING,
    //     allowNull: false,

    // },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }

  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'place'
  }
);

module.exports = Place;