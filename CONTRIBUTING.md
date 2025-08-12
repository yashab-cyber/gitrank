# Contributing to GitRank Live

Thank you for your interest in contributing to GitRank Live! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/gitrank.git
   cd gitrank
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Add your GitHub token to .env
   ```
5. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📋 How to Contribute

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates.

**Bug Report Template:**
- **Description**: A clear description of the bug
- **Steps to reproduce**: Detailed steps to reproduce the issue
- **Expected behavior**: What you expected to happen
- **Actual behavior**: What actually happened  
- **Environment**: OS, Node.js version, etc.
- **Screenshots**: If applicable

### ✨ Suggesting Features

Feature requests are welcome! Please:
- Check existing issues and discussions first
- Provide a clear description of the feature
- Explain why it would be useful
- Consider the implementation complexity

### 🔧 Code Contributions

#### Development Workflow
1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Write or update tests
4. Ensure all tests pass:
   ```bash
   npm test
   ```
5. Commit your changes with a descriptive message
6. Push to your fork
7. Create a Pull Request

#### Code Style
- Use 2 spaces for indentation
- Follow existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

#### Commit Messages
Follow the conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `test:` for test additions/changes
- `refactor:` for code refactoring
- `chore:` for maintenance tasks

Examples:
```
feat: add country-based ranking support
fix: resolve GitHub API rate limit handling
docs: update API documentation
test: add ranking service test cases
```

#### Testing
- Write tests for new features
- Ensure existing tests still pass
- Aim for good test coverage
- Test both success and error cases

### 📚 Documentation

Help improve our documentation by:
- Fixing typos and grammatical errors
- Adding examples and use cases
- Improving API documentation
- Updating setup instructions

## 🎯 Development Guidelines

### Project Structure
```
src/
├── server.js          # Main server file
├── routes/            # API route handlers
├── services/          # Business logic services
└── tests/             # Test files
```

### Key Services
- **GitHubService**: Handles GitHub API interactions
- **RankingService**: Calculates user rankings
- **BadgeService**: Generates SVG badges

### Adding New Features

#### Adding a New Metric
1. Update `rankingService.js` benchmarks
2. Add metric to validation in `badge.js` routes
3. Update documentation
4. Add tests

#### Adding a New Badge Style
1. Add style configuration to `badgeService.js`
2. Update SVG generation logic
3. Add to validation in routes
4. Update documentation

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test tests/ranking.test.js
```

### Writing Tests
- Use Jest for testing
- Test both positive and negative cases
- Mock external dependencies (GitHub API)
- Write descriptive test names

## 🚀 Deployment

The project is designed to work on multiple platforms:
- **Vercel**: Use `vercel.json` configuration
- **Railway**: Standard Node.js deployment
- **Docker**: Use provided `Dockerfile`
- **Render**: Standard Node.js deployment

## 📋 Pull Request Guidelines

### Before Submitting
- [ ] Tests pass locally
- [ ] Code follows project style
- [ ] Documentation is updated
- [ ] Commit messages are descriptive
- [ ] No breaking changes (or clearly documented)

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] Manual testing performed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console logs or debug code
```

## 🤝 Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow GitHub community guidelines
- Have fun building together!

## 📞 Getting Help

If you need help or have questions:
- Check existing issues and discussions
- Create a new discussion for questions
- Join our community channels
- Reach out to maintainers

Thank you for contributing to GitRank Live! 🚀
