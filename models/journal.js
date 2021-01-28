module.exports = function (sequelize, DataTypes) {
  var journal = sequelize.define("journal", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    journalTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1 - 50]
      }
    },
    journalEntry: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

  });

  journal.associate = function (models) {
    journal.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return journal;
};

