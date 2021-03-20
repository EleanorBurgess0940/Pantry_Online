module.exports = (sequelize, DataTypes) => {
  let foodItems = sequelize.define("foodItem", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140],
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  foodItems.associate = (models) => {
    foodItems.belongsTo(models.user, {
      foreignKey: {
        allowNull: true,
      },
    });
  };
  return foodItems;
};
