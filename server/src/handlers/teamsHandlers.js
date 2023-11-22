const getAllTeams = require('../controllers/teams/getAllTeams');

const teamsHandler = async (req,res) => {
    try {
        const allTeams = await getAllTeams();
        res.status(200).json(allTeams); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = teamsHandler


