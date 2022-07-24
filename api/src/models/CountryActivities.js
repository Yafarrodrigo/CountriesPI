const { DataTypes } = require('sequelize');
const Country = require('./Country');
const Activity = require('./Activity')

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('CountryActivities', {
        countryId:{
            type: DataTypes.STRING,
            refereces:{
                model: Country,
                key: "id"
            }
        },

        activityId:{
            type: DataTypes.INTEGER,
            refereces:{
                model: Activity,
                key: "id"
            }
        }
  },{ timestamps: false });
};