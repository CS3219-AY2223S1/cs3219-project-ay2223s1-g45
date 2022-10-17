import express from 'express';
import { get, getById } from '../controllers/questionController';
const router = express.Router();
router.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  });
});
router.route('/questions').get(get);
router.route('/questions/:id').get(getById);
export default router;
