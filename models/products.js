'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product.init({
    proimage: DataTypes.STRING,
    procategory: DataTypes.STRING,
    proname: DataTypes.STRING,
    proprice: DataTypes.STRING,
    prodescription: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products',
  });
  return product;
};