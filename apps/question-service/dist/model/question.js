import mongoose from 'mongoose';
const questionSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    }
});
export default mongoose.model('questionModels', questionSchema);
