const Router = require("express");
const router = new Router();
const CommentController = require("../controllers/CommentsController");
const authMiddleware = require("../middleware/auth.middleware");

router.get("", [authMiddleware], CommentController.getComments);
router.post("", [authMiddleware], CommentController.creataComment);

module.exports = router;
