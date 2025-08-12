const request = require('supertest');
const app = require('../src/server');

describe('GitRank Live API', () => {
  
  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app)
        .get('/health')
        .expect(200);
      
      expect(res.body).toHaveProperty('status', 'ok');
      expect(res.body).toHaveProperty('timestamp');
    });
  });
  
  describe('GET /', () => {
    it('should return API documentation', async () => {
      const res = await request(app)
        .get('/')
        .expect(200);
      
      expect(res.body).toHaveProperty('name', 'GitRank Live');
      expect(res.body).toHaveProperty('endpoints');
      expect(res.body).toHaveProperty('metrics');
    });
  });
  
  describe('GET /api/badge', () => {
    it('should return error when username is missing', async () => {
      const res = await request(app)
        .get('/api/badge')
        .expect(400);
      
      expect(res.body).toHaveProperty('error', 'Username is required');
    });
    
    it('should return error for invalid metric', async () => {
      const res = await request(app)
        .get('/api/badge?user=octocat&metric=invalid')
        .expect(400);
      
      expect(res.body).toHaveProperty('error', 'Invalid metric');
    });
    
    it('should return error for invalid style', async () => {
      const res = await request(app)
        .get('/api/badge?user=octocat&style=invalid')
        .expect(400);
      
      expect(res.body).toHaveProperty('error', 'Invalid style');
    });
    
    // This test would require actual GitHub API calls
    it.skip('should generate badge for valid user', async () => {
      const res = await request(app)
        .get('/api/badge?user=octocat&metric=stars')
        .expect(200);
      
      expect(res.headers['content-type']).toBe('image/svg+xml');
    });
  });
  
  describe('GET /api/ranking-info', () => {
    it('should return ranking information', async () => {
      const res = await request(app)
        .get('/api/ranking-info')
        .expect(200);
      
      expect(res.body).toHaveProperty('algorithms');
      expect(res.body).toHaveProperty('percentiles');
      expect(res.body).toHaveProperty('cacheInfo');
    });
  });
  
});
