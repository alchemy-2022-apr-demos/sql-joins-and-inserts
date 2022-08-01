const pool = require('../utils/pool');

class Owner {
  id;
  name;

  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  static async insert({ name }) {
    const { rows } = await pool.query(
      'insert into owners (name) values ($1) returning *;',
      [name]
    );
    return new Owner(rows[0]);
  }
}

module.exports = { Owner };
