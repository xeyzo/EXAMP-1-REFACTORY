'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class In extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      In.belongsTo(models.Product, { as: 'product', foreignKey: 'product_id' })
    }
  };
  In.init({
    product_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'In',
  });
  return In;
};