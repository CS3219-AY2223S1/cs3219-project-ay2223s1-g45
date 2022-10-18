import Question from '../model/question';

export const get = (req: any, res: any) => {
  Question.find((err, questions) => {
    if (err) return res.send(err);

    let filteredQuestions = questions;

    if (req.query.difficulty) {
      filteredQuestions = filteredQuestions.filter(
        (question) => question.difficulty.toLowerCase() === req.query.difficulty.toLowerCase()
      );
    }

    // Takes in anything as a param and hashes it to get a random index
    if (req.query.random) {
      const index = Math.abs(hashCode(JSON.stringify(req.query.random))) % filteredQuestions.length;
      console.log('random ' + req.query.random);
      console.log('index ' + index);
      filteredQuestions = [filteredQuestions[index]];
    }

    return res.json({
      message: 'Questions retrieved successfully',
      data: filteredQuestions
    });
  });
};

export const getById = (req: any, res: any) => {
  Question.find((err, questions) => {
    if (err) return res.send(err);
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

/**
 * Returns a hash code from a string
 * @param  {String} str The string to hash.
 * @return {Number}    A 32bit integer
 * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */
function hashCode(str: String) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
