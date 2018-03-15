module.exports = function(sequelize, DataTypes) {
  var Issue = sequelize.define("Issue", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    lat:{
      type: DataTypes.DECIMAL(10,6),
      allowNull: false
    },
    lon: {
      type: DataTypes.DECIMAL(10,6),
      allowNull: false
    },
    upvotes:{
      type: DataTypes.INTEGER
    },
    downvotes:{
      type: DataTypes.INTEGER
    },
    tags: {
      type: DataTypes.TEXT,
      defaultValue: "Cleanup"
    },
    user: {
      type: DataTypes.TEXT,
      allowNull: false
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
