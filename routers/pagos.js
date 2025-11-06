const express = require('express');
const router = express.Router();
const pagosController = require('../controllers/pagosControllers');

router.get('/', pagosController.getAll);
router.post('/', pagosController.create);
router.get('/prestamo/:idPrestamo', pagosController.getByPrestamo);

module.exports = router;