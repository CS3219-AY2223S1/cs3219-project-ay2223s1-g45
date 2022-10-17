import Question from '../model/question';
export const get = (req, res) => {
    Question.find((err, questions) => {
        if (err)
            return res.send(err);
        if (req.query.difficulty) {
            // eslint-disable-next-line no-param-reassign
            questions = questions.filter((question) => question.difficulty.toLowerCase() === req.query.difficulty.toLowerCase());
        }
        if (req.query.random && req.query.random.toLowerCase() === 'true') {
            // eslint-disable-next-line no-param-reassign
            questions = [questions[Math.floor(Math.random() * questions.length)]];
        }
        return res.json({
            message: 'Questions retrieved successfully',
            data: questions
        });
    });
};
export const getById = (req, res) => {
    Question.find((err, questions) => {
        if (err)
            return res.send(err);
        const { id } = req.params;
        const question = questions[id - 1];
        if (!question) {
            return res.json({ message: `Question with id ${id} does not exist` });
        }
        return res.json({
            message: 'Question retrieved successfully',
            data: question
        });
    });
};
