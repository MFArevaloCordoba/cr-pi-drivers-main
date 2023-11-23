const { Router } = require('express');
const driversHandlers = require('../handlers/driversHandlers');

const driversRouter = Router();
driversRouter.get('/', driversHandlers.allDriversHandler);
driversRouter.get('/name', driversHandlers.driversByNameHandler);
driversRouter.get('/:id', driversHandlers.driversByIdHandler);
driversRouter.post('/', driversHandlers.postDriversHandler);


module.exports = driversRouter;
