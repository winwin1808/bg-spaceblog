import mongoose from 'mongoose';

const spaceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  visibility: { type: String, enum: ['public', 'private'], default: 'private' },
  theme: { type: String, default: 'default' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Space', spaceSchema);
