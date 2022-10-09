'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class devconCreations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  devconCreations.init({
    walletAddress: DataTypes.STRING,
    nftTypeId: DataTypes.STRING,
    name: DataTypes.STRING,
    twitter: DataTypes.STRING,
    telegram: DataTypes.STRING,
    photoLink: DataTypes.STRING,
    generatedPhotoLink: DataTypes.STRING,
    uuid: DataTypes.STRING,
    collected: DataTypes.INTEGER,
    maxEditions: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'devconCreations',
  });
  return devconCreations;
};