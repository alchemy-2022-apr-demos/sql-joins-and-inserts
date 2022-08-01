const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should add a new owner', async () => {
    const resp = await request(app).post('/owners').send({ name: 'Franny' });
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
    });
  });

  it('should add a new owner and associate it with pets', async () => {
    const resp = await request(app)
      .post('/owners')
      .send({ name: 'Harriet', petIds: [1, 2] });
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
    });
  });

  afterAll(() => {
    pool.end();
  });
});
