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
      `SELECT 
      owners.*, 
      COALESCE(
        json_agg(to_jsonb(pets))
        FILTER (WHERE pets.id IS NOT NULL), '[]'
    ) as pets from owners 
      LEFT JOIN owners_pets on owners.id = owners_pets.owner_id 
      LEFT JOIN pets on owners_pets.pet_id = pets.id
      WHERE owners.id = $1
      GROUP BY owners.id`,
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
}

module.exports = { Owner };
