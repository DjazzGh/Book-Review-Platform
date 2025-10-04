const express = require('express');
const { addBook, getBooks, getBook, updateBook, deleteBook } = require('../controllers/bookController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, addBook);
router.get('/', getBooks);
router.get('/:id', getBook);
router.put('/:id', auth, updateBook);
router.delete('/:id', auth, deleteBook);

module.exports = router;