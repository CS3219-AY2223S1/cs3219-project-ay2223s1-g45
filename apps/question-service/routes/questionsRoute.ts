import express, { Request, Response } from 'express';
import { get, getById } from '../controllers/questionController';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello world'
  });
});

router.route('/questions').get(get);
router.route('/questions/:id').get(getById);

export default router;
