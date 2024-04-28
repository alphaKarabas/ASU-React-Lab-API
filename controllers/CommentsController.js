const Comment = require("../models/Comment");
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
class CommentController {
  async getComments(req, res) {
    try {
      await delay(2000); // Задержка на 2 секунды

      const userId = req.user.id;
      const comments = await Comment.find({ userId });
      console.log(req.user);
      
      return res.json({
        message: "Comments find",
        comments,
      });
    } catch (error) {
      console.log(error);
      return res.json({ message: "Error retrieving comments" });
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
