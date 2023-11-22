const { Team } = require('../../db');
const axios = require('axios');

const getAllTeams = async () => {
  const todosTeamsBaseD = await Team.findAll();
  
  if (!todosTeamsBaseD.length) {
    try {
      const response = await axios.get('http://localhost:5000/drivers');
      const drivers = response.data;
   
      const driverTeams = drivers
      .map(driver => driver.teams)
      .filter(teams => teams !== undefined) 
      .reduce((acc, teams) => {
        const splitTeams = teams.split(',').map(team => team.trim());
        return [...acc, ...splitTeams];
      }, []) 
      .filter((team, index, arr) => arr.indexOf(team) === index);
      
      const teamObjects = driverTeams.map(name => ({ name }));
      await Team.bulkCreate(teamObjects);
      return driverTeams.sort();

    } catch (error) {
      console.error('Error al obtener los equipos de la API:', error);
    }
  } else {
    
    const driverTeams = todosTeamsBaseD
    .map(driver => driver.name)
    return driverTeams.sort();
  }

  
}

module.exports = getAllTeams;