const router = require('express').Router();
const questionController = require('../controllers/questionController');

router.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  });
});

router.route('/questions').get(questionController.get);
router.route('/questions/:id').get(questionController.getById);

module.exports = router;
