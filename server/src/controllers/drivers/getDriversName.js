const getAllDrivers = require('./getAllDrivers');

const getDriversName = async (name) => {
    const allDrivers = await getAllDrivers();

    if (name) {
        const driversByName = allDrivers.filter((driver) =>
            driver.forename.toLowerCase().startsWith(name.toLowerCase())
        );

        if (driversByName.length) {
            return driversByName.slice(0, 15);
        } else {
            throw new Error(`No se encontraron conductores con el nombre: ${name}`);
        }
    }

    return allDrivers;
};

module.exports = getDriversName;