# GitRank Live - Hacker Edition ⚡

<div align="center">

![GitRank Live](https://img.shields.io/badge/GitRank-Live-00ff7f?style=for-the-badge&logo=github&logoColor=white)
[![License](https://img.shields.io/badge/license-MIT-cyan.svg?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg?style=for-the-badge&logo=node.js)](https://nodejs.org)

### 🎨 **Real-time GitHub ranking badges with hacker-style design**

*Generate dynamic SVG badges that show your GitHub ranking with neon colors, rounded corners, and the iconic Octocat*

</div>

---

## 🔥 **What's New in Hacker Edition**

- **🎨 Dark Theme**: Sleek hacker-style badges with neon green/cyan accents
- **☀️ Light Theme**: Clean light mode for versatile usage  
- **🔧 JSON API**: RESTful endpoint for developers to fetch raw ranking data
- **⚡ Enhanced Design**: Rounded corners, GitHub Octocat icon, improved typography
- **💻 Monospace Fonts**: Terminal-friendly font stack for that authentic hacker look

---

## 🚀 **Quick Start**

### 🏆 **Embed Your GitHub Rank**

```markdown
<!-- Dark Theme (Default) -->
![GitHub Stars](https://gitrank.zehrasec.com/api/badge?user=yourusername&metric=stars&theme=dark)
![GitHub Followers](https://gitrank.zehrasec.com/api/badge?user=yourusername&metric=followers&style=for-the-badge&theme=dark)

<!-- Light Theme -->
![GitHub Stars](https://gitrank.zehrasec.com/api/badge?user=yourusername&metric=stars&theme=light)
![GitHub Commits](https://gitrank.zehrasec.com/api/badge?user=yourusername&metric=commits&style=for-the-badge&theme=light)
```

### 🎨 **Badge Styles Showcase**

| Style | Dark Theme | Light Theme |
|-------|------------|-------------|
| **flat** | `?style=flat&theme=dark` | `?style=flat&theme=light` |
| **flat-square** | `?style=flat-square&theme=dark` | `?style=flat-square&theme=light` |
| **for-the-badge** | `?style=for-the-badge&theme=dark` | `?style=for-the-badge&theme=light` |
| **plastic** | `?style=plastic&theme=dark` | `?style=plastic&theme=light` |

---

## 🔌 **Developer API**

### 📊 **JSON Endpoint**
Get raw ranking data for your applications:

```bash
# Badge Generation (SVG)
curl "https://gitrank.zehrasec.com/api/badge?user=USERNAME&metric=stars&theme=dark"

# Raw Data (JSON)
curl "https://gitrank.zehrasec.com/api/rank?user=USERNAME&metric=stars"

# User Stats
curl "https://gitrank.zehrasec.com/api/stats/USERNAME"

# System Health
curl "https://gitrank.zehrasec.com/health"
```

```json
{
  "user": {
    "login": "octocat",
    "name": "The Octocat",
    "avatar_url": "https://github.com/images/error/octocat_happy.gif"
  },
  "metric": {
    "name": "stars",
    "value": 8123,
    "formatted": "8.1K"
  },
  "ranking": {
    "percentile": 95,
    "description": "Top 5%",
    "tier": "expert",
    "badge_color": "#ff8500"
  },
  "benchmarks": {
    "next_tier": {
      "name": "Top 1%",
      "value": 10000,
      "needed": 1877
    }
  },
  "all_metrics": {
    "stars": 8123,
    "forks": 2543,
    "followers": 4567,
    "commits": 1234
  }
}
```

### 🛠️ **API Endpoints**

| Endpoint | Description | Response |
|----------|-------------|-----------|
| `GET /api/badge` | Generate SVG badge | `image/svg+xml` |
| `GET /api/rank` | Get ranking data | `application/json` |
| `GET /api/stats/:user` | Get user statistics | `application/json` |
| `GET /health` | Health check | `application/json` |

---

## ⚙️ **Parameters**

### 🎯 **Badge Generation**
```
GET /api/badge?user={username}&metric={metric}&style={style}&theme={theme}
```

| Parameter | Required | Options | Default | Description |
|-----------|----------|---------|---------|-------------|
| `user` | ✅ | Any GitHub username | - | Target GitHub user |
| `metric` | ❌ | `stars`, `forks`, `followers`, `commits` | `stars` | Ranking metric |
| `style` | ❌ | `flat`, `flat-square`, `for-the-badge`, `plastic` | `flat` | Badge style |
| `theme` | ❌ | `dark`, `light` | `dark` | Color theme |
| `country` | ❌ | Country name | - | Regional ranking |

### 📊 **JSON API**
```
GET /api/rank?user={username}&metric={metric}
```

---

## 🎨 **Design Features**

### 🌙 **Dark Theme (Hacker Style)**
- **Background**: Deep space black (`#0d1117`)
- **Accents**: Neon green (`#00ff7f`) and cyan (`#00ffff`)
- **Typography**: Monospace fonts for terminal aesthetic
- **Effects**: Subtle glowing borders and text shadows

### ☀️ **Light Theme**
- **Background**: Clean white (`#ffffff`)  
- **Accents**: GitHub blue (`#0969da`)
- **Typography**: Same monospace fonts for consistency
- **Effects**: Subtle shadows and clean borders

### 🎯 **Visual Elements**
- **🐙 Octocat Icon**: Positioned on the left side of each badge
- **📊 Metric Display**: Clear metric name and ranking
- **🔢 Value Formatting**: Smart number formatting (1.2K, 5.6M)
- **🏆 Tier Colors**: Color-coded ranking tiers

---

## 🏆 **Ranking System**

| Tier | Percentile | Color (Dark) | Color (Light) | Requirements |
|------|------------|--------------|---------------|--------------|
| **Top 1%** | 99th | ![#ff0080](https://via.placeholder.com/15/ff0080/000000?text=+) Neon Pink | ![#d1242f](https://via.placeholder.com/15/d1242f/000000?text=+) Red | ⭐10K+ stars, 👥5K+ followers |
| **Top 5%** | 95th | ![#ff4500](https://via.placeholder.com/15/ff4500/000000?text=+) Neon Orange | ![#fb8500](https://via.placeholder.com/15/fb8500/000000?text=+) Orange | ⭐2K+ stars, 👥1K+ followers |
| **Top 10%** | 90th | ![#00ffff](https://via.placeholder.com/15/00ffff/000000?text=+) Cyan | ![#0969da](https://via.placeholder.com/15/0969da/000000?text=+) Blue | ⭐500+ stars, 👥300+ followers |
| **Top 25%** | 75th | ![#00ff7f](https://via.placeholder.com/15/00ff7f/000000?text=+) Neon Green | ![#1a7f37](https://via.placeholder.com/15/1a7f37/000000?text=+) Green | ⭐100+ stars, 👥50+ followers |
| **Top 50%** | 50th | ![#9370db](https://via.placeholder.com/15/9370db/000000?text=+) Purple | ![#8250df](https://via.placeholder.com/15/8250df/000000?text=+) Purple | ⭐20+ stars, 👥10+ followers |

---

## 🚀 **Installation & Deployment**

### 💻 **Local Development**
```bash
# Clone the repository
git clone https://github.com/yashab-cyber/gitrank.git
cd gitrank

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your GitHub token (optional but recommended)

# Start development server
npm run dev
```

### 🐳 **Docker**
```bash
# Build and run
docker build -t gitrank .
docker run -p 3000:3000 --env-file .env gitrank

# Or use Docker Compose
docker-compose up
```

### ☁️ **Cloud Deployment**

#### **Vercel** (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yashab-cyber/gitrank)

#### **Railway**
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/yashab-cyber/gitrank)

#### **Render**
1. Connect your GitHub repository
2. Set build command: `npm install`  
3. Set start command: `npm start`
4. Add environment variables

---

## 📖 **Usage Examples**

### 🏠 **Personal Profile README**
```markdown
<div align="center">

# Hi there! I'm [Your Name] 👋

## 🏆 My GitHub Rankings

![Stars](https://gitrank.zehrasec.com/api/badge?user=yourusername&metric=stars&style=for-the-badge&theme=dark)
![Followers](https://gitrank.zehrasec.com/api/badge?user=yourusername&metric=followers&style=for-the-badge&theme=dark)
![Commits](https://gitrank.zehrasec.com/api/badge?user=yourusername&metric=commits&style=for-the-badge&theme=dark)

*Real-time rankings updated every 12 hours*

</div>
```

### 🏢 **Repository Badges**
```markdown
## 👨‍💻 Maintainer Stats

[![Maintainer Stars](https://gitrank.zehrasec.com/api/badge?user=maintainer&metric=stars&theme=light)](https://github.com/maintainer)
[![Maintainer Followers](https://gitrank.zehrasec.com/api/badge?user=maintainer&metric=followers&theme=light)](https://github.com/maintainer)
```

### 🌐 **HTML Integration**
```html
<div class="github-stats">
  <img src="https://gitrank.zehrasec.com/api/badge?user=developer&metric=stars&style=flat-square&theme=dark" alt="GitHub Stars Ranking">
  <img src="https://gitrank.zehrasec.com/api/badge?user=developer&metric=forks&style=flat-square&theme=dark" alt="GitHub Forks Ranking">
</div>
```

---

## 🔧 **Configuration**

### 🔐 **Environment Variables**
```bash
# Required
PORT=3000                    # Server port
NODE_ENV=production         # Environment

# Optional (Recommended)  
GITHUB_TOKEN=your_token     # Personal access token for higher rate limits
CACHE_TTL=43200            # Cache duration (12 hours)
RATE_LIMIT_WINDOW=3600000  # Rate limit window (1 hour)
RATE_LIMIT_MAX=1000        # Max requests per window
```

### ⚡ **Performance**
- **Caching**: 12-hour intelligent caching reduces API calls by 95%
- **Rate Limiting**: 1000 requests/hour per IP
- **CDN Ready**: Perfect for global deployment with edge caching
- **Response Time**: Sub-500ms response times with caching

---

## 🧪 **Testing**

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific tests
npm test tests/ranking.test.js
```

---

## 🤝 **Contributing**

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`  
5. **Open** a Pull Request

---

## 📊 **API Rate Limits**

| Authentication | Requests/Hour | GitHub API Limit |
|----------------|---------------|------------------|
| **No Token** | 60 | GitHub's IP-based limit |
| **With Token** | 5,000 | GitHub's authenticated limit |
| **Cached Responses** | Unlimited | Served from cache |

---

## 🌟 **Showcase**

### 🎯 **Live Examples**

<!-- Dark Theme Examples -->
![Example Stars Dark](https://gitrank.zehrasec.com/api/badge?user=octocat&metric=stars&style=for-the-badge&theme=dark)
![Example Followers Dark](https://gitrank.zehrasec.com/api/badge?user=octocat&metric=followers&style=for-the-badge&theme=dark)

<!-- Light Theme Examples -->  
![Example Stars Light](https://gitrank.zehrasec.com/api/badge?user=octocat&metric=stars&style=for-the-badge&theme=light)
![Example Followers Light](https://gitrank.zehrasec.com/api/badge?user=octocat&metric=followers&style=for-the-badge&theme=light)

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **GitHub** for the excellent API and Octocat mascot
- **Open Source Community** for inspiration and feedback
- **Terminal Culture** for the hacker aesthetic inspiration
- **Contributors** who make this project better

---

## 📞 **Support & Community**

<div align="center">

### 🌟 **Star this repo if it helped you!**

[![GitHub stars](https://img.shields.io/github/stars/yashab-cyber/gitrank?style=social)](https://github.com/yashab-cyber/gitrank/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yashab-cyber/gitrank?style=social)](https://github.com/yashab-cyber/gitrank/network/members)

**[💬 Discussions](https://github.com/yashab-cyber/gitrank/discussions) • [🐛 Issues](https://github.com/yashab-cyber/gitrank/issues) • [✨ Feature Requests](https://github.com/yashab-cyber/gitrank/discussions)**

</div>

---

<div align="center">

**Made with ⚡ by hackers, for hackers**

*Keep coding, keep ranking* 🚀

</div>
