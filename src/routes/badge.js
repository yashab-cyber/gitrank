const express = require('express');
const router = express.Router();
const githubService = require('../services/githubService');
const rankingService = require('../services/rankingService');
const badgeService = require('../services/badgeService');

// Rate limiting
const rateLimit = {};
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW) || 3600000; // 1 hour
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX) || 1000;

function checkRateLimit(ip) {
  const now = Date.now();
  if (!rateLimit[ip]) {
    rateLimit[ip] = { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
  }
  
  const limit = rateLimit[ip];
  if (now > limit.resetTime) {
    limit.count = 0;
    limit.resetTime = now + RATE_LIMIT_WINDOW;
  }
  
  if (limit.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  limit.count++;
  return true;
}

// Badge endpoint
router.get('/badge', async (req, res) => {
  try {
    const { user, metric = 'stars', style = 'flat', country, theme = 'dark' } = req.query;
    
    // Validate required parameters
    if (!user) {
      return res.status(400).json({ 
        error: 'Username is required',
        usage: '/api/badge?user=USERNAME&metric=METRIC'
      });
    }
    
    // Rate limiting
    const clientIP = req.ip || req.connection.remoteAddress;
    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded',
        retryAfter: Math.ceil(RATE_LIMIT_WINDOW / 1000)
      });
    }
    
    // Validate metric
    const validMetrics = ['stars', 'forks', 'followers', 'commits'];
    if (!validMetrics.includes(metric)) {
      return res.status(400).json({
        error: 'Invalid metric',
        validMetrics,
        provided: metric
      });
    }
    
    // Validate style
    const validStyles = ['flat', 'flat-square', 'for-the-badge', 'plastic'];
    if (!validStyles.includes(style)) {
      return res.status(400).json({
        error: 'Invalid style',
        validStyles,
        provided: style
      });
    }

    // Validate theme
    const validThemes = ['dark', 'light'];
    if (!validThemes.includes(theme)) {
      return res.status(400).json({
        error: 'Invalid theme',
        validThemes,
        provided: theme
      });
    }
    
    console.log(`🔍 Generating badge for ${user} (${metric}, ${style}, ${theme})`);
    
    // Get user data from GitHub
    const userData = await githubService.getUserData(user);
    if (!userData) {
      return res.status(404).json({ 
        error: 'GitHub user not found',
        user 
      });
    }
    
    // Calculate ranking
    const ranking = await rankingService.calculateRank(userData, metric, country);
    
    // Generate SVG badge
    const badgeData = {
      user,
      metric,
      value: userData.metrics[metric],
      rank: ranking,
      style,
      country,
      theme
    };
    
    const svgBadge = badgeService.generateSVG(badgeData);
    
    // Set appropriate headers
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=43200'); // 12 hours
    res.setHeader('Last-Modified', new Date().toUTCString());
    
    console.log(`✅ Badge generated for ${user}: ${ranking.percentile}% (${ranking.description})`);
    
    res.send(svgBadge);
    
  } catch (error) {
    console.error('Badge generation error:', error.message);
    
    if (error.message.includes('rate limit')) {
      return res.status(429).json({
        error: 'GitHub API rate limit exceeded',
        message: 'Please try again later'
      });
    }
    
    if (error.message.includes('not found')) {
      return res.status(404).json({
        error: 'User not found',
        message: error.message
      });
    }
    
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
});

// JSON API endpoint for developers
router.get('/rank', async (req, res) => {
  try {
    const { user, metric = 'stars', country } = req.query;
    
    if (!user) {
      return res.status(400).json({ 
        error: 'Username is required',
        usage: '/api/rank?user=USERNAME&metric=METRIC'
      });
    }

    // Rate limiting
    const clientIP = req.ip || req.connection.remoteAddress;
    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded',
        retryAfter: Math.ceil(RATE_LIMIT_WINDOW / 1000)
      });
    }

    // Validate metric
    const validMetrics = ['stars', 'forks', 'followers', 'commits'];
    if (!validMetrics.includes(metric)) {
      return res.status(400).json({
        error: 'Invalid metric',
        validMetrics,
        provided: metric
      });
    }

    console.log(`📊 Fetching rank data for ${user} (${metric})`);
    
    // Get user data from GitHub
    const userData = await githubService.getUserData(user);
    if (!userData) {
      return res.status(404).json({ 
        error: 'GitHub user not found',
        user 
      });
    }
    
    // Calculate ranking
    const ranking = await rankingService.calculateRank(userData, metric, country);
    
    // Return comprehensive JSON data
    const response = {
      user: {
        login: userData.login,
        name: userData.name,
        avatar_url: userData.avatar_url,
        location: userData.location,
        company: userData.company
      },
      metric: {
        name: metric,
        value: userData.metrics[metric],
        formatted: ranking.value >= 1000000 ? `${(ranking.value/1000000).toFixed(1)}M` : 
                  ranking.value >= 1000 ? `${(ranking.value/1000).toFixed(1)}K` : 
                  ranking.value.toString()
      },
      ranking: {
        percentile: ranking.percentile,
        description: ranking.description,
        tier: ranking.tier,
        badge_color: ranking.badge_color,
        country: ranking.country || null
      },
      benchmarks: ranking.benchmarks,
      all_metrics: userData.metrics,
      last_updated: userData.lastFetched,
      api_version: '1.0',
      cache_info: {
        cached_until: new Date(Date.now() + (parseInt(process.env.CACHE_TTL) || 43200) * 1000).toISOString()
      }
    };

    // Set cache headers
    res.setHeader('Cache-Control', 'public, max-age=43200');
    res.setHeader('Last-Modified', new Date().toUTCString());
    
    console.log(`✅ Rank data returned for ${user}: ${ranking.percentile}% (${ranking.description})`);
    
    res.json(response);

  } catch (error) {
    console.error('Rank API error:', error.message);
    
    if (error.message.includes('rate limit')) {
      return res.status(429).json({
        error: 'GitHub API rate limit exceeded',
        message: 'Please try again later'
      });
    }
    
    if (error.message.includes('not found')) {
      return res.status(404).json({
        error: 'User not found',
        message: error.message
      });
    }
    
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
});

// User stats endpoint (for debugging)
router.get('/stats/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const userData = await githubService.getUserData(username);
    
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      user: username,
      metrics: userData.metrics,
      profile: {
        name: userData.name,
        login: userData.login,
        avatar_url: userData.avatar_url,
        created_at: userData.created_at,
        updated_at: userData.updated_at
      },
      lastUpdated: userData.lastFetched
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ranking info endpoint
router.get('/ranking-info', (req, res) => {
  res.json({
    algorithms: {
      stars: 'Total stars across all public repositories',
      forks: 'Total forks across all public repositories',
      followers: 'Number of followers',
      commits: 'Total commits in the last year (approximate)'
    },
    percentiles: {
      'Top 1%': '≥99th percentile',
      'Top 5%': '95th-98th percentile',
      'Top 10%': '90th-94th percentile',
      'Top 25%': '75th-89th percentile',
      'Top 50%': '50th-74th percentile',
      'Above Average': '25th-49th percentile',
      'Average': '<25th percentile'
    },
    cacheInfo: rankingService.getCacheInfo()
  });
});

module.exports = router;
