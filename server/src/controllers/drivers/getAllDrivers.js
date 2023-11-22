const axios = require("axios");
const { Driver, Team } = require('../../db');
const defaultImage = "https://i.imgur.com/Ks7SbZt.png";

const getAllDrivers = async () => {
    const allDriversBaseD = await Driver.findAll({
        include: {
            model: Team,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }
    });

    const driversData = (await axios("http://localhost:5000/drivers")).data;
    const allDriversApi = driversData.map((driver) => ({
        id: driver.id,
        forename: driver.name.forename,
        surname: driver.name.surname,
        description: driver.description || "",
        image: driver.image.url ? driver.image.url : defaultImage,
        nationality: driver.nationality,
        dob: driver.dob,
        teams: driver.teams,
    }));

    const allDrivers = [...allDriversApi, ...allDriversBaseD];
    return allDrivers;
};

module.exports = getAllDrivers;
