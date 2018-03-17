module.exports = function(sequelize, DataTypes) {
  var Issue = sequelize.define("Issue", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    location: {
      type: DataTypes.STRING
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 11
      }
    },
    lat:{
      type: DataTypes.DECIMAL(10,6)
    },
    lon: {
      type: DataTypes.DECIMAL(10,6)
    },
    upvotes:{
      type: DataTypes.INTEGER
    },
    downvotes:{
      type: DataTypes.INTEGER
    },
    projectType: {
      type: DataTypes.TEXT,
      defaultValue: "Clean Up"
    },
    status: {
      type: DataTypes.TEXT,
      defaultValue: "Open"
    },
    imglocation:{
      type: DataTypes.TEXT
    },
    tweetURL:{
      type: DataTypes.TEXT
    }
  });
  return Issue;
}
