const { Router } = require('express');
const { Owner } = require('../models/Owner');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const owner = await Owner.getById(req.params.id);
    owner.pets = await owner.getPets();
    res.json(owner);
  })
  .post('/', async (req, res) => {
    const owner = await Owner.insert(req.body); // {name: 'Franny'}
    if (req.body.petIds) {
      await Promise.all(req.body.petIds.map((id) => owner.addPetById(id)));
    }
    res.json(owner);
  });
