# Security Policy

## 🔒 Reporting Security Vulnerabilities

The GitRank Live team takes security seriously. We appreciate your efforts to responsibly disclose your findings.

### 📧 How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please send a report to our security team:
- **Email**: yashabalam707@gmail.com
- **Subject**: [SECURITY] GitRank Live Security Report

### 📋 What to Include

Please include the following information in your report:
- Type of issue (e.g., buffer overflow, SQL injection, XSS, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### 🚀 Response Timeline

We will acknowledge receipt of your vulnerability report within 48 hours and strive to:
- Confirm the problem and determine affected versions within 7 days
- Provide a timeline for addressing the issue
- Release a fix as soon as possible depending on complexity

### 🏆 Recognition

We believe in giving credit where credit is due. Security researchers who responsibly disclose vulnerabilities will be:
- Acknowledged in our security advisories (unless they prefer to remain anonymous)
- Listed in our hall of fame
- Eligible for our bug bounty program (when available)

## 🛡️ Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ Yes             |
| < 1.0   | ❌ No              |

## 🔐 Security Best Practices

### For Users
- Always use HTTPS when accessing GitRank Live
- Keep your GitHub tokens secure and use minimal required permissions
- Regularly update your dependencies
- Use environment variables for sensitive configuration

### For Developers
- Never commit secrets, API keys, or passwords to the repository
- Use parameterized queries to prevent injection attacks
- Validate all user inputs
- Implement proper authentication and authorization
- Use HTTPS for all external API calls
- Regularly audit dependencies for vulnerabilities

## 🚨 Known Security Considerations

### GitHub API Rate Limits
- GitRank Live implements rate limiting to prevent abuse
- Users should use GitHub tokens to increase rate limits
- Tokens are not stored or logged by our service

### Badge Generation
- SVG badges are generated server-side to prevent XSS
- Input validation is performed on all parameters
- No user-supplied content is directly embedded in SVG output

### Caching
- Cached data does not contain sensitive information
- Cache keys do not expose private user data
- TTL limits prevent stale data issues

## 🔍 Security Audits

GitRank Live undergoes regular security reviews:
- Automated dependency scanning
- Code quality analysis
- Manual security testing
- Third-party security assessments (when applicable)

## 📞 Contact

For any security-related questions or concerns:
- **Security Email**: yashabalam707@gmail.com
- **General Contact**: Yashab Alam ([@yashab-cyber](https://github.com/yashab-cyber))
- **Company**: ZehraSec ([www.zehrasec.com](https://www.zehrasec.com))

## 📄 Disclosure Policy

When we receive a security bug report, we will:
1. Confirm receipt of the report
2. Assess the severity and impact
3. Develop and test a fix
4. Prepare a security advisory
5. Release the fix and advisory simultaneously
6. Credit the reporter (if desired)

We aim to resolve critical security issues within 30 days of disclosure.

---

**Thank you for helping keep GitRank Live and our users safe! 🔒**

*Last updated: August 12, 2025*
