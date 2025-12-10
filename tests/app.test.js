const request = require('supertest');
const app = require('../app');

describe('NoteVault API Tests', () => {
  
  describe('Health Check - Smoke Test', () => {
    test('GET /health returns 200 and healthy status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('healthy');
    });
  });

  describe('Functional Tests - Note Operations', () => {
    test('POST /notes creates a new note', async () => {
      const newNote = {
        title: 'Test Note',
        content: 'This is test content'
      };

      const response = await request(app)
        .post('/notes')
        .send(newNote);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe('Test Note');
      expect(response.body.content).toBe('This is test content');
      expect(response.body.id).toBeDefined();
    });

    test('GET /notes returns all notes', async () => {
      const response = await request(app).get('/notes');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /notes without title returns 400 error', async () => {
      const invalidNote = {
        content: 'Content without title'
      };

      const response = await request(app)
        .post('/notes')
        .send(invalidNote);

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });
});