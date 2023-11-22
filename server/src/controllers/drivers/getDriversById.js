const axios = require("axios");
const { Driver, Team } = require('../../db');

const getDriverById = async (id) => {
    let driverById;

    if (isNaN(id)) {
        driverById = await Driver.findByPk(id, { include: Team });
        if (!driverById) {
            throw new Error(`Conductor con id: ${id} no encontrado en la Base de datos`);
        }
    } else {
        try {
            const response = await axios.get(`http://localhost:5000/drivers/${id}`);
            driverById = response.data;
        } catch (error) { 
            throw new Error(`Conductor con ID: ${id} no encontrado en la Api`);
        }
    }

    return driverById;
}

module.exports = getDriverById;