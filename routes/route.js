const express = require('express');
const router = express.Router();

const { getAllData, getData, updateData, deleteData } = require('../controllers/api')

router.route('/').get(getAllData);
router.route('/:id').get(getData);
router.route('/:id').patch(updateData);
router.route('/:id').delete(deleteData);

module.exports = router;

