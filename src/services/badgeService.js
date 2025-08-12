class BadgeService {
  constructor() {
    this.styles = {
      flat: {
        height: 20,
        borderRadius: 3,
        fontSize: 11,
        fontFamily: 'Consolas,Monaco,"Ubuntu Mono",monospace'
      },
      'flat-square': {
        height: 20,
        borderRadius: 0,
        fontSize: 11,
        fontFamily: 'Consolas,Monaco,"Ubuntu Mono",monospace'
      },
      'for-the-badge': {
        height: 28,
        borderRadius: 4,
        fontSize: 11,
        fontFamily: 'Consolas,Monaco,"Ubuntu Mono",monospace',
        fontWeight: 'bold'
      },
      plastic: {
        height: 18,
        borderRadius: 4,
        fontSize: 10,
        fontFamily: 'Consolas,Monaco,"Ubuntu Mono",monospace'
      }
    };

    // Hacker-style color schemes
    this.colorSchemes = {
      dark: {
        background: '#0d1117',
        leftBg: '#161b22',
        textColor: '#f0f6fc',
        iconColor: '#7c3aed',
        shadow: 'rgba(0, 255, 127, 0.3)',
        accent: '#00ff7f',
        rankColors: {
          'Top 1%': '#ff0080',    // Neon Pink
          'Top 5%': '#ff4500',    // Neon Orange  
          'Top 10%': '#00ffff',   // Cyan
          'Top 25%': '#00ff7f',   // Neon Green
          'Top 50%': '#9370db',   // Purple
          'Above Average': '#4169e1', // Royal Blue
          'Getting Started': '#696969'  // Dim Gray
        }
      },
      light: {
        background: '#ffffff',
        leftBg: '#f6f8fa',
        textColor: '#24292f',
        iconColor: '#0969da',
        shadow: 'rgba(0, 0, 0, 0.1)',
        accent: '#0969da',
        rankColors: {
          'Top 1%': '#d1242f',
          'Top 5%': '#fb8500',
          'Top 10%': '#0969da',
          'Top 25%': '#1a7f37',
          'Top 50%': '#8250df',
          'Above Average': '#656d76',
          'Getting Started': '#8b949e'
        }
      }
    };
  }
  
  generateSVG(badgeData) {
    const { user, metric, value, rank, style, country, theme = 'dark' } = badgeData;
    const styleConfig = this.styles[style] || this.styles.flat;
    const colorScheme = this.colorSchemes[theme] || this.colorSchemes.dark;
    
    // Create badge text
    const leftText = this.formatMetricName(metric);
    const rightText = this.formatRankText(rank, value);
    
    // Calculate text widths (approximate)
    const leftWidth = this.calculateTextWidth(leftText, styleConfig.fontSize);
    const rightWidth = this.calculateTextWidth(rightText, styleConfig.fontSize);
    
    const leftBgColor = colorScheme.leftBg;
    const rightBgColor = colorScheme.rankColors[rank.description] || rank.badge_color;
    
    const totalWidth = leftWidth + rightWidth + 50; // Extra space for icon and padding
    const height = styleConfig.height;
    
    // Enhanced GitHub Octocat SVG with better positioning
    const octocatIcon = this.getOctocatSVG(colorScheme.iconColor, height);
    
    // Create glowing effect for dark theme
    const glowEffect = theme === 'dark' ? this.createGlowEffect(rightBgColor) : '';
    
    // Text positioning
    const leftTextX = 32; // After icon space
    const rightTextX = leftWidth + 45; // After left section + padding
    const textY = height / 2;
    const leftTextColor = colorScheme.textColor;
    const rightTextColor = theme === 'dark' ? '#ffffff' : '#24292f';
    const glowIntensity = 3;
    
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" viewBox="0 0 ${totalWidth} ${height}">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${colorScheme.background};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${this.darkenColor(colorScheme.background, 0.1)};stop-opacity:1" />
        </linearGradient>
        <linearGradient id="leftGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${leftBgColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${this.darkenColor(leftBgColor, 0.1)};stop-opacity:1" />
        </linearGradient>
        <linearGradient id="rightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${rightBgColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${this.darkenColor(rightBgColor, 0.2)};stop-opacity:1" />
        </linearGradient>
        ${glowEffect}
        ${style === 'plastic' ? this.getPlasticFilter() : ''}
      </defs>
      
      <!-- Main background with rounded corners -->
      <rect x="0" y="0" width="${totalWidth}" height="${height}" 
            fill="url(#bgGradient)" 
            rx="${styleConfig.borderRadius + 2}" 
            ry="${styleConfig.borderRadius + 2}"
            ${theme === 'dark' ? `stroke="${colorScheme.accent}" stroke-width="0.5" opacity="0.8"` : ''}/>
      
      <!-- Left section (metric + icon) -->
      <rect x="2" y="2" width="${leftWidth + 40}" height="${height - 4}" 
            fill="url(#leftGradient)" 
            rx="${styleConfig.borderRadius}" 
            ry="${styleConfig.borderRadius}"/>
      
      <!-- Right section (rank) -->
      <rect x="${leftWidth + 42}" y="2" width="${rightWidth + 6}" height="${height - 4}" 
            fill="url(#rightGradient)" 
            rx="${styleConfig.borderRadius}" 
            ry="${styleConfig.borderRadius}"
            ${theme === 'dark' && glowEffect ? 'filter="url(#glow)"' : ''}/>
      
      <!-- Octocat Icon -->
      ${octocatIcon}
      
      <!-- Left text (metric name) -->
      <text x="${leftTextX}" y="${textY}" 
            text-anchor="start" 
            dominant-baseline="central" 
            fill="${leftTextColor}" 
            font-family="${styleConfig.fontFamily}" 
            font-size="${styleConfig.fontSize}px"
            ${theme === 'dark' && glowIntensity > 0 ? `style="text-shadow: 0 0 ${glowIntensity}px rgba(0,255,127,0.3)"` : ''}>
        ${metric.charAt(0).toUpperCase() + metric.slice(1)}
      </text>
      
      <!-- Right text (rank) -->
      <text x="${rightTextX}" y="${textY}" 
            text-anchor="start" 
            dominant-baseline="central" 
            fill="${rightTextColor}" 
            font-family="${styleConfig.fontFamily}" 
            font-size="${styleConfig.fontSize}px"
            ${theme === 'dark' && glowIntensity > 0 ? `style="text-shadow: 0 0 ${glowIntensity * 1.5}px rgba(0,0,0,0.8)"` : ''}>
        ${rank.description}
      </text>      <!-- Subtle highlight for depth -->
      <rect x="2" y="2" width="${totalWidth - 4}" height="1" 
            fill="rgba(255,255,255,0.1)" 
            rx="${styleConfig.borderRadius}" 
            ry="${styleConfig.borderRadius}"/>
            
    </svg>`.trim();
    
    return svg;
  }
  
  formatMetricName(metric) {
    const names = {
      stars: 'Stars',
      forks: 'Forks',
      followers: 'Followers', 
      commits: 'Commits'
    };
    return names[metric] || metric.toUpperCase();
  }
  
  formatRankText(rank, value) {
    // Format large numbers
    let formattedValue;
    if (value >= 1000000) {
      formattedValue = (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      formattedValue = (value / 1000).toFixed(1) + 'K';
    } else {
      formattedValue = value.toString();
    }
    
    return `${rank.description} (${formattedValue})`;
  }
  
  calculateTextWidth(text, fontSize) {
    // More accurate text width calculation for monospace fonts
    const avgCharWidth = fontSize * 0.55; // Monospace character width
    return text.length * avgCharWidth;
  }
  
  // Enhanced Octocat SVG with better design
  getOctocatSVG(color, height) {
    const iconSize = Math.min(height - 6, 16);
    const yOffset = (height - iconSize) / 2;
    
    return `
      <g transform="translate(8, ${yOffset})">
        <path fill="${color}" d="M${iconSize/2} 0C${iconSize/2*0.44} 0 0 ${iconSize/2*0.44} 0 ${iconSize/2}c0 ${iconSize/2*0.44} ${iconSize/2*0.29} ${iconSize/2*0.81} ${iconSize/2*0.69} ${iconSize/2*0.94}.${iconSize/2*0.06}.${iconSize/2*0.01}.${iconSize/2*0.07}-.${iconSize/2*0.03}.${iconSize/2*0.07}-.${iconSize/2*0.06}v-.${iconSize/2*0.2}c-.${iconSize/2*0.29} .${iconSize/2*0.06}-.${iconSize/2*0.34}-.${iconSize/2*0.14}-.${iconSize/2*0.34}-.${iconSize/2*0.14}-.${iconSize/2*0.04}-.${iconSize/2*0.11}-.${iconSize/2*0.11}-.${iconSize/2*0.14}-.${iconSize/2*0.11}-.${iconSize/2*0.14}-.${iconSize/2*0.1}.${iconSize/2*0.01}-.${iconSize/2*0.07}.${iconSize/2*0.01}-.${iconSize/2*0.07}.${iconSize/2*0.11}.${iconSize/2*0.01} ${iconSize/2*0.17}.${iconSize/2*0.11} ${iconSize/2*0.17}.${iconSize/2*0.11}.${iconSize/2*0.1} ${iconSize/2*0.17} ${iconSize/2*0.26}.${iconSize/2*0.13} ${iconSize/2*0.31}.${iconSize/2*0.1}-.${iconSize/2*0.03} ${iconSize/2*0.04}-.${iconSize/2*0.13} ${iconSize/2*0.07}-.${iconSize/2*0.16}-${iconSize/2*0.26}-.${iconSize/2*0.03}-${iconSize/2*0.51}-.${iconSize/2*0.13}-${iconSize/2*0.51} 0-.${iconSize/2*0.13} ${iconSize/2*0.04}-.${iconSize/2*0.23} ${iconSize/2*0.11}-.${iconSize/2*0.31}-.${iconSize/2*0.01}-.${iconSize/2*0.03}-.${iconSize/2*0.06}-.${iconSize/2*0.14} .${iconSize/2*0.01}-.${iconSize/2*0.3} 0 0 .${iconSize/2*0.1}-.${iconSize/2*0.03} ${iconSize/2*0.31}.${iconSize/2*0.11}.${iconSize/2*0.09}-.${iconSize/2*0.03} ${iconSize/2*0.19}-.${iconSize/2*0.04} ${iconSize/2*0.29}-.${iconSize/2*0.04}s.${iconSize/2*0.2} .${iconSize/2*0.01} ${iconSize/2*0.29} .${iconSize/2*0.04}c${iconSize/2*0.21}-.${iconSize/2*0.14} ${iconSize/2*0.31}-.${iconSize/2*0.11} ${iconSize/2*0.31}-.${iconSize/2*0.11}.${iconSize/2*0.07} ${iconSize/2*0.16} .${iconSize/2*0.03} ${iconSize/2*0.27} .${iconSize/2*0.01} ${iconSize/2*0.3}.${iconSize/2*0.07}.${iconSize/2*0.09} .${iconSize/2*0.11} ${iconSize/2*0.19} .${iconSize/2*0.11} ${iconSize/2*0.31} 0 ${iconSize/2*0.44}-.${iconSize/2*0.27} ${iconSize/2*0.54}-.${iconSize/2*0.53} ${iconSize/2*0.57}.${iconSize/2*0.04}.${iconSize/2*0.04} .${iconSize/2*0.09}.${iconSize/2*0.11} .${iconSize/2*0.09} ${iconSize/2*0.21}v${iconSize/2*0.31}c0 .${iconSize/2*0.03} .${iconSize/2*0.01} .${iconSize/2*0.07} .${iconSize/2*0.07} .${iconSize/2*0.06}C${iconSize/2*1.71} ${iconSize/2*1.81} ${iconSize} ${iconSize/2*1.44} ${iconSize} ${iconSize/2}c0-.${iconSize/2*0.56}-.${iconSize/2*0.44}-${iconSize/2}-${iconSize/2}-${iconSize/2}z"/>
      </g>
    `;
  }
  
  // Create glow effect for dark theme
  createGlowEffect(color) {
    return `
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/> 
        </feMerge>
      </filter>
    `;
  }
  
  // Utility function to darken colors
  darkenColor(color, factor) {
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const num = parseInt(hex, 16);
      const r = Math.floor((num >> 16) * (1 - factor));
      const g = Math.floor(((num >> 8) & 0x00FF) * (1 - factor));
      const b = Math.floor((num & 0x0000FF) * (1 - factor));
      return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    }
    return color;
  }
  
  getPlasticFilter() {
    return `
      <filter id="plastic">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
        <feOffset dx="0" dy="1" result="offset"/>
        <feFlood flood-color="#000000" flood-opacity="0.2"/>
        <feComposite in2="offset" operator="in"/>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    `;
  }
  
  // Alternative badge layouts for different use cases
  generateCompactSVG(badgeData) {
    const { user, metric, value, rank, style } = badgeData;
    const styleConfig = this.styles[style] || this.styles.flat;
    
    // Simplified compact version
    const text = `${rank.description}`;
    const width = this.calculateTextWidth(text, styleConfig.fontSize) + 30;
    const height = styleConfig.height;
    
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect x="0" y="0" width="${width}" height="${height}" fill="${rank.badge_color}" rx="${styleConfig.borderRadius}" ry="${styleConfig.borderRadius}"/>
      <text x="${width / 2}" y="${height / 2}" 
            text-anchor="middle" 
            dominant-baseline="central" 
            fill="white" 
            font-family="${styleConfig.fontFamily}" 
            font-size="${styleConfig.fontSize}px">
        ${text}
      </text>
    </svg>`.trim();
    
    return svg;
  }
  
  // Generate PNG badge (requires additional dependencies like sharp or node-canvas)
  async generatePNG(badgeData) {
    // This would require additional dependencies
    // For now, return SVG converted to base64 data URL
    const svg = this.generateSVG(badgeData);
    const base64 = Buffer.from(svg).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
  }
  
  getSupportedStyles() {
    return Object.keys(this.styles);
  }
  
  getStyleInfo() {
    return this.styles;
  }
}

module.exports = new BadgeService();
