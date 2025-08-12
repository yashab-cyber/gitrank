# GitRank Live 🚀

> **Real-time GitHub ranking badge generator** - Generate dynamic SVG badges that show your GitHub ranking based on stars, forks, followers, or commits!

[![GitHub Stars](https://img.shields.io/github/stars/yashab-cyber/gitrank?style=for-the-badge)](https://github.com/yashab-cyber/gitrank)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg?style=for-the-badge)](https://nodejs.org)
[![Donate](https://img.shields.io/badge/💰-Support%20Development-ff69b4.svg?style=for-the-badge)](DONATE.md)

## ✨ Features

- 🏆 **Real-time GitHub ranking** - Compare your stats against millions of developers
- 📊 **Multiple metrics** - Stars, forks, followers, and commits
- 🎨 **Customizable badges** - 4 different styles (flat, flat-square, for-the-badge, plastic)
- 🌍 **Country-based ranking** - Optional regional comparisons
- ⚡ **Lightning fast** - Responds in under 500ms with smart caching
- 🔒 **Rate-limited** - Respects GitHub API limits with intelligent caching
- 🚀 **Zero-config deployment** - Ready for Vercel, Railway, or Docker

## 🎯 Quick Start

### 1. Using the Badge (Hosted)
```markdown
![GitRank Live](https://gitrank.zehrasec.com/api/badge?user=octocat&metric=stars)
![GitHub Followers Rank](https://gitrank.zehrasec.com/api/badge?user=octocat&metric=followers&style=for-the-badge)
```

### 2. Run Locally
```bash
# Clone the repository
git clone https://github.com/yashab-cyber/gitrank.git
cd gitrank

# Install dependencies  
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your GitHub token (optional but recommended)

# Start the server
npm run dev
```

### 3. Docker
```bash
# Build and run with Docker
docker build -t gitrank .
docker run -p 3000:3000 --env-file .env gitrank

# Or use Docker Compose
docker-compose up
```

## 📖 API Reference

### Badge Endpoint
```
GET /api/badge?user={username}&metric={metric}&style={style}&country={country}
```

**Parameters:**
- `user` (required): GitHub username
- `metric` (optional): `stars` | `forks` | `followers` | `commits` (default: `stars`)
- `style` (optional): `flat` | `flat-square` | `for-the-badge` | `plastic` (default: `flat`)
- `country` (optional): Country name for regional ranking

**Response:** SVG badge with caching headers

### User Stats Endpoint
```
GET /api/stats/{username}
```
Returns detailed user statistics in JSON format.

### Ranking Info Endpoint  
```
GET /api/ranking-info
```
Returns information about ranking algorithms and percentiles.

## 🏆 Ranking System

GitRank Live calculates percentiles based on these benchmarks:

| Metric | Top 1% | Top 5% | Top 10% | Top 25% | Top 50% |
|--------|--------|--------|---------|---------|---------|
| **Stars** | 10,000+ | 2,000+ | 500+ | 100+ | 20+ |
| **Forks** | 2,000+ | 500+ | 100+ | 25+ | 5+ |
| **Followers** | 5,000+ | 1,000+ | 300+ | 50+ | 10+ |
| **Commits** | 2,000+ | 500+ | 200+ | 50+ | 20+ |

## 🎨 Badge Styles

### Flat (default)
```markdown
![Flat Style](https://gitrank.zehrasec.com/api/badge?user=octocat&metric=stars&style=flat)
```

### Flat Square
```markdown
![Flat Square](https://gitrank.zehrasec.com/api/badge?user=octocat&metric=stars&style=flat-square)
```

### For The Badge
```markdown
![For The Badge](https://gitrank.zehrasec.com/api/badge?user=octocat&metric=stars&style=for-the-badge)
```

### Plastic
```markdown
![Plastic](https://gitrank.zehrasec.com/api/badge?user=octocat&metric=stars&style=plastic)
```

## 🌍 Regional Rankings

Add country-specific rankings by including the `country` parameter:

```markdown
![US Ranking](https://gitrank.zehrasec.com/api/badge?user=octocat&metric=followers&country=united+states)
![India Ranking](https://gitrank.zehrasec.com/api/badge?user=octocat&metric=stars&country=india)
```

Supported countries: United States, China, India, Germany, United Kingdom, Canada, France, Japan, Brazil, Russia, and more.

## ⚡ Performance & Caching

- **Smart caching**: User data cached for 12 hours
- **Rate limiting**: 1000 requests per hour per IP
- **GitHub API optimization**: Efficient pagination and data fetching
- **CDN ready**: Perfect for global deployment

## 🚀 Deployment

### Vercel (Recommended)
1. Fork this repository
2. Connect to Vercel
3. Add environment variables:
   - `GITHUB_TOKEN`: Your GitHub personal access token (optional)
4. Deploy!

### Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/yashab-cyber/gitrank)

### Render
1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables

### Docker
```bash
docker build -t gitrank .
docker run -p 3000:3000 -e GITHUB_TOKEN=your_token gitrank
```

## 🔧 Environment Variables

```env
# Required
PORT=3000                    # Server port
NODE_ENV=production         # Environment

# Optional
GITHUB_TOKEN=your_token     # GitHub personal access token (recommended)
CACHE_TTL=43200            # Cache duration in seconds (12 hours)
RATE_LIMIT_WINDOW=3600000  # Rate limit window in ms (1 hour)
RATE_LIMIT_MAX=1000        # Max requests per window
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test tests/api.test.js
```

## 📊 Usage Examples

### Personal Profile README
```markdown
## 🏆 My GitHub Stats

![Stars Ranking](https://gitrank.zehrasec.com/api/badge?user=yourusername&metric=stars&style=for-the-badge)
![Followers Ranking](https://gitrank.zehrasec.com/api/badge?user=yourusername&metric=followers&style=for-the-badge)
![Commits Ranking](https://gitrank.zehrasec.com/api/badge?user=yourusername&metric=commits&style=for-the-badge)
```

### Repository Badges
```markdown
![Maintainer Stars](https://gitrank.zehrasec.com/api/badge?user=maintainer&metric=stars)
![Maintainer Followers](https://gitrank.zehrasec.com/api/badge?user=maintainer&metric=followers)
```

### Organization Showcases
```markdown
## Team Rankings
![CEO GitHub Rank](https://gitrank.zehrasec.com/api/badge?user=ceo&metric=followers&style=flat-square)
![CTO GitHub Rank](https://gitrank.zehrasec.com/api/badge?user=cto&metric=stars&style=flat-square)
```

## 🔄 API Rate Limits

GitRank Live handles GitHub API rate limits intelligently:

- **Without token**: 60 requests/hour per IP (GitHub limit)
- **With token**: 5,000 requests/hour (GitHub limit)
- **Caching**: 12-hour cache reduces API calls by 95%
- **Smart batching**: Efficient data fetching strategies

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 Changelog

### v1.0.0 (2024-12-27)
- ✨ Initial release
- 🏆 GitHub ranking system
- 📊 Four metrics: stars, forks, followers, commits
- 🎨 Four badge styles
- 🌍 Country-based rankings
- ⚡ Performance optimizations
- 🚀 Multi-platform deployment support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- GitHub for providing the excellent API
- The open-source community for inspiration
- All contributors and users of GitRank Live

## 👨‍💻 Developer

**GitRank Live** is created and maintained by **Yashab Alam**, Founder & CEO of ZehraSec.

### 🌐 Connect with Yashab Alam
- 💻 **GitHub**: [@yashab-cyber](https://github.com/yashab-cyber)
- 📸 **Instagram**: [@yashab.alam](https://www.instagram.com/yashab.alam)
- 💼 **LinkedIn**: [Yashab Alam](https://www.linkedin.com/in/yashab-alam)

### 🏢 ZehraSec - Official Company
- 🌐 **Website**: [www.zehrasec.com](https://www.zehrasec.com)
- 📸 **Instagram**: [@_zehrasec](https://www.instagram.com/_zehrasec?igsh=bXM0cWl1ejdoNHM4)
- 📘 **Facebook**: [ZehraSec Official](https://www.facebook.com/profile.php?id=61575580721849)
- 🐦 **X (Twitter)**: [@zehrasec](https://x.com/zehrasec?t=Tp9LOesZw2d2yTZLVo0_GA&s=08)
- 💼 **LinkedIn**: [ZehraSec Company](https://www.linkedin.com/company/zehrasec)
- 💬 **WhatsApp**: [Business Channel](https://whatsapp.com/channel/0029Vaoa1GfKLaHlL0Kc8k1q)

### 💰 Support Development
Love GitRank Live? Your support helps maintain and improve this project!

**[📝 View Donation Options](DONATE.md)** - Multiple payment methods available including crypto and PayPal

[![Donate](https://img.shields.io/badge/💰-Support%20Development-ff69b4.svg?style=for-the-badge)](DONATE.md)

## 📞 Support

- 🐛 **Bug reports**: [GitHub Issues](https://github.com/yashab-cyber/gitrank/issues)
- 💡 **Feature requests**: [GitHub Discussions](https://github.com/yashab-cyber/gitrank/discussions)
- 📧 **Email**: support@gitrank.live
- 💬 **Twitter**: [@GitRankLive](https://twitter.com/GitRankLive)

---

<div align="center">

**[🌟 Star this repository](https://github.com/yashab-cyber/gitrank) if you found it helpful!**

Made with ❤️ by [Yashab Alam](https://github.com/yashab-cyber) ([@ZehraSec](https://www.zehrasec.com))

**[💰 Support Development](DONATE.md)** | **[🌐 ZehraSec Website](https://www.zehrasec.com)**

</div>
