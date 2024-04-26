const Comment = require("../models/Comment");

class CommentController {
  async getComments(req, res) {
    try {
      const userId = req.user.id
      const comments = await Comment.find({ userId });
      return res.json({
        message: "Comments find",
        comments,
      });
    } catch (error) {
      console.log(error);
      return res.json({ message: error });
    }
  }
  
  async creataComment(req, res) {
    try {
      const userId = req.user.id
      const text = req.body.text;
      const newComment = new Comment({
        userId,
        text,
        createdDate: new Date(),
      });

      await newComment.save();

      return res.json({
        message: "Comment saved",
        newComment: newComment,
      });
    } catch (error) {
      console.log(error);
      return res.json({ message: error });
    }
  }
}

module.exports = new CommentController();
