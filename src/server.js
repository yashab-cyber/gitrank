const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const badgeRoutes = require('./routes/badge');
const rankingService = require('./services/rankingService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allow SVG content
}));
app.use(cors());
app.use(compression());
app.use(express.json());

// Routes
app.use('/api', badgeRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// Root endpoint with documentation
app.get('/', (req, res) => {
  res.json({
    name: 'GitRank Live',
    description: 'Real-time GitHub ranking badge generator with hacker-style design',
    version: '1.0.0',
    endpoints: {
      badge: '/api/badge?user=USERNAME&metric=METRIC&style=STYLE&theme=THEME',
      rank_json: '/api/rank?user=USERNAME&metric=METRIC',
      user_stats: '/api/stats/USERNAME',
      ranking_info: '/api/ranking-info',
      health: '/health'
    },
    metrics: ['stars', 'forks', 'followers', 'commits'],
    styles: ['flat', 'flat-square', 'for-the-badge', 'plastic'],
    themes: ['dark', 'light'],
    examples: [
      '/api/badge?user=octocat&metric=stars',
      '/api/badge?user=octocat&metric=followers&style=for-the-badge&theme=dark',
      '/api/rank?user=octocat&metric=stars'
    ],
    features: [
      '🎨 Hacker-style dark theme with neon accents',
      '☀️ Optional light theme support',
      '📊 JSON API for developers',
      '🏆 Real-time GitHub ranking',
      '⚡ Lightning fast with smart caching',
      '🌍 Optional country-based rankings'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GitRank Live server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  
  // Initialize ranking service cache
  rankingService.initializeCache();
});

module.exports = app;
