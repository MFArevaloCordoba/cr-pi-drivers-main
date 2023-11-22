const { Driver } = require('../../db');

const deleteDriver = async (id) => {
  const borrarPiloto = await Driver.findByPk(id);

  if (!borrarPiloto) {
    throw new Error("¡No encontramos este Piloto!");
  }



  await borrarPiloto.destroy();
  return borrarPiloto;
};

module.exports = deleteDriver;