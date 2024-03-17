const express = require('express');
const router = express.Router();

const managerController = require('../app/controllers/ManagerController');

router.post('/create', managerController.create);
router.get('/store', managerController.store);
router.get('/createView', managerController.createView);
router.get('/:id/edit', managerController.edit);
router.delete('/:id', managerController.delete);
router.put('/:id', managerController.update);

module.exports = router;
