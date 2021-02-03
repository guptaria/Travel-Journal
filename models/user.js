// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    provider: {
      type: DataTypes.ENUM,
      values: ["google", "local"],
      required: true,
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      avoidNullWhenLocalSignup(value) {
        if (this.provider==="local" && !value) {
          throw new Error('You must provide a password since your locally signing up');
        }
      }
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    }
    // createdAt: {
    //   type: 'TIMESTAMP',
    //   defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    //   allowNull: false
     
    // },
    // updatedAt: {
    //   type: 'TIMESTAMP',
    //   defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    //   allowNull: false
     
    // },
 
  },{
    createdAt: false,
    updatedAt: false,
    timestamps: false

  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function(user) {
    if(user.password) { // if user password isn't empty, then assume this is a local login and encrypt password
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });

  //Creating one to many relationship with the journal table. Basically one user can have more than one journals in the database

  User.associate = function(models) {
    // Associating User with journal
    // When an User is deleted, also delete any associated journal
    User.hasMany(models.journal, {
      onDelete: "cascade"
    });
  };

  //Creating one to many relationship with the location table. Basically one user can have more than one location in the database
  User.associate = function(models) {
    // Associating User with location
    // When an User is deleted, also delete any associated location
    User.hasMany(models.userLocation, {
      onDelete: "cascade"
    });
  };

  //Many to Many realationship between user and location
//   User.associate = (models) => {
//   User.belongsToMany(models.location, {
//     through: "merge",
//     as: "users",
//     foreignKey: "user_id",
//   });
// };
  return User;
};
