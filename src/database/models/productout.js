'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductOut extends Model {
    static associate(models) {
      ProductOut.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' })
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