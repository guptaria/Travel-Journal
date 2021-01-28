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
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1-50]
        }
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1-50]
        }
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1-50]
        }
      },
    
     lattitude: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      longitude: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
     
    // point: {
    //     type: DataTypes.GEOMETRY('POINT'),
    //     allowNull: false
    // }
    });

    //Many to Many realationship between user and location
    location.associate = (models) => {
      location.belongsToMany(models.User, {
        through: "merge",
        as: "locations",
        foreignKey: "location_id",
      });
    };

    // location.associate = function (models) {
    //   location.belongsTo(models.User, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };

    // Relationship between location and journal, one location can have multiple journals
    location.associate = function(models) {
      location.hasMany(models.journal, {
      onDelete: "cascade"
    });
  };

    return location;
  };



