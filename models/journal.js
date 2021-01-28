module.exports = function(sequelize, DataTypes) {
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
          len: [1-50]
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

    journal.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      journal.belongsTo(models.userInfo, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return journal;
  };

  