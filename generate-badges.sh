#!/bin/bash
# generate-badges.sh - Generate static GitRank badges

set -e

# Configuration
USER="${1:-yashab-cyber}"  # Default to yashab-cyber, but accept first argument
SERVER="http://localhost:3000"
BADGES_DIR="badges"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 GitRank Badge Generator${NC}"
echo -e "${BLUE}================================${NC}"

# Check if server is running
echo -e "${YELLOW}⏳ Checking server status...${NC}"
if curl -s "$SERVER/health" > /dev/null; then
    echo -e "${GREEN}✅ Server is running${NC}"
else
    echo -e "${RED}❌ Server not running. Please start with: npm start${NC}"
    exit 1
fi

# Create badges directory
mkdir -p "$BADGES_DIR"
echo -e "${YELLOW}📁 Created badges directory: $BADGES_DIR${NC}"

# Generate main badges (for-the-badge style, dark theme)
echo -e "${YELLOW}🎨 Generating main badges for user: $USER${NC}"

curl -s "$SERVER/api/badge?user=$USER&metric=stars&style=for-the-badge" > "$BADGES_DIR/$USER-stars.svg"
echo -e "${GREEN}  ✅ Stars badge generated${NC}"

curl -s "$SERVER/api/badge?user=$USER&metric=followers&style=for-the-badge" > "$BADGES_DIR/$USER-followers.svg"
echo -e "${GREEN}  ✅ Followers badge generated${NC}"

curl -s "$SERVER/api/badge?user=$USER&metric=forks&style=for-the-badge" > "$BADGES_DIR/$USER-forks.svg"
echo -e "${GREEN}  ✅ Forks badge generated${NC}"

curl -s "$SERVER/api/badge?user=$USER&metric=commits&style=for-the-badge" > "$BADGES_DIR/$USER-commits.svg"
echo -e "${GREEN}  ✅ Commits badge generated${NC}"

# Generate different styles
echo -e "${YELLOW}🎭 Generating different styles...${NC}"

curl -s "$SERVER/api/badge?user=$USER&metric=stars&style=flat" > "$BADGES_DIR/$USER-stars-flat.svg"
curl -s "$SERVER/api/badge?user=$USER&metric=followers&style=flat" > "$BADGES_DIR/$USER-followers-flat.svg"
echo -e "${GREEN}  ✅ Flat style badges generated${NC}"

curl -s "$SERVER/api/badge?user=$USER&metric=stars&style=flat-square" > "$BADGES_DIR/$USER-stars-flat-square.svg"
curl -s "$SERVER/api/badge?user=$USER&metric=followers&style=flat-square" > "$BADGES_DIR/$USER-followers-flat-square.svg"
echo -e "${GREEN}  ✅ Flat square style badges generated${NC}"

curl -s "$SERVER/api/badge?user=$USER&metric=stars&style=plastic" > "$BADGES_DIR/$USER-stars-plastic.svg"
curl -s "$SERVER/api/badge?user=$USER&metric=followers&style=plastic" > "$BADGES_DIR/$USER-followers-plastic.svg"
echo -e "${GREEN}  ✅ Plastic style badges generated${NC}"

# Generate light theme
echo -e "${YELLOW}☀️ Generating light theme badges...${NC}"

curl -s "$SERVER/api/badge?user=$USER&metric=stars&theme=light&style=for-the-badge" > "$BADGES_DIR/$USER-stars-light.svg"
curl -s "$SERVER/api/badge?user=$USER&metric=followers&theme=light&style=for-the-badge" > "$BADGES_DIR/$USER-followers-light.svg"
echo -e "${GREEN}  ✅ Light theme badges generated${NC}"

# Generate popular users (if not the main user)
if [ "$USER" != "octocat" ]; then
    echo -e "${YELLOW}👤 Generating badges for popular users...${NC}"
    
    curl -s "$SERVER/api/badge?user=octocat&metric=followers&style=for-the-badge" > "$BADGES_DIR/octocat-followers.svg"
    echo -e "${GREEN}  ✅ Octocat badges generated${NC}"
fi

if [ "$USER" != "torvalds" ]; then
    curl -s "$SERVER/api/badge?user=torvalds&metric=stars&style=for-the-badge" > "$BADGES_DIR/torvalds-stars.svg"
    echo -e "${GREEN}  ✅ Torvalds badges generated${NC}"
fi

# Show results
echo -e "${BLUE}📊 Badge generation complete!${NC}"
echo -e "${BLUE}Generated files:${NC}"
ls -la "$BADGES_DIR/" | grep -E "\\.svg$" | wc -l | xargs echo -e "${GREEN}  Total badges: ${NC}"

echo ""
echo -e "${YELLOW}💡 Usage in markdown:${NC}"
echo -e "${GREEN}![Stars Badge](./badges/$USER-stars.svg)${NC}"
echo -e "${GREEN}![Followers Badge](./badges/$USER-followers.svg)${NC}"

echo ""
echo -e "${YELLOW}🔄 To regenerate badges:${NC}"
echo -e "${GREEN}./generate-badges.sh $USER${NC}"

echo ""
echo -e "${BLUE}🎉 All badges ready for use in markdown files!${NC}"
