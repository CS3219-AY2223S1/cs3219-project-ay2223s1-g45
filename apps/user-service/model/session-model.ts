import mongoose from 'mongoose';

const { Schema } = mongoose;
const SessionSchema = new Schema({
  token: {
    type: String,
    required: true
  }
});

// TODO: make entry expire after 24h
// SessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

export default mongoose.model('SessionModel', SessionSchema);
