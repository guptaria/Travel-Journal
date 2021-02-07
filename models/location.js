module.exports = function(sequelize, DataTypes) {
    var userLocation = sequelize.define("userLocation", {
      
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
        allowNull: true,
        validate: {
          len: [1-50]
        }
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1-50]
        }
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1-50]
        }
      },
    
     latitude: {
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
    },
    {
      createdAt: false,
      updatedAt: false,
      timestamps: false
  
    });

    // Many to Many realationship between user and location
    userLocation.associate = (models) => {
      userLocation.belongsToMany(models.User, {
        through: "merge",
        // as: "locations",
        // foreignKey: "location_id",
      });
    };

    ////Creating one to many relationship with the user table. Basically one user can have more than one location in the database
    // userLocation.associate = function (models) {
    //   userLocation.belongsTo(models.User, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };

    // Relationship between location and journal, one location can have multiple journals
    userLocation.associate = function(models) {
      userLocation.hasMany(models.journal, {
        onDelete: "cascade"
     });
   };

 

  // Relationship between location and journal, one journal can have multiple locations
  // location.associate = function (models) {
  //   location.belongsTo(models.journal, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };
    return userLocation;
  };



