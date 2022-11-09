const URI_USER_SVC = process.env.REACT_APP_URI_USER_SVC || 'http://localhost:8000';

const PREFIX_USER_SVC = '/api/user';

const URI_QUESTION_SVC = process.env.REACT_APP_URI_QUESTION_SVC || 'http://localhost:8004';

const PREFIX_QUESTION_SVC = '/api/questions';

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;
export const URL_MATCHING_SVC = process.env.REACT_APP_URI_MATCHING_SVC || 'http://localhost:8001';
export const URL_COMMUNICATION_SVC =
  process.env.REACT_APP_URI_COMMUNICATION_SVC || 'http://localhost:8002';
export const URL_QUESTION_SVC = URI_QUESTION_SVC + PREFIX_QUESTION_SVC;
