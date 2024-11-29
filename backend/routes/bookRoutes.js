const express = require('express');
const router = express.Router();
const { getAllBooks, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', getAllBooks);
router.post('/', [auth, admin], createBook);
router.put('/:id', [auth, admin], updateBook);
router.delete('/:id', [auth, admin], deleteBook);

module.exports = router;