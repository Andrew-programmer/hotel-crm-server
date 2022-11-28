const Router = require('express');

const router = new Router();
const basketDeviceController = require('../controllers/basketDeviceController');
const authMid = require("../middleware/authMiddleware");

router.post('/', authMid, basketDeviceController.create);
router.delete('/', authMid, basketDeviceController.delete);

router.get('/', authMid, basketDeviceController.getAllByUser);
router.delete('/all', authMid, basketDeviceController.deleteAllByUser);

router.put('/add', authMid, basketDeviceController.addOne);
router.put('/remove', authMid, basketDeviceController.removeOne);



module.exports = router;
