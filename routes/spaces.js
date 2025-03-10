import express from 'express';
import Space from '../models/Space.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res, next) => {
  const { name, description, visibility, theme } = req.body;
  try {
    const space = new Space({
      userId: req.user.id,
      name,
      description,
      visibility,
      theme,
    });
    await space.save();
    res.status(201).json(space);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authMiddleware, async (req, res, next) => {
  const { name, description, visibility, theme } = req.body;
  try {
    const space = await Space.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { name, description, visibility, theme },
      { new: true }
    );
    if (!space) return res.status(404).json({ message: 'Space not found' });
    res.json(space);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const space = await Space.findById(req.params.id);
    if (!space || (space.visibility === 'private' && !req.user)) {
      return res.status(404).json({ message: 'Space not found or private' });
    }
    res.json(space);
  } catch (error) {
    next(error);
  }
});

router.get('/user/:userId', authMiddleware, async (req, res, next) => {
  try {
    const spaces = await Space.find({ userId: req.params.userId });
    res.json(spaces);
  } catch (error) {
    next(error);
  }
});

export default router;
