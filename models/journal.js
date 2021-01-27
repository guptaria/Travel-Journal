module.exports = function(sequelize, DataTypes) {
    var yourJournal = sequelize.define("yourJournal", {
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
    return yourJournal;
  };