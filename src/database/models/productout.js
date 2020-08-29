'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductOut extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ProductOut.init({
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      validate: {
        notNull: true,
        isDate: true
      }
    },
    total: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductOut',
  });
  return ProductOut;
};