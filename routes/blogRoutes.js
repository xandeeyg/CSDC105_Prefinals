const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

router.get('/', blogController.blog_index);

router.get('/create', blogController.blog_create_get);

// create new blog
router.post('/', blogController.blog_create_post);

// get single blog
router.get('/:id', blogController.blog_details);

// delete blog
router.delete('/:id', blogController.blog_delete);

// update blog
router.get('/:id/edit', blogController.blog_edit_get);

router.post('/:id/update', blogController.blog_update);

module.exports = router;