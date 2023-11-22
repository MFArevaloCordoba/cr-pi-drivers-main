const { Router } = require('express');
const teamsHandler = require('../handlers/teamsHandlers');

const teamsRouter = Router();

teamsRouter.get('/', teamsHandler);

module.exports = teamsRouter;