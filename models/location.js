module.exports = function(sequelize, DataTypes) {
    var location = sequelize.define("location", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      place: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1-50]
        }
      },
    //  lattitude: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     validate: {
    //       len: [1]
    //     }
    //   },
    //   longitude: {
    //     type: DataTypes.TEXT,
    //     allowNull: false,
    //     validate: {
    //       len: [1]
    //     }
    //   }
     
    point: {
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: false
    }
    });


// Add a belongsTo association to journal here
  location.associate = function (models){
    models.location.belongsTo(models.journal,{
    onDelete:'CASCADE',
    foreignKey:{
      allowNull:false
    }
  });
  }
    return location;
  };



