// const { Driver, Team } = require('../../db');

// const updateDriver = async (id, updateData) => {
//   const { Teams, ...driverData } = updateData; //Extraigo los Teams y el resto lo meto en driverData con el operador de propagacion '...'
//   const driver = await Driver.findByPk(id);

//   if (!driver) {
//     throw new Error("Driver not found with ID");
//   }

//   await driver.update(driverData);
//   await driver.setTeams([]); //elimino las asociaciones de teams por si cambio alguna

//   if (Teams && Teams.length > 0) { //las vuelvo a crear si hay una nueva
//     for (const teamData of Teams) { //recorro todos los team
//       const { name } = teamData.DriverTeam; //extraigo el nombre del team 

//       if (name) {
//         let [team] = await Team.findOrCreate({ // destructuro el array porqueel findOrCreate devuelve dos elemento el registro team y un bool si se creo o no
//           where: { name },
//           defaults: { name } //sino encuentro el name, me quedo con el name para luego guardarlo
//         });

//         await driver.addTeam(team); 
//       }
//     }
//   }
// };

// module.exports = updateDriver;