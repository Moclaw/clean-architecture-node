const expiress = require('express');
const router = expiress.Router();
const requestController = require('../controllers/request.controller');
const authMiddleware = require('../middleware/authorize');

router.get('/', requestController.getAll);
router.get('/:id', requestController.getById);



module.exports = router;