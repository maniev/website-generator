export const SAMPLE_TEMPLATES = {
  saas: {
    id: 'saas',
    title: 'Modern SaaS Landing Page',
    description: 'A clean, conversion-focused template for software & AI apps with light/dark accents.',
    files: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aura - Next Gen AI Workflow Platform</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
  <nav class="navbar">
    <div class="container nav-container">
      <div class="logo">⚡ Aura<span>.ai</span></div>
      <div class="nav-links">
        <a href="index.html" class="active">Home</a>
        <a href="about.html">Features</a>
        <a href="pricing.html">Pricing</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="nav-actions">
        <a href="#" class="btn btn-secondary">Log In</a>
        <a href="#" class="btn btn-primary">Start Free Trial</a>
      </div>
    </div>
  </nav>

  <header class="hero">
    <div class="container hero-content">
      <span class="badge">🚀 Introducing Aura 2.0</span>
      <h1 class="hero-title">Automate your entire software workflow in seconds</h1>
      <p class="hero-desc">Empower your development and design teams with AI-driven continuous deployment, live page generation, and visual collaboration tools.</p>
      <div class="hero-buttons">
        <a href="#" class="btn btn-primary btn-lg">Get Started Free</a>
        <a href="#" class="btn btn-outline btn-lg">Watch Demo Video</a>
      </div>
      <div class="hero-stats">
        <div class="stat-item"><strong>99.9%</strong><span>Uptime Guaranteed</span></div>
        <div class="stat-item"><strong>10x</strong><span>Faster Deployment</span></div>
        <div class="stat-item"><strong>50k+</strong><span>Active Developers</span></div>
      </div>
    </div>
  </header>

  <section class="features">
    <div class="container">
      <div class="section-header">
        <h2>Designed for speed & scale</h2>
        <p>Everything you need to ship products 10x faster with complete confidence.</p>
      </div>
      <div class="grid grid-3">
        <div class="card">
          <div class="icon">✨</div>
          <h3>AI Code Generation</h3>
          <p>Generate full-stack components from text prompts or visual wireframes instantly.</p>
        </div>
        <div class="card">
          <div class="icon">⚡</div>
          <h3>Instant Deployments</h3>
          <p>Publish production static builds or dynamic sites with global CDN routing.</p>
        </div>
        <div class="card">
          <div class="icon">🔒</div>
          <h3>Enterprise Security</h3>
          <p>Bank-grade encryption, role-based controls, and SOC2 compliance built right in.</p>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container footer-content">
      <p>© 2026 Aura AI Technologies Inc. All rights reserved.</p>
    </div>
  </footer>
  <script src="script.js"></script>
</body>
</html>`,

      'about.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Features & Solutions - Aura</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
  <nav class="navbar">
    <div class="container nav-container">
      <div class="logo">⚡ Aura<span>.ai</span></div>
      <div class="nav-links">
        <a href="index.html">Home</a>
        <a href="about.html" class="active">Features</a>
        <a href="pricing.html">Pricing</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="nav-actions">
        <a href="#" class="btn btn-primary">Start Free Trial</a>
      </div>
    </div>
  </nav>

  <section class="hero-small">
    <div class="container">
      <h1>Engineered for modern high-growth teams</h1>
      <p>Discover how Aura seamlessly integrates into your existing dev stack.</p>
    </div>
  </section>

  <footer class="footer">
    <div class="container footer-content">
      <p>© 2026 Aura AI Technologies Inc. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`,

      'pricing.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pricing Plans - Aura</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="navbar">
    <div class="container nav-container">
      <div class="logo">⚡ Aura<span>.ai</span></div>
      <div class="nav-links">
        <a href="index.html">Home</a>
        <a href="about.html">Features</a>
        <a href="pricing.html" class="active">Pricing</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="nav-actions">
        <a href="#" class="btn btn-primary">Start Free Trial</a>
      </div>
    </div>
  </nav>

  <section class="container" style="padding: 80px 20px; text-align: center;">
    <h1>Simple, transparent pricing</h1>
    <p style="color: #64748b; margin-bottom: 40px;">No hidden fees. Upgrade or downgrade anytime.</p>
    
    <div class="grid grid-3">
      <div class="card">
        <h3>Starter</h3>
        <h2 style="font-size: 2.5rem; margin: 15px 0;">$0 <span style="font-size: 1rem; color: #64748b;">/mo</span></h2>
        <p>Perfect for hobbyists and side projects.</p>
        <a href="#" class="btn btn-outline" style="margin-top: 20px; display: inline-block;">Get Started</a>
      </div>
      <div class="card" style="border: 2px solid #6366f1;">
        <span class="badge">Most Popular</span>
        <h3>Pro Creator</h3>
        <h2 style="font-size: 2.5rem; margin: 15px 0;">$29 <span style="font-size: 1rem; color: #64748b;">/mo</span></h2>
        <p>For growing teams shipping applications daily.</p>
        <a href="#" class="btn btn-primary" style="margin-top: 20px; display: inline-block;">Start 14-Day Trial</a>
      </div>
      <div class="card">
        <h3>Enterprise</h3>
        <h2 style="font-size: 2.5rem; margin: 15px 0;">$99 <span style="font-size: 1rem; color: #64748b;">/mo</span></h2>
        <p>Custom security, dedicated support, unlimited capacity.</p>
        <a href="#" class="btn btn-outline" style="margin-top: 20px; display: inline-block;">Contact Sales</a>
      </div>
    </div>
  </section>
</body>
</html>`,

      'contact.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Contact Us - Aura</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="navbar">
    <div class="container nav-container">
      <div class="logo">⚡ Aura<span>.ai</span></div>
      <div class="nav-links">
        <a href="index.html">Home</a>
        <a href="about.html">Features</a>
        <a href="pricing.html">Pricing</a>
        <a href="contact.html" class="active">Contact</a>
      </div>
    </div>
  </nav>

  <section class="container" style="padding: 80px 20px; max-width: 600px;">
    <h2>Get in touch with us</h2>
    <p style="color: #64748b; margin-bottom: 30px;">Have questions? Send us a message and our team will respond within 2 hours.</p>
    <form style="display: flex; flex-direction: column; gap: 16px;">
      <input type="text" placeholder="Your Name" style="padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1;">
      <input type="email" placeholder="Your Email Address" style="padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1;">
      <textarea rows="5" placeholder="How can we help you?" style="padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1;"></textarea>
      <button type="submit" class="btn btn-primary">Send Message</button>
    </form>
  </section>
</body>
</html>`,

      'style.css': `/* Modern SaaS Theme CSS */
:root {
  --primary: #6366f1;
  --primary-hover: #4f46e5;
  --dark: #0f172a;
  --text: #334155;
  --light-bg: #f8fafc;
  --card-bg: #ffffff;
  --border: #e2e8f0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--text);
  background-color: var(--light-bg);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Navbar */
.navbar {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--border);
  padding: 16px 0;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--dark);
}

.logo span {
  color: var(--primary);
}

.nav-links {
  display: flex;
  gap: 28px;
}

.nav-links a {
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover, .nav-links a.active {
  color: var(--primary);
}

.nav-actions {
  display: flex;
  gap: 12px;
}

/* Buttons */
.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background: var(--primary);
  color: #fff;
}

.btn-primary:hover {
  background: var(--primary-hover);
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
}

.btn-secondary {
  background: transparent;
  color: var(--dark);
}

.btn-outline {
  border: 1px solid var(--border);
  background: #fff;
  color: var(--dark);
}

.btn-lg {
  padding: 14px 28px;
  font-size: 1.05rem;
}

/* Hero */
.hero {
  padding: 90px 0 60px;
  text-align: center;
  background: radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 60%);
}

.badge {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 20px;
}

.hero-title {
  font-size: 3.2rem;
  font-weight: 800;
  color: var(--dark);
  letter-spacing: -0.02em;
  max-width: 850px;
  margin: 0 auto 20px;
}

.hero-desc {
  font-size: 1.2rem;
  color: #64748b;
  max-width: 680px;
  margin: 0 auto 36px;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 50px;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  border-top: 1px solid var(--border);
  padding-top: 40px;
  max-width: 750px;
  margin: 0 auto;
}

.stat-item strong {
  display: block;
  font-size: 2rem;
  color: var(--dark);
  font-weight: 800;
}

.stat-item span {
  color: #64748b;
  font-size: 0.9rem;
}

/* Features Grid */
.features {
  padding: 80px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-header h2 {
  font-size: 2.2rem;
  color: var(--dark);
}

.grid {
  display: grid;
  gap: 24px;
}

.grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  padding: 32px;
  border-radius: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.05);
}

.card .icon {
  font-size: 2.2rem;
  margin-bottom: 16px;
}

.card h3 {
  font-size: 1.3rem;
  color: var(--dark);
  margin-bottom: 10px;
}

.card p {
  color: #64748b;
}

/* Footer */
.footer {
  background: #fff;
  border-top: 1px solid var(--border);
  padding: 30px 0;
  text-align: center;
  color: #94a3b8;
}
`,

      'script.js': `// Interactive Client Features
console.log('SiteCraft Studio Template Loaded Successfully');
document.addEventListener('DOMContentLoaded', () => {
  console.log('Page DOM ready');
});
`
    }
  }
};

export const getSampleTemplateFiles = (templateKey = 'saas') => {
  const template = SAMPLE_TEMPLATES[templateKey] || SAMPLE_TEMPLATES.saas;
  const result = {};
  
  for (const [filename, content] of Object.entries(template.files)) {
    const ext = filename.split('.').pop();
    let type = 'html';
    if (ext === 'css') type = 'css';
    if (ext === 'js') type = 'js';
    
    result[filename] = {
      path: filename,
      name: filename,
      type: type,
      content: content,
      updatedAt: Date.now()
    };
  }
  
  return result;
};
