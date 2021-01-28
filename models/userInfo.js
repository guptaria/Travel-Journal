module.exports = function(sequelize, DataTypes) {
    var userInfo = sequelize.define("userInfo", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1-50]
        }
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1-50]
        }
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1-50]
        }
      },

      profileImage: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1-50]
        }
      }
   
    });

    userInfo.associate = function(models) {
        // Associating userInfo with journal
        // When an userInfo is deleted, also delete any associated journal
        userInfo.hasMany(models.journal, {
          onDelete: "cascade"
        });
      };
    
    return userInfo;
  };



