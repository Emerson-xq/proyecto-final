const express = require('express');
const router = express.Router();
const letrasController = require('../controllers/letrasController');

router.get('/', letrasController.getAll);
router.post('/', letrasController.create);
router.get('/prestamo/:idPrestamo', letrasController.getByPrestamo);

module.exports = router;