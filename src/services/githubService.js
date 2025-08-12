const axios = require('axios');
const NodeCache = require('node-cache');

// Cache for 12 hours (43200 seconds)
const cache = new NodeCache({ 
  stdTTL: parseInt(process.env.CACHE_TTL) || 43200,
  checkperiod: 3600 // Check for expired keys every hour
});

class GitHubService {
  constructor() {
    this.baseURL = 'https://api.github.com';
    this.token = process.env.GITHUB_TOKEN;
    this.headers = {
      'User-Agent': 'GitRank-Live/1.0.0',
      'Accept': 'application/vnd.github.v3+json'
    };
    
    if (this.token) {
      this.headers.Authorization = `token ${this.token}`;
    }
  }
  
  async makeRequest(url, params = {}) {
    try {
      const response = await axios.get(url, {
        headers: this.headers,
        params,
        timeout: 10000
      });
      
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('User not found');
      }
      if (error.response?.status === 403) {
        throw new Error('GitHub API rate limit exceeded');
      }
      if (error.response?.status === 401) {
        throw new Error('GitHub API authentication failed');
      }
      
      console.error('GitHub API error:', error.message);
      throw new Error(`GitHub API error: ${error.message}`);
    }
  }
  
  async getUserProfile(username) {
    const cacheKey = `profile_${username}`;
    let profile = cache.get(cacheKey);
    
    if (profile) {
      console.log(`📋 Using cached profile for ${username}`);
      return profile;
    }
    
    console.log(`🌐 Fetching profile for ${username}`);
    profile = await this.makeRequest(`${this.baseURL}/users/${username}`);
    
    cache.set(cacheKey, profile);
    return profile;
  }
  
  async getUserRepositories(username) {
    const cacheKey = `repos_${username}`;
    let repos = cache.get(cacheKey);
    
    if (repos) {
      console.log(`📋 Using cached repositories for ${username}`);
      return repos;
    }
    
    console.log(`🌐 Fetching repositories for ${username}`);
    const allRepos = [];
    let page = 1;
    const perPage = 100;
    
    while (true) {
      const repos = await this.makeRequest(`${this.baseURL}/users/${username}/repos`, {
        page,
        per_page: perPage,
        type: 'public',
        sort: 'updated'
      });
      
      if (repos.length === 0) break;
      
      allRepos.push(...repos);
      
      if (repos.length < perPage) break;
      page++;
      
      // Safety limit to prevent infinite loops
      if (page > 50) break;
    }
    
    cache.set(cacheKey, allRepos);
    return allRepos;
  }
  
  async getUserCommitActivity(username) {
    const cacheKey = `commits_${username}`;
    let commits = cache.get(cacheKey);
    
    if (commits) {
      console.log(`📋 Using cached commit activity for ${username}`);
      return commits;
    }
    
    console.log(`🌐 Fetching commit activity for ${username}`);
    
    // Get commits from the last year
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    try {
      // Use search API to get commit count (approximation)
      const searchQuery = `author:${username} committer-date:>${oneYearAgo.toISOString().split('T')[0]}`;
      const response = await this.makeRequest(`${this.baseURL}/search/commits`, {
        q: searchQuery,
        per_page: 1
      });
      
      commits = response.total_count || 0;
    } catch (error) {
      console.warn(`Could not fetch commit activity for ${username}:`, error.message);
      // Fallback: estimate based on recent repositories
      commits = 0;
    }
    
    cache.set(cacheKey, commits);
    return commits;
  }
  
  async getUserData(username) {
    try {
      console.log(`📊 Collecting data for ${username}`);
      
      const [profile, repositories] = await Promise.all([
        this.getUserProfile(username),
        this.getUserRepositories(username)
      ]);
      
      // Calculate metrics from repositories
      const totalStars = repositories.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
      const totalForks = repositories.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
      
      // Get commit activity (with fallback)
      let totalCommits = 0;
      try {
        totalCommits = await this.getUserCommitActivity(username);
      } catch (error) {
        console.warn(`Using fallback for commit count: ${error.message}`);
        // Fallback: rough estimate based on recent repository activity
        totalCommits = Math.floor(repositories.length * 10); // Very rough estimate
      }
      
      const userData = {
        login: profile.login,
        name: profile.name,
        avatar_url: profile.avatar_url,
        created_at: profile.created_at,
        updated_at: profile.updated_at,
        location: profile.location,
        company: profile.company,
        metrics: {
          stars: totalStars,
          forks: totalForks,
          followers: profile.followers,
          commits: totalCommits
        },
        repositories: {
          total: profile.public_repos,
          details: repositories.slice(0, 10) // Keep only top 10 for cache efficiency
        },
        lastFetched: new Date().toISOString()
      };
      
      console.log(`✅ Data collected for ${username}:`, {
        stars: totalStars,
        forks: totalForks,
        followers: profile.followers,
        commits: totalCommits
      });
      
      return userData;
      
    } catch (error) {
      console.error(`Failed to fetch data for ${username}:`, error.message);
      throw error;
    }
  }
  
  getCacheStats() {
    return {
      keys: cache.keys().length,
      stats: cache.getStats(),
      memoryUsage: process.memoryUsage()
    };
  }
  
  clearCache() {
    cache.flushAll();
    console.log('🗑️ Cache cleared');
  }
}

module.exports = new GitHubService();
