# 🏆 GitRank Static Badge Demo

> **Static badges generated from local GitRank server**

## ✅ **Working Static Badges**

### 🌟 Yashab Cyber GitHub Rankings

![Stars Ranking](./badges/yashab-stars.svg)
![Followers Ranking](./badges/yashab-followers.svg)
![Forks Ranking](./badges/yashab-forks.svg)
![Commits Ranking](./badges/yashab-commits.svg)

### 📊 **Badge Information**
- **User**: [@yashab-cyber](https://github.com/yashab-cyber)
- **Generated**: August 12, 2025
- **Style**: `for-the-badge`
- **Theme**: `dark` (default)

---

## 🎨 **Different Styles**

Let me generate some different styles:

### Flat Style
![Stars Flat](./badges/yashab-stars-flat.svg)
![Followers Flat](./badges/yashab-followers-flat.svg)

### Flat Square Style  
![Stars Flat Square](./badges/yashab-stars-flat-square.svg)
![Followers Flat Square](./badges/yashab-followers-flat-square.svg)

### Light Theme
![Stars Light](./badges/yashab-stars-light.svg)
![Followers Light](./badges/yashab-followers-light.svg)

---

## 🧪 **Test Other Users**

![Octocat Followers](./badges/octocat-followers.svg)
![Torvalds Stars](./badges/torvalds-stars.svg)

---

## 🔄 **How to Update Badges**

To refresh the badges with current data:

```bash
# Navigate to project directory
cd /workspaces/gitrank

# Ensure server is running
npm start

# Generate updated badges
curl -s "http://localhost:3000/api/badge?user=yashab-cyber&metric=stars&style=for-the-badge" > badges/yashab-stars.svg
curl -s "http://localhost:3000/api/badge?user=yashab-cyber&metric=followers&style=for-the-badge" > badges/yashab-followers.svg
curl -s "http://localhost:3000/api/badge?user=yashab-cyber&metric=forks&style=for-the-badge" > badges/yashab-forks.svg
curl -s "http://localhost:3000/api/badge?user=yashab-cyber&metric=commits&style=for-the-badge" > badges/yashab-commits.svg
```

## 📋 **Batch Generation Script**

Create a script to generate all badges:

```bash
#!/bin/bash
# generate-badges.sh

USER="yashab-cyber"
SERVER="http://localhost:3000"
BADGES_DIR="badges"

# Ensure badges directory exists
mkdir -p $BADGES_DIR

# Generate main badges
curl -s "$SERVER/api/badge?user=$USER&metric=stars&style=for-the-badge" > "$BADGES_DIR/$USER-stars.svg"
curl -s "$SERVER/api/badge?user=$USER&metric=followers&style=for-the-badge" > "$BADGES_DIR/$USER-followers.svg" 
curl -s "$SERVER/api/badge?user=$USER&metric=forks&style=for-the-badge" > "$BADGES_DIR/$USER-forks.svg"
curl -s "$SERVER/api/badge?user=$USER&metric=commits&style=for-the-badge" > "$BADGES_DIR/$USER-commits.svg"

# Generate different styles
curl -s "$SERVER/api/badge?user=$USER&metric=stars&style=flat" > "$BADGES_DIR/$USER-stars-flat.svg"
curl -s "$SERVER/api/badge?user=$USER&metric=followers&style=flat" > "$BADGES_DIR/$USER-followers-flat.svg"

# Generate light theme
curl -s "$SERVER/api/badge?user=$USER&metric=stars&theme=light&style=for-the-badge" > "$BADGES_DIR/$USER-stars-light.svg"
curl -s "$SERVER/api/badge?user=$USER&metric=followers&theme=light&style=for-the-badge" > "$BADGES_DIR/$USER-followers-light.svg"

echo "✅ Badges generated successfully!"
```

---

## 🎯 **Advantages of Static Badges**

### ✅ **Benefits**
- **✅ Works in all markdown renderers** (VS Code, GitHub, etc.)
- **✅ No security restrictions** (local files)
- **✅ Fast loading** (no API calls)
- **✅ Version control friendly** (can track changes)
- **✅ Offline usage** (no internet required)

### ⚠️ **Limitations**  
- **Manual updates required** (not real-time)
- **Larger repository size** (SVG files)
- **Need regeneration** when data changes

---

## 🚀 **Alternative Solutions**

### 1. Deploy to Production
Deploy the GitRank service to get public URLs:
- **Vercel**: `vercel deploy`
- **Railway**: `railway deploy` 
- **Render**: Connect GitHub repo

### 2. Use ngrok for Public URLs
```bash
ngrok http 3000
# Use the provided https://xxxxx.ngrok.io URL
```

### 3. GitHub Codespaces Port Forwarding
If using GitHub Codespaces, make port 3000 public:
1. Go to PORTS tab
2. Right-click port 3000
3. Select "Port Visibility" → "Public"

---

<div align="center">

## 🎉 **Static Badges Working!**

These badges will display correctly in any markdown renderer including VS Code preview, GitHub README files, and documentation sites.

**Last Updated**: August 12, 2025  
**Generated from**: GitRank Local Server (localhost:3000)

</div>
