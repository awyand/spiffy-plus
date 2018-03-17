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
    lat:{
      type: DataTypes.DECIMAL(10,6)
    },
    lon: {
      type: DataTypes.DECIMAL(10,6)
    },
    score:{
      type: DataTypes.INTEGER
    },
    projectType: {
      type: DataTypes.TEXT,
      defaultValue: "Clean Up"
    },
    user: {
      type: DataTypes.TEXT
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
