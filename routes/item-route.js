const express = require('express');
const ItemController = require('../controllers/item-controller');

const router = express.Router();
const itemController = new ItemController();

router.get('/', itemController.getAll);
router.get('/:id', itemController.getById);
router.post('/', itemController.create);
router.put('/:id', itemController.update);
router.delete('/:id', itemController.delete);

module.exports = router;
