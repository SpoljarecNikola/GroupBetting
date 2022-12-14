const getCompetitions = 'SELECT * FROM public."Competition"';
const getCompetitionById = 'SELECT * FROM public."Competition" WHERE id = $1';
const checkNameExists =
  'SELECT c FROM public."Competition" c WHERE c.name = $1';
const addCompetition =
  'INSERT INTO public."Competition" (name, startdate, enddate, hasended) VALUES ($1, $2, $3, $4)';
const removeCompetition = 'DELETE FROM public."Competition" WHERE id = $1';
const updateCompetition =
  'UPDATE public."Competition" SET hasended = $1 WHERE id = $2';

module.exports = {
  getCompetitions,
  getCompetitionById,
  checkNameExists,
  addCompetition,
  removeCompetition,
  updateCompetition,
};
