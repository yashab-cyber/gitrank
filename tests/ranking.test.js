const rankingService = require('../src/services/rankingService');

describe('RankingService', () => {
  
  describe('calculateRank', () => {
    const mockUserData = {
      metrics: {
        stars: 1000,
        forks: 250,
        followers: 150,
        commits: 300
      }
    };
    
    it('should calculate correct rank for stars', () => {
      const rank = rankingService.calculateRank(mockUserData, 'stars');
      
      expect(rank).toHaveProperty('metric', 'stars');
      expect(rank).toHaveProperty('value', 1000);
      expect(rank).toHaveProperty('percentile');
      expect(rank).toHaveProperty('description');
      expect(rank).toHaveProperty('badge_color');
      expect(rank).toHaveProperty('tier');
    });
    
    it('should rank high star counts correctly', () => {
      const highStarUser = {
        metrics: { stars: 15000 }
      };
      
      const rank = rankingService.calculateRank(highStarUser, 'stars');
      expect(rank.description).toBe('Top 1%');
      expect(rank.percentile).toBe(99);
    });
    
    it('should rank low counts correctly', () => {
      const lowStarUser = {
        metrics: { stars: 2 }
      };
      
      const rank = rankingService.calculateRank(lowStarUser, 'stars');
      expect(rank.description).toBe('Getting Started');
      expect(rank.percentile).toBe(10);
    });
    
    it('should throw error for invalid metric', () => {
      expect(() => {
        rankingService.calculateRank(mockUserData, 'invalid');
      }).toThrow('Unknown metric: invalid');
    });
    
    it('should apply country multiplier', () => {
      const rankWithoutCountry = rankingService.calculateRank(mockUserData, 'stars');
      const rankWithCountry = rankingService.calculateRank(mockUserData, 'stars', 'united states');
      
      expect(rankWithCountry.percentile).toBeGreaterThanOrEqual(rankWithoutCountry.percentile);
    });
  });
  
  describe('getNextTierThreshold', () => {
    it('should return next tier information', () => {
      const benchmarks = rankingService.benchmarks.stars;
      const nextTier = rankingService.getNextTierThreshold(50, benchmarks);
      
      expect(nextTier).toHaveProperty('name');
      expect(nextTier).toHaveProperty('value');
      expect(nextTier).toHaveProperty('needed');
    });
    
    it('should return null for top tier', () => {
      const benchmarks = rankingService.benchmarks.stars;
      const nextTier = rankingService.getNextTierThreshold(20000, benchmarks);
      
      expect(nextTier).toBeNull();
    });
  });
  
});
