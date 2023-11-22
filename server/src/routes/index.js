const { Router } = require("express");
const driversRouter = require("./driversRoutes");
const teamsRouter = require("./teamsRoutes");

const router = Router();
router.use('/drivers', driversRouter);
router.use('/teams', teamsRouter);

module.exports = router;
