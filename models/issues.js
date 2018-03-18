module.exports = function(sequelize, DataTypes) {

  // Set up Issue table
  var Issue = sequelize.define("Issue", {

    // Title (string provided by user)
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    // Location (string provided by user)
    location: {
      type: DataTypes.STRING
    },

    // User name derived from Google authentication
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1
      }
    },

    // User e-mail derived from Google authentication
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 11
      }
    },

    // Latitude derived from Mapbox geocode
    lat:{
      type: DataTypes.DECIMAL(10,6)
    },

    // Longitude derived from Mapbox geocode
    lon: {
      type: DataTypes.DECIMAL(10,6)
    },

    // Score (initially set to 0, incremented/decremented by user votes)
    score:{
      type: DataTypes.INTEGER
    },

    // Project type (chosen from dropdown by user)
    projectType: {
      type: DataTypes.TEXT,
      defaultValue: "Clean Up"
    },

    // Status (initially set to Open, affected by votes and admin interaction)
    status: {
      type: DataTypes.TEXT,
      defaultValue: "New"
    },

    // Image URL, returned from Cloudinary API call upon upload
    imglocation:{
      type: DataTypes.TEXT
    },

    // Tweet ID, returned from Twitter API call upon upload
    tweetID:{
      type: DataTypes.TEXT
    }
  });
  return Issue;
}
