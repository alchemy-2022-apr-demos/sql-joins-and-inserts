const pool = require('../utils/pool');

class Owner {
  id;
  name;
  pets;

  constructor({ id, name, pets }) {
    this.id = id;
    this.name = name;
    this.pets = pets ?? [];
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * from owners WHERE owners.id = $1',
      [id]
    );
    return new Owner(rows[0]);
  }

  static async insert({ name }) {
    const { rows } = await pool.query(
      'insert into owners (name) values ($1) returning *;',
      [name]
    );
    return new Owner(rows[0]);
  }

  async addPetById(petId) {
    await pool.query(
      'INSERT INTO owners_pets (owner_id, pet_id) VALUES ($1, $2) RETURNING *',
      [this.id, petId]
    );
    return this;
  }

  async getPets() {
    const { rows } = await pool.query(
      `SELECT pets.* FROM owners_pets 
        INNER JOIN pets on pets.id = owners_pets.pet_id 
        WHERE owner_id = $1`,
      [this.id]
    );
    return rows;
  }
}

module.exports = { Owner };
