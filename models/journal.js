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
    location: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    start_date: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    end_date: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
      }

  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false

  });

  // Relationship between user and journal, one user can have multiple journals
  journal.associate = function (models) {
    journal.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  // Relationship between location and journal, one location can have multiple journals
  // journal.associate = function (models) {
  //   journal.belongsTo(models.location, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return journal;
};

