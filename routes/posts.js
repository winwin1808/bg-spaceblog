import express from 'express';
import Post from '../models/Post.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res, next) => {
  const { spaceId, title, content, tags, visibility } = req.body;
  try {
    const post = new Post({ spaceId, title, content, tags, visibility });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authMiddleware, async (req, res, next) => {
  const { title, content, tags, visibility } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, tags, visibility, updatedAt: Date.now() },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
});

router.get('/:spaceId', async (req, res, next) => {
  try {
    const posts = await Post.find({ spaceId: req.params.spaceId });
    res.json(posts.filter(post => post.visibility === 'public' || req.user));
  } catch (error) {
    next(error);
  }
});

export default router;
