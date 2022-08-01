const { Router } = require('express');
const { Owner } = require('../models/Owner');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res, next) => {
  const data = await Owner.insert(req.body); // {name: 'Franny'}
  res.json(data);
});
