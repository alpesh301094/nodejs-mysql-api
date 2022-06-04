const express = require('express');
const postsController = require('../contollers/post.controller');

const router = express.Router();

router.get("/", postsController.index);
router.post("", postsController.save);
router.get("/:id", postsController.show);
router.delete("/:id", postsController.destroy);
router.patch("/:id", postsController.update);

module.exports = router;