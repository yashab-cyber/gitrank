const NodeCache = require('node-cache');

// Cache for ranking statistics (24 hours)
const statsCache = new NodeCache({ 
  stdTTL: 86400, // 24 hours
  checkperiod: 3600
});

class RankingService {
  constructor() {
    this.benchmarks = {
      stars: {
        // Based on GitHub statistics and research
        top1: 10000,    // Top 1% have 10k+ stars
        top5: 2000,     // Top 5% have 2k+ stars  
        top10: 500,     // Top 10% have 500+ stars
        top25: 100,     // Top 25% have 100+ stars
        top50: 20,      // Top 50% have 20+ stars
        average: 5      // Above average: 5+ stars
      },
      forks: {
        top1: 2000,     // Top 1% have 2k+ forks
        top5: 500,      // Top 5% have 500+ forks
        top10: 100,     // Top 10% have 100+ forks
        top25: 25,      // Top 25% have 25+ forks
        top50: 5,       // Top 50% have 5+ forks
        average: 1      // Above average: 1+ forks
      },
      followers: {
        top1: 5000,     // Top 1% have 5k+ followers
        top5: 1000,     // Top 5% have 1k+ followers
        top10: 300,     // Top 10% have 300+ followers
        top25: 50,      // Top 25% have 50+ followers
        top50: 10,      // Top 50% have 10+ followers
        average: 2      // Above average: 2+ followers
      },
      commits: {
        top1: 2000,     // Top 1% have 2k+ commits/year
        top5: 500,      // Top 5% have 500+ commits/year
        top10: 200,     // Top 10% have 200+ commits/year
        top25: 50,      // Top 25% have 50+ commits/year
        top50: 20,      // Top 50% have 20+ commits/year
        average: 5      // Above average: 5+ commits/year
      }
    };
    
    this.countryMultipliers = {
      // Adjust rankings based on country developer density
      // These are rough estimates - in reality, you'd want more sophisticated data
      'united states': 1.2,
      'china': 1.1,
      'india': 1.0,
      'germany': 1.1,
      'united kingdom': 1.1,
      'canada': 1.1,
      'france': 1.1,
      'japan': 1.1,
      'brazil': 1.0,
      'russia': 1.0,
      'default': 1.0
    };
  }
  
  calculateRank(userData, metric, country = null) {
    const value = userData.metrics[metric];
    const benchmarks = this.benchmarks[metric];
    
    if (!benchmarks) {
      throw new Error(`Unknown metric: ${metric}`);
    }
    
    let percentile;
    let description;
    let badge_color;
    let tier;
    
    // Determine rank based on value
    if (value >= benchmarks.top1) {
      percentile = 99;
      description = 'Top 1%';
      badge_color = '#ff6b35'; // Bright orange/red
      tier = 'elite';
    } else if (value >= benchmarks.top5) {
      percentile = 95;
      description = 'Top 5%';
      badge_color = '#ff8500'; // Orange
      tier = 'expert';
    } else if (value >= benchmarks.top10) {
      percentile = 90;
      description = 'Top 10%';
      badge_color = '#ffb000'; // Yellow-orange
      tier = 'advanced';
    } else if (value >= benchmarks.top25) {
      percentile = 75;
      description = 'Top 25%';
      badge_color = '#4CAF50'; // Green
      tier = 'proficient';
    } else if (value >= benchmarks.top50) {
      percentile = 50;
      description = 'Top 50%';
      badge_color = '#2196F3'; // Blue
      tier = 'intermediate';
    } else if (value >= benchmarks.average) {
      percentile = 25;
      description = 'Above Average';
      badge_color = '#9C27B0'; // Purple
      tier = 'developing';
    } else {
      percentile = 10;
      description = 'Getting Started';
      badge_color = '#607D8B'; // Blue-grey
      tier = 'beginner';
    }
    
    // Apply country multiplier if specified
    if (country) {
      const countryKey = country.toLowerCase();
      const multiplier = this.countryMultipliers[countryKey] || this.countryMultipliers.default;
      percentile = Math.min(99, Math.round(percentile * multiplier));
    }
    
    return {
      metric,
      value,
      percentile,
      description,
      badge_color,
      tier,
      country,
      benchmarks: {
        next_tier: this.getNextTierThreshold(value, benchmarks),
        current_tier: this.getCurrentTierInfo(value, benchmarks)
      },
      calculated_at: new Date().toISOString()
    };
  }
  
  getNextTierThreshold(currentValue, benchmarks) {
    const thresholds = [
      { name: 'Top 1%', value: benchmarks.top1 },
      { name: 'Top 5%', value: benchmarks.top5 },
      { name: 'Top 10%', value: benchmarks.top10 },
      { name: 'Top 25%', value: benchmarks.top25 },
      { name: 'Top 50%', value: benchmarks.top50 },
      { name: 'Above Average', value: benchmarks.average }
    ];
    
    for (const threshold of thresholds) {
      if (currentValue < threshold.value) {
        return {
          name: threshold.name,
          value: threshold.value,
          needed: threshold.value - currentValue
        };
      }
    }
    
    return null; // Already at top tier
  }
  
  getCurrentTierInfo(currentValue, benchmarks) {
    if (currentValue >= benchmarks.top1) return { name: 'Top 1%', min: benchmarks.top1 };
    if (currentValue >= benchmarks.top5) return { name: 'Top 5%', min: benchmarks.top5 };
    if (currentValue >= benchmarks.top10) return { name: 'Top 10%', min: benchmarks.top10 };
    if (currentValue >= benchmarks.top25) return { name: 'Top 25%', min: benchmarks.top25 };
    if (currentValue >= benchmarks.top50) return { name: 'Top 50%', min: benchmarks.top50 };
    if (currentValue >= benchmarks.average) return { name: 'Above Average', min: benchmarks.average };
    return { name: 'Getting Started', min: 0 };
  }
  
  getMetricDistribution(metric) {
    const cacheKey = `distribution_${metric}`;
    let distribution = statsCache.get(cacheKey);
    
    if (distribution) {
      return distribution;
    }
    
    // Generate sample distribution data
    // In a real implementation, this would come from actual GitHub data
    const benchmarks = this.benchmarks[metric];
    distribution = {
      metric,
      total_users_estimated: 100000000, // ~100M GitHub users
      percentile_breakdown: {
        'top_1_percent': { min: benchmarks.top1, users: 1000000 },
        'top_5_percent': { min: benchmarks.top5, users: 5000000 },
        'top_10_percent': { min: benchmarks.top10, users: 10000000 },
        'top_25_percent': { min: benchmarks.top25, users: 25000000 },
        'top_50_percent': { min: benchmarks.top50, users: 50000000 },
        'above_average': { min: benchmarks.average, users: 75000000 }
      },
      last_updated: new Date().toISOString()
    };
    
    statsCache.set(cacheKey, distribution);
    return distribution;
  }
  
  getCacheInfo() {
    return {
      keys: statsCache.keys().length,
      stats: statsCache.getStats(),
      benchmarks_version: '1.0',
      supported_metrics: Object.keys(this.benchmarks),
      supported_countries: Object.keys(this.countryMultipliers)
    };
  }
  
  initializeCache() {
    console.log('🏆 Initializing ranking service');
    console.log(`📊 Supported metrics: ${Object.keys(this.benchmarks).join(', ')}`);
    console.log(`🌍 Country adjustments available for ${Object.keys(this.countryMultipliers).length - 1} countries`);
  }
  
  // Method to update benchmarks dynamically (for future use)
  updateBenchmarks(metric, newBenchmarks) {
    if (this.benchmarks[metric]) {
      this.benchmarks[metric] = { ...this.benchmarks[metric], ...newBenchmarks };
      console.log(`📈 Updated benchmarks for ${metric}`);
      // Clear related cache
      statsCache.del(`distribution_${metric}`);
    }
  }
}

module.exports = new RankingService();
