'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NfcCollection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  NfcCollection.init({
    nfcId: DataTypes.STRING,
    maxEditions: DataTypes.INTEGER,
    nftTypeId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    wallet: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NfcCollection',
  });
  return NfcCollection;
};