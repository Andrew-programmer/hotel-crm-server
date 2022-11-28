const Router = require('express');
const ratingController = require('../controllers/ratingController');
const authMid = require("../middleware/authMiddleware");

const router = new Router();

router.post('/', authMid, ratingController.create);
router.get('/one', ratingController.getOne);
router.get('/', ratingController.getAll);
router.put('/', authMid, ratingController.update);
router.get('/average', ratingController.getAverage);




module.exports = router;
