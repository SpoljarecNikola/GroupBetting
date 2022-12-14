const pool = require("./db");
const queries = require("./queries");

//dohvacanje svih natjecanja
const getCompetitions = (req, res) => {
  pool.query(queries.getCompetitions, (error, results) => {
    if (results.rows.length === 0) {
      res.status(404).send("Unable to get competitions.");
    }
    res.status(200).json(results.rows);
  });
};

//dohvacanje natjecanja s odredenim id-jem
const getCompetitionById = (req, res) => {
  const id = parseInt(req.params.id);
  //provjera jel natjecanje s odredenim imenim postoji u
  pool.query(queries.getCompetitionById, [id], (error, results) => {
    if (results.rows.length === 0) {
      res
        .status(404)
        .send(`Competition with id ${id} does not exist in the database.`);
    }
    res.status(200).json(results.rows);
  });
};

//dodavanje natjecanja
const addCompetition = (req, res) => {
  const { name, startdate, enddate, hasended } = req.body;
  //provjera jel natjecanje s odredenim imenom vec postoji
  pool.query(queries.checkNameExists, [name], (error, results) => {
    if (results.rows.length) {
      res.send(`Competition with name '${name}' already exists.`);
    }
    if (name.length > 70) {
      res.send("Too long name, must be 70 characters max.");
    }
    if (!(hasended === true || hasended === false)) {
      res.send("Wrong input for hasEnded attribute");
    } else {
      //add competititon to db
      pool.query(
        queries.addCompetition,
        [name, startdate, enddate, hasended],
        (error, results) => {
          if (error) throw error;
          res.status(201).send("Competition created successfully.");
        }
      );
    }
  });
};

//brisanje natjecanja
const removeCompetition = (req, res) => {
  const id = parseInt(req.params.id);
  //provjera jel je natjecanje s odredenim id-jem u bazi
  pool.query(queries.getCompetitionById, [id], (error, results) => {
    const noCompetitionFound = !results.rows.length;
    if (noCompetitionFound) {
      res
        .status(404)
        .send(`Competition with id ${id} does not exist in the database.`);
    }
    pool.query(queries.removeCompetition, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Competition removed successfully");
    });
  });
};

//azuriranje natjecanja - omoguceno azuriranje samo atribura hasEnded
const updateCompetition = (req, res) => {
  const id = parseInt(req.params.id);
  const { hasended } = req.body;
  //provjera jel postoji natjecanje s odredenim id-jem
  pool.query(queries.getCompetitionById, [id], (error, results) => {
    const noCompetitionFound = !results.rows.length;
    if (noCompetitionFound) {
      res
        .status(404)
        .send(`Competition with id ${id} does not exist in the database.`);
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
