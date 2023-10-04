const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.view_blogs);
router.get('/create', blogController.show_create);
router.post('/search', blogController.search);
router.post('/create', blogController.create_blog);
router.get('/edit/:id', blogController.get_edit);
router.post('/edit/:id', blogController.edit);
router.get('/delete/:id', blogController.delete_blog);
router.get('/:id', blogController.get_details);

module.exports = router;