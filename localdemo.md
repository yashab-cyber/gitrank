# GitRank Local Demo 🚀

> **Local GitHub ranking badges powered by localhost:3000**

Welcome to the GitRank Local demo! This showcase demonstrates local GitHub ranking badges using **[@yashab-cyber](https://github.com/yashab-cyber)**'s profile as an example running on your local development server.

## 🔧 Local Server Status

> 🟢 **Server Status**: [Check Local Health](http://localhost:3000/health) | 🌐 **Local API**: http://localhost:3000

### ⚡ Quick Server Test
- ✅ **Local Health**: [http://localhost:3000/health](http://localhost:3000/health)
- ✅ **API Info**: [http://localhost:3000/](http://localhost:3000/)
- ✅ **Raw Data**: [http://localhost:3000/api/rank?user=yashab-cyber&metric=stars](http://localhost:3000/api/rank?user=yashab-cyber&metric=stars)

## 🏆 Live Badge Examples (Local Server)

### 🌟 Stars Ranking
![Stars Rank](http://localhost:3000/api/badge?user=yashab-cyber&metric=stars&style=for-the-badge)

**Direct URL**: http://localhost:3000/api/badge?user=yashab-cyber&metric=stars&style=for-the-badge

### 👥 Followers Ranking  
![Followers Rank](http://localhost:3000/api/badge?user=yashab-cyber&metric=followers&style=for-the-badge)

**Direct URL**: http://localhost:3000/api/badge?user=yashab-cyber&metric=followers&style=for-the-badge

### 🍴 Forks Ranking
![Forks Rank](http://localhost:3000/api/badge?user=yashab-cyber&metric=forks&style=for-the-badge)

**Direct URL**: http://localhost:3000/api/badge?user=yashab-cyber&metric=forks&style=for-the-badge

### 📝 Commits Ranking
![Commits Rank](http://localhost:3000/api/badge?user=yashab-cyber&metric=commits&style=for-the-badge)

**Direct URL**: http://localhost:3000/api/badge?user=yashab-cyber&metric=commits&style=for-the-badge

---

## 🎨 Local Badge Style Variations

### 🔧 Flat Style
![Flat Stars](http://localhost:3000/api/badge?user=yashab-cyber&metric=stars&style=flat)
![Flat Followers](http://localhost:3000/api/badge?user=yashab-cyber&metric=followers&style=flat)

### Flat Square Style
![Flat Square Stars](http://localhost:3000/api/badge?user=yashab-cyber&metric=stars&style=flat-square)
![Flat Square Followers](http://localhost:3000/api/badge?user=yashab-cyber&metric=followers&style=flat-square)

### Plastic Style
![Plastic Stars](http://localhost:3000/api/badge?user=yashab-cyber&metric=stars&style=plastic)
![Plastic Followers](http://localhost:3000/api/badge?user=yashab-cyber&metric=followers&style=plastic)

---

## 🌓 Theme Options (Local)

### Dark Theme (Default)
![Dark Theme Stars](http://localhost:3000/api/badge?user=yashab-cyber&metric=stars&theme=dark&style=for-the-badge)
![Dark Theme Followers](http://localhost:3000/api/badge?user=yashab-cyber&metric=followers&theme=dark&style=for-the-badge)

### Light Theme
![Light Theme Stars](http://localhost:3000/api/badge?user=yashab-cyber&metric=stars&theme=light&style=for-the-badge)
![Light Theme Followers](http://localhost:3000/api/badge?user=yashab-cyber&metric=followers&theme=light&style=for-the-badge)

---

## 🧪 Debugging Local Badges

### 🔍 **Common Issues & Solutions**

1. **Badge Not Loading?**
   - ✅ Check if server is running: `curl http://localhost:3000/health`
   - ✅ Verify the server logs for any errors
   - ✅ Test direct URL in browser

2. **GitHub API Errors?**
   - ⚠️ Check if GITHUB_TOKEN is set in `.env` file
   - ⚠️ Verify rate limits: GitHub allows 60 requests/hour without token
   - ⚠️ With token: 5000 requests/hour

3. **Network Issues?**
   - 🌐 Ensure you're accessing `http://localhost:3000` not `https://`
   - 🌐 Check firewall settings if using external markdown viewer

### 🛠️ **Debug URLs**
```bash
# Test server health
curl http://localhost:3000/health

# Get user ranking data (JSON)
curl http://localhost:3000/api/rank?user=yashab-cyber&metric=stars

# Get user stats
curl http://localhost:3000/api/stats/yashab-cyber

# Generate badge directly
curl http://localhost:3000/api/badge?user=yashab-cyber&metric=stars&style=flat
```

### 📊 **Local API Testing**
You can test the API directly with curl commands:

```bash
# Basic badge request
curl "http://localhost:3000/api/badge?user=octocat&metric=stars" > badge.svg

# Custom styling
curl "http://localhost:3000/api/badge?user=octocat&metric=followers&style=for-the-badge&theme=light" > custom_badge.svg

# JSON data
curl "http://localhost:3000/api/rank?user=octocat&metric=stars" | jq '.'
```

---

## 🚀 Local Development Usage

### 📋 Basic Usage (Local Server)
Replace `yashab-cyber` with any GitHub username:

```markdown
![GitHub Stars Rank](http://localhost:3000/api/badge?user=YOUR_USERNAME&metric=stars)
![GitHub Followers Rank](http://localhost:3000/api/badge?user=YOUR_USERNAME&metric=followers)
```

### 🎨 Customization Options
```markdown
<!-- Different styles -->
![Stars](http://localhost:3000/api/badge?user=YOUR_USERNAME&metric=stars&style=flat)
![Stars](http://localhost:3000/api/badge?user=YOUR_USERNAME&metric=stars&style=flat-square)
![Stars](http://localhost:3000/api/badge?user=YOUR_USERNAME&metric=stars&style=for-the-badge)
![Stars](http://localhost:3000/api/badge?user=YOUR_USERNAME&metric=stars&style=plastic)

<!-- Different themes -->
![Stars Dark](http://localhost:3000/api/badge?user=YOUR_USERNAME&metric=stars&theme=dark)
![Stars Light](http://localhost:3000/api/badge?user=YOUR_USERNAME&metric=stars&theme=light)
```

---

## 📊 Test Different Users

### 🧪 Popular GitHub Users for Testing
```markdown
<!-- Test with GitHub founders and popular developers -->
![Octocat](http://localhost:3000/api/badge?user=octocat&metric=followers&style=for-the-badge)
![Torvalds](http://localhost:3000/api/badge?user=torvalds&metric=stars&style=for-the-badge)
![Gaearon](http://localhost:3000/api/badge?user=gaearon&metric=followers&style=for-the-badge)
```

### 🎯 Your Own Profile
Replace with your GitHub username to test:
```markdown
![My Stars](http://localhost:3000/api/badge?user=YOUR_USERNAME&metric=stars&style=for-the-badge)
![My Followers](http://localhost:3000/api/badge?user=YOUR_USERNAME&metric=followers&style=for-the-badge)
![My Forks](http://localhost:3000/api/badge?user=YOUR_USERNAME&metric=forks&style=for-the-badge)
![My Commits](http://localhost:3000/api/badge?user=YOUR_USERNAME&metric=commits&style=for-the-badge)
```

---

## 🛠️ Local Development Setup

### 🏃‍♂️ **Start the Server**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or production server
npm start
```

### 📝 **Environment Setup**
Create `.env` file:
```bash
GITHUB_TOKEN=your_github_personal_access_token_here
PORT=3000
NODE_ENV=development
CACHE_TTL=43200
RATE_LIMIT_WINDOW=3600000
RATE_LIMIT_MAX=1000
```

### 🧪 **Testing**
```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

---

## 📈 **Local Performance Testing**

### ⚡ **Speed Test**
```bash
# Test badge generation speed
time curl -s "http://localhost:3000/api/badge?user=yashab-cyber&metric=stars" > /dev/null

# Test with different users
for user in octocat torvalds gaearon; do
  echo "Testing $user..."
  time curl -s "http://localhost:3000/api/badge?user=$user&metric=stars" > /dev/null
done
```

### 📊 **Load Testing** (Optional)
If you have Apache Bench installed:
```bash
# Test 100 requests with 10 concurrent connections
ab -n 100 -c 10 "http://localhost:3000/api/badge?user=yashab-cyber&metric=stars"
```

---

## ❓ **Troubleshooting Local Issues**

### 🐛 **Common Problems**

1. **Port Already in Use**
   ```bash
   # Find what's using port 3000
   lsof -i :3000
   
   # Kill the process (replace PID)
   kill -9 PID
   
   # Or use different port
   PORT=3001 npm start
   ```

2. **GitHub API Rate Limit**
   ```bash
   # Check your current rate limit
   curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/rate_limit
   ```

3. **Module Not Found**
   ```bash
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Badge Shows Error**
   - Check server logs in terminal
   - Verify GitHub username exists
   - Test API endpoint directly

### 📋 **Health Checks**
```bash
# Server health
curl http://localhost:3000/health

# API endpoints
curl http://localhost:3000/

# User data (replace username)
curl "http://localhost:3000/api/stats/yashab-cyber"

# Raw SVG
curl "http://localhost:3000/api/badge?user=yashab-cyber&metric=stars" | head -5
```

---

## 🎯 **Next Steps**

### 🚀 **Ready for Production?**
1. Set up proper environment variables
2. Deploy to your preferred platform (Vercel, Netlify, Heroku, etc.)
3. Update URLs in your markdown files
4. Monitor performance and caching

### 🔗 **Integration Ideas**
- Add badges to your GitHub profile README
- Include in project documentation
- Use in team showcases
- Create developer leaderboards

---

## 📞 **Local Development Support**

### 🛠️ **Server Information**
- **Port**: 3000 (configurable via PORT env var)
- **Environment**: Development
- **Cache TTL**: 12 hours (43200 seconds)
- **Rate Limit**: 1000 requests/hour per IP

### 🔍 **Useful Endpoints**
- **Health**: http://localhost:3000/health
- **API Info**: http://localhost:3000/
- **Badge**: http://localhost:3000/api/badge?user=USERNAME&metric=METRIC
- **Rank Data**: http://localhost:3000/api/rank?user=USERNAME&metric=METRIC
- **User Stats**: http://localhost:3000/api/stats/USERNAME
- **Ranking Info**: http://localhost:3000/api/ranking-info

---

<div align="center">

### 🌟 **Local GitRank Development Server Running!** 🌟

[![Local Server](http://localhost:3000/api/badge?user=yashab-cyber&metric=stars&style=for-the-badge)](http://localhost:3000)

**Made with ❤️ for local development and testing**

*Server running on http://localhost:3000*

</div>

---

*Last updated: August 12, 2025*
