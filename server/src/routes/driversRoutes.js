const { Router } = require('express');
const driversHandlers = require('../handlers/driversHandlers');

const driversRouter = Router();
driversRouter.get('/', driversHandlers.allDriversHandler);
driversRouter.get('/name', driversHandlers.driversByNameHandler);
driversRouter.get('/:id', driversHandlers.driversByIdHandler);
driversRouter.post('/', driversHandlers.postDriversHandler);
driversRouter.delete('/:id', driversHandlers.deleteDriverHandler);

module.exports = driversRouter;
