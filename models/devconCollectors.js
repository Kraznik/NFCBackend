'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class devconCollectors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  devconCollectors.init({
    wallet: DataTypes.STRING,
    nftTypeId: DataTypes.JSON,
    count: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'devconCollectors',
  });
  return devconCollectors;
};