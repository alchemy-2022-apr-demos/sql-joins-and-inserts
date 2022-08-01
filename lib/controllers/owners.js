const { Router } = require('express');
const { Owner } = require('../models/Owner');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const data = await Owner.getById(req.params.id);
    res.json(data);
  })
  .post('/', async (req, res) => {
    const owner = await Owner.insert(req.body); // {name: 'Franny'}
    if (req.body.petIds) {
      await Promise.all(req.body.petIds.map((id) => owner.addPetById(id)));
    }
    res.json(owner);
  });
