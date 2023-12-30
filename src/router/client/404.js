
const express = require('express');

const notFoundRoute = require('../../controllers/client/404')


const router = express.Router();

router.use(notFoundRoute);

module.exports = router