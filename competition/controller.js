const pool = require("./db");
const queries = require("./queries");

//get all competitions
const getCompetitions = (req, res) => {
  pool.query(queries.getCompetitions, (error, results) => {
    if (!results.rows.length) {
      return res.status(404).send("Unable to get competitions.");
    }
    res.status(200).json(results.rows);
  });
};

//get competition with given id
const getCompetitionById = (req, res) => {
  const id = parseInt(req.params.id);
  //check if competition with given id is in the database
  pool.query(queries.getCompetitionById, [id], (error, results) => {
    if (!results.rows.length) {
      return res
        .status(404)
        .send(`Competition with id ${id} does not exist in the database.`);
    }
    res.status(200).json(results.rows);
  });
};

//create competition
const addCompetition = (req, res) => {
  const { name, startdate, enddate, hasended } = req.body;
  //check if competition with given name is already in the database
  pool.query(queries.checkNameExists, [name], (error, results) => {
    if (results.rows.length) {
      return res
        .status(400)
        .send(`Competition with name '${name}' already exists.`);
    }
    if (name.length > 70) {
      return res.status(400).send("Too long name, must be 70 characters max.");
    }
    if (!(hasended === true || hasended === false)) {
      return res.status(400).send("Wrong input for hasEnded attribute");
    }
    //add competititon to database
    pool.query(
      queries.addCompetition,
      [name, startdate, enddate, hasended],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("Competition created successfully.");
      }
    );
  });
};

//delete competition with given id
const removeCompetition = (req, res) => {
  const id = parseInt(req.params.id);
  //check if competition with given id is in the database
  pool.query(queries.getCompetitionById, [id], (error, results) => {
    if (!results.rows.length) {
      return res
        .status(404)
        .send(`Competition with id ${id} does not exist in the database.`);
    }
    pool.query(queries.removeCompetition, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Competition removed successfully");
    });
  });
};

//competition update - only allowed on hasEnded attribute
const updateCompetition = (req, res) => {
  const id = parseInt(req.params.id);
  const { hasended } = req.body;
  //check if competition with given id is in the database
  pool.query(queries.getCompetitionById, [id], (error, results) => {
    if (!results.rows.length) {
      return res
        .status(404)
        .send(`Competition with id ${id} does not exist in the database.`);
    }
    if (!(hasended === true || hasended === false)) {
      return res.status(400).send("Wrong input for hasEnded attribute");
    }
    pool.query(queries.updateCompetition, [hasended, id], (error, results) => {
      if (error) throw error;
      res.status(200).send(`Competition with id ${id} updated successfully`);
    });
  });
};

module.exports = {
  getCompetitions,
  getCompetitionById,
  addCompetition,
  removeCompetition,
  updateCompetition,
};
