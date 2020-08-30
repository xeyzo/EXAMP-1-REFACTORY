'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User, { as: 'supplier', foreignKey: 'userId' })
      Product.hasMany(models.ProductOut, { as: 'productOut', foreignKey: 'productId' })
      Product.hasMany(models.In, { as: 'productIn', foreignKey: 'product_id' });
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        min: 3
      }
    },
    stock: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: true,
        isNumeric: true
      }
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: true,
        isNumeric: true
      }
    },
    userId: DataTypes.INTEGER,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};