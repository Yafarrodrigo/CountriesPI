const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
      type: DataTypes.STRING
    },
    difficulty:{
      type: DataTypes.INTEGER,
      validator:{
        min: 1,
        max: 5
      }
    },
    duration:{
      type: DataTypes.INTEGER
    },
    season:{
      type: DataTypes.ENUM("Summer","Autumn","Winter","Spring")
    }
  });
};
