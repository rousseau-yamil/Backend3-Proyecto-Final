import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

import {
  usersService,
  petsService,
  adoptionsService
} from '../src/services/index.js';

describe('Adoptions Router', function () {
  let userId, petId, adoptionId;
  const nonExistingId = '6123456789abcdef01234567';

  before(async function () {
    await adoptionsService.deleteAll?.();
    await petsService.deleteAll?.();
    await usersService.deleteAll?.();

    // !first_name || !last_name || !email || !password

    const user = await usersService.create({
      first_name: 'Test User',
      last_name: 'Anon',
      email: 'testuser@example.com',
      password:'pass_123',
      pets: []
    });

    // !name||!specie||!birthDate)
    const pet = await petsService.create({
      name: 'Firulais',
      specie: 'Dog',
      birthDate: '2025-05-08T04:00:04.268Z',
      adopted: false
    });

    userId = user._id.toString();
    petId = pet._id.toString();
  });

  describe('POST /api/adoptions/:uid/:pid', function () {
    it('should adopt a pet successfully', async function () {
      const res = await request(app).post(`/api/adoptions/${userId}/${petId}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.message).to.equal('Pet adopted');

      const adoption = await adoptionsService.getBy({ pet: petId });
      expect(adoption).to.exist;
      adoptionId = adoption._id.toString();
    });

    it('should return error if pet is already adopted', async function () {
      const res = await request(app).post(`/api/adoptions/${userId}/${petId}`);
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal('Pet is already adopted');
    });

    it('should return 404 if user does not exist', async function () {
      const res = await request(app).post(`/api/adoptions/${nonExistingId}/${petId}`);
      expect(res.statusCode).to.equal(404);
      expect(res.body.error).to.equal('user Not found');
    });

    it('should return 404 if pet does not exist', async function () {
      const res = await request(app).post(`/api/adoptions/${userId}/${nonExistingId}`);
      expect(res.statusCode).to.equal(404);
      expect(res.body.error).to.equal('Pet not found');
    });
  });

  describe('GET /api/adoptions', function () {
    it('should return all adoptions', async function () {
      const res = await request(app).get('/api/adoptions');
      expect(res.statusCode).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.payload).to.be.an('array');
      expect(res.body.payload.length).to.be.greaterThan(0);
    });
  });

  describe('GET /api/adoptions/:aid', function () {
    it('should return the adoption by id', async function () {
      const res = await request(app).get(`/api/adoptions/${adoptionId}`);
      expect(res.statusCode).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.payload._id).to.equal(adoptionId);
    });

    it('should return 404 if adoption not found', async function () {
      const res = await request(app).get(`/api/adoptions/${nonExistingId}`);
      expect(res.statusCode).to.equal(404);
      expect(res.body.error).to.equal('Adoption not found');
    });
  });
});
