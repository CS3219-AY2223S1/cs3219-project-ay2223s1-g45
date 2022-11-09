import mongoose from 'mongoose';

const { Schema } = mongoose;
const SessionSchema = new Schema({
  token: {
    type: String,
    required: true
  }
});

export default mongoose.model('SessionModel', SessionSchema);
