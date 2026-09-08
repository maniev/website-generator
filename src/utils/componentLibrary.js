export const COMPONENT_BLOCKS = [
  {
    id: 'navbar-modern',
    name: 'Clean Navigation Bar',
    category: 'Navigation',
    icon: 'Menu',
    html: `<nav class="sitecraft-block navbar-block" style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); border-bottom: 1px solid #e2e8f0; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 1000;">
  <div style="font-weight: 800; font-size: 1.3rem; color: #0f172a; display: flex; align-items: center; gap: 8px;">
    <span style="background: #6366f1; color: white; width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem;">⚡</span>
    <span>LaunchApp</span>
  </div>
  <div style="display: flex; gap: 24px; align-items: center;">
    <a href="index.html" style="color: #475569; text-decoration: none; font-weight: 500; font-size: 0.95rem;">Home</a>
    <a href="features.html" style="color: #475569; text-decoration: none; font-weight: 500; font-size: 0.95rem;">Features</a>
    <a href="pricing.html" style="color: #475569; text-decoration: none; font-weight: 500; font-size: 0.95rem;">Pricing</a>
    <a href="contact.html" style="color: #475569; text-decoration: none; font-weight: 500; font-size: 0.95rem;">Contact</a>
  </div>
  <div>
    <a href="#" style="background: #0f172a; color: white; padding: 8px 18px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 0.9rem;">Sign Up</a>
  </div>
</nav>`
  },
  {
    id: 'hero-modern',
    name: 'Gradient Hero Section',
    category: 'Headers & Heroes',
    icon: 'LayoutTemplate',
    html: `<section class="sitecraft-block hero-block" style="padding: 100px 20px; text-align: center; background: radial-gradient(circle at center, rgba(99,102,241,0.08) 0%, transparent 70%);">
  <div style="max-width: 850px; margin: 0 auto;">
    <span style="background: rgba(99,102,241,0.12); color: #6366f1; padding: 6px 16px; border-radius: 20px; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em;">🔥 Meet the Future</span>
    <h1 style="font-size: 3.5rem; font-weight: 850; margin: 24px 0 20px; color: #0f172a; line-height: 1.15; letter-spacing: -0.02em;">Build and Scale without limits</h1>
    <p style="font-size: 1.25rem; color: #475569; margin-bottom: 36px; line-height: 1.6; max-width: 700px; margin-left: auto; margin-right: auto;">Our visual workspace and instant static deployment compiler let developers ship projects 10x faster than traditional coding environments.</p>
    <div style="display: flex; gap: 16px; justify-content: center; align-items: center; flex-wrap: wrap;">
      <a href="#" class="btn btn-primary" style="padding: 14px 32px; background: #6366f1; color: white; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 1rem; box-shadow: 0 4px 14px rgba(99,102,241,0.35);">Get Started for Free</a>
      <a href="#" class="btn btn-outline" style="padding: 14px 32px; border: 1px solid #cbd5e1; color: #334155; background: white; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 1rem;">Watch Demo Product</a>
    </div>
  </div>
</section>`
  },
  {
    id: 'feature-grid-3',
    name: '3-Column Card Layout',
    category: 'Features & Cards',
    icon: 'Grid',
    html: `<section class="sitecraft-block features-block" style="padding: 80px 24px; max-width: 1200px; margin: 0 auto;">
  <div style="text-align: center; max-width: 600px; margin: 0 auto 50px;">
    <h2 style="font-size: 2.4rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Engineered for High-Velocity Teams</h2>
    <p style="color: #64748b; font-size: 1.1rem; line-height: 1.5;">Tools to build, test, design and ship complete responsive interfaces.</p>
  </div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px;">
    <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 36px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.02); transition: transform 0.2s;">
      <div style="font-size: 2.2rem; margin-bottom: 20px; background: #f0fdf4; width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">🚀</div>
      <h3 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 12px; color: #0f172a;">Instant ZIP Deployment</h3>
      <p style="color: #475569; font-size: 0.98rem; line-height: 1.6;">Export pure, optimized static production-ready website assets directly to your system.</p>
    </div>
    <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 36px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.02); transition: transform 0.2s;">
      <div style="font-size: 2.2rem; margin-bottom: 20px; background: #eff6ff; width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">🎨</div>
      <h3 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 12px; color: #0f172a;">Visual Element Editor</h3>
      <p style="color: #475569; font-size: 0.98rem; line-height: 1.6;">Change fonts, typography, alignments, spacing and link structures with intuitive property inspectors.</p>
    </div>
    <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 36px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.02); transition: transform 0.2s;">
      <div style="font-size: 2.2rem; margin-bottom: 20px; background: #fdf2f8; width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">🛡️</div>
      <h3 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 12px; color: #0f172a;">100% Client-Side Private</h3>
      <p style="color: #475569; font-size: 0.98rem; line-height: 1.6;">No data ever leaves your computer. Your file templates and media are fully safe in browser memory.</p>
    </div>
  </div>
</section>`
  },
  {
    id: 'feature-split-layout',
    name: 'Feature Split Showcase',
    category: 'Features & Cards',
    icon: 'Layers',
    html: `<section class="sitecraft-block split-feature-block" style="padding: 80px 24px; max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 60px; align-items: center;">
  <div>
    <span style="color: #6366f1; font-weight: 700; font-size: 0.9rem; text-transform: uppercase;">Next-Gen Infrastructure</span>
    <h2 style="font-size: 2.6rem; font-weight: 850; color: #0f172a; margin: 16px 0 20px; line-height: 1.2;">Optimize page performance with code optimization</h2>
    <p style="color: #475569; font-size: 1.1rem; line-height: 1.7; margin-bottom: 28px;">Our compiler removes developer comments, injects compact CSS stylesheet bindings, and minifies inline templates. This gives you instant page rendering, leading to 99% bounce prevention.</p>
    <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; padding: 0;">
      <li style="display: flex; align-items: center; gap: 10px; color: #334155; font-weight: 600;">✓ Automated image optimization</li>
      <li style="display: flex; align-items: center; gap: 10px; color: #334155; font-weight: 600;">✓ Zero-dependency static builds</li>
      <li style="display: flex; align-items: center; gap: 10px; color: #334155; font-weight: 600;">✓ Instant component hot-reloading</li>
    </ul>
  </div>
  <div style="background: linear-gradient(135deg, #e0e7ff, #c7d2fe); border-radius: 24px; height: 380px; display: flex; align-items: center; justify-content: center; box-shadow: 0 20px 40px rgba(0,0,0,0.05); position: relative; overflow: hidden;">
    <div style="background: white; width: 85%; height: 80%; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); padding: 20px;">
      <div style="display: flex; gap: 6px; margin-bottom: 16px;">
        <span style="width: 10px; height: 10px; border-radius: 50%; background: #ef4444; display: inline-block;"></span>
        <span style="width: 10px; height: 10px; border-radius: 50%; background: #eab308; display: inline-block;"></span>
        <span style="width: 10px; height: 10px; border-radius: 50%; background: #22c55e; display: inline-block;"></span>
      </div>
      <div style="height: 15px; width: 60%; background: #e2e8f0; border-radius: 4px; margin-bottom: 12px;"></div>
      <div style="height: 12px; width: 100%; background: #f1f5f9; border-radius: 4px; margin-bottom: 8px;"></div>
      <div style="height: 12px; width: 90%; background: #f1f5f9; border-radius: 4px; margin-bottom: 8px;"></div>
      <div style="height: 12px; width: 75%; background: #f1f5f9; border-radius: 4px; margin-bottom: 12px;"></div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 20px;">
        <div style="height: 60px; background: #e0e7ff; border-radius: 8px;"></div>
        <div style="height: 60px; background: #eff6ff; border-radius: 8px;"></div>
        <div style="height: 60px; background: #ecfdf5; border-radius: 8px;"></div>
      </div>
    </div>
  </div>
</section>`
  },
  {
    id: 'product-cards',
    name: 'Product Catalog Cards',
    category: 'Features & Cards',
    icon: 'Grid',
    html: `<section class="sitecraft-block product-block" style="padding: 80px 24px; max-width: 1200px; margin: 0 auto;">
  <div style="text-align: center; max-width: 600px; margin: 0 auto 50px;">
    <h2 style="font-size: 2.4rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Featured Products</h2>
    <p style="color: #64748b; font-size: 1.1rem;">Explore our hot products catalog with custom layouts and clean hover states.</p>
  </div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;">
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.02); display: flex; flex-direction: column;">
      <div style="height: 200px; background: linear-gradient(135deg, #fbcfe8, #f472b6); display: flex; align-items: center; justify-content: center; position: relative;">
        <span style="position: absolute; top: 12px; left: 12px; background: #ef4444; color: white; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;">SALE -20%</span>
        <span style="font-size: 3rem;">🎒</span>
      </div>
      <div style="padding: 24px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="color: #6366f1; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">Accessories</span>
          <h3 style="font-size: 1.2rem; font-weight: 700; margin: 8px 0; color: #0f172a;">Smart Travel Pack</h3>
          <p style="color: #64748b; font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Waterproof travel backpack featuring integrated laptop charging sleeve.</p>
        </div>
        <div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <div style="font-size: 1.3rem; font-weight: 800; color: #0f172a;">$79.00 <span style="font-size: 0.95rem; color: #94a3b8; text-decoration: line-through; font-weight: 500;">$99.00</span></div>
            <div style="color: #fbbf24; font-size: 0.9rem;">★ 4.8</div>
          </div>
          <button style="width: 100%; padding: 10px; background: #0f172a; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Add to Cart</button>
        </div>
      </div>
    </div>
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.02); display: flex; flex-direction: column;">
      <div style="height: 200px; background: linear-gradient(135deg, #bfdbfe, #60a5fa); display: flex; align-items: center; justify-content: center; position: relative;">
        <span style="position: absolute; top: 12px; left: 12px; background: #6366f1; color: white; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;">NEW ARRIVAL</span>
        <span style="font-size: 3rem;">🎧</span>
      </div>
      <div style="padding: 24px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="color: #6366f1; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">Electronics</span>
          <h3 style="font-size: 1.2rem; font-weight: 700; margin: 8px 0; color: #0f172a;">Aero Wireless Headphones</h3>
          <p style="color: #64748b; font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">Active noise cancellation wireless headphones with 40-hour battery life.</p>
        </div>
        <div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <div style="font-size: 1.3rem; font-weight: 800; color: #0f172a;">$149.00</div>
            <div style="color: #fbbf24; font-size: 0.9rem;">★ 4.9</div>
          </div>
          <button style="width: 100%; padding: 10px; background: #0f172a; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</section>`
  },
  {
    id: 'blog-cards',
    name: 'Blog Post Cards',
    category: 'Features & Cards',
    icon: 'Grid',
    html: `<section class="sitecraft-block blog-block" style="padding: 80px 24px; max-width: 1200px; margin: 0 auto;">
  <div style="text-align: center; max-width: 600px; margin: 0 auto 50px;">
    <h2 style="font-size: 2.4rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Articles & Insights</h2>
    <p style="color: #64748b; font-size: 1.1rem;">Read news and engineering insights from our dedicated startup staff.</p>
  </div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px;">
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.02); display: flex; flex-direction: column;">
      <div style="height: 220px; background: linear-gradient(135deg, #c7d2fe, #6366f1); display: flex; align-items: center; justify-content: center; font-size: 3rem;">💻</div>
      <div style="padding: 28px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; gap: 12px; margin-bottom: 12px; font-size: 0.8rem; color: #64748b; font-weight: 600;">
            <span>July 22, 2026</span>
            <span>•</span>
            <span style="color: #6366f1;">DEVELOPMENT</span>
          </div>
          <h3 style="font-size: 1.3rem; font-weight: 700; color: #0f172a; line-height: 1.3; margin-bottom: 12px;">The complete developer guide to client-side ZIP operations</h3>
          <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin-bottom: 20px;">Learn how to compile, extract, and write virtual files in your browser with zero server load.</p>
        </div>
        <a href="#" style="color: #6366f1; text-decoration: none; font-weight: 700; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">Read Article →</a>
      </div>
    </div>
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.02); display: flex; flex-direction: column;">
      <div style="height: 220px; background: linear-gradient(135deg, #a5f3fc, #06b6d4); display: flex; align-items: center; justify-content: center; font-size: 3rem;">⚡</div>
      <div style="padding: 28px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; gap: 12px; margin-bottom: 12px; font-size: 0.8rem; color: #64748b; font-weight: 600;">
            <span>July 20, 2026</span>
            <span>•</span>
            <span style="color: #06b6d4;">DESIGN</span>
          </div>
          <h3 style="font-size: 1.3rem; font-weight: 700; color: #0f172a; line-height: 1.3; margin-bottom: 12px;">Designing layout blocks with modern HSL and CSS Variables</h3>
          <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin-bottom: 20px;">A masterclass in responsive styling rules, border shapes, gradients, and custom components.</p>
        </div>
        <a href="#" style="color: #06b6d4; text-decoration: none; font-weight: 700; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">Read Article →</a>
      </div>
    </div>
  </div>
</section>`
  },
  {
    id: 'team-members-cards',
    name: 'Team Profile Cards',
    category: 'Features & Cards',
    icon: 'Grid',
    html: `<section class="sitecraft-block team-block" style="padding: 80px 24px; max-width: 1200px; margin: 0 auto;">
  <div style="text-align: center; max-width: 600px; margin: 0 auto 50px;">
    <h2 style="font-size: 2.4rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Meet the Innovators</h2>
    <p style="color: #64748b; font-size: 1.1rem;">The designers and developers building the future of visual creation.</p>
  </div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.02);">
      <div style="width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, #a7f3d0, #059669); margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 2rem;">AH</div>
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 6px;">Alex Henderson</h3>
      <span style="color: #6366f1; font-size: 0.85rem; font-weight: 700; text-transform: uppercase;">Co-Founder & CEO</span>
      <p style="color: #64748b; font-size: 0.88rem; margin: 16px 0; line-height: 1.5;">Former browser engine engineer passionate about visual coding automation.</p>
      <div style="display: flex; justify-content: center; gap: 12px; color: #94a3b8;">
        <a href="#" style="color: inherit; text-decoration: none;">Twitter</a>
        <span>•</span>
        <a href="#" style="color: inherit; text-decoration: none;">GitHub</a>
      </div>
    </div>
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.02);">
      <div style="width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, #fef3c7, #d97706); margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 2rem;">SR</div>
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 6px;">Sarah Reynolds</h3>
      <span style="color: #6366f1; font-size: 0.85rem; font-weight: 700; text-transform: uppercase;">Lead UI Architect</span>
      <p style="color: #64748b; font-size: 0.88rem; margin: 16px 0; line-height: 1.5;">Pixel-perfect interface specialist who loves clean dark modes and transitions.</p>
      <div style="display: flex; justify-content: center; gap: 12px; color: #94a3b8;">
        <a href="#" style="color: inherit; text-decoration: none;">Dribbble</a>
        <span>•</span>
        <a href="#" style="color: inherit; text-decoration: none;">LinkedIn</a>
      </div>
    </div>
  </div>
</section>`
  },
  {
    id: 'stats-counter',
    name: 'Stat Counter Section',
    category: 'Stats & Fun Facts',
    icon: 'TrendingUp',
    html: `<section class="sitecraft-block stats-block" style="padding: 60px 24px; background: #0f172a; color: white;">
  <div style="max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 40px; text-align: center;">
    <div>
      <div style="font-size: 3rem; font-weight: 850; color: #6366f1; margin-bottom: 6px;">99.99%</div>
      <div style="font-size: 0.95rem; color: #94a3b8; font-weight: 500; text-transform: uppercase;">API System Uptime</div>
    </div>
    <div>
      <div style="font-size: 3rem; font-weight: 850; color: #06b6d4; margin-bottom: 6px;">100x</div>
      <div style="font-size: 0.95rem; color: #94a3b8; font-weight: 500; text-transform: uppercase;">Faster Page Loading</div>
    </div>
    <div>
      <div style="font-size: 3rem; font-weight: 850; color: #10b981; margin-bottom: 6px;">1.2M+</div>
      <div style="font-size: 0.95rem; color: #94a3b8; font-weight: 500; text-transform: uppercase;">Published Websites</div>
    </div>
    <div>
      <div style="font-size: 3rem; font-weight: 850; color: #a855f7; margin-bottom: 6px;">&lt; 5ms</div>
      <div style="font-size: 0.95rem; color: #94a3b8; font-weight: 500; text-transform: uppercase;">Global Edge latency</div>
    </div>
  </div>
</section>`
  },
  {
    id: 'testimonials-grid',
    name: 'Client Testimonial Cards',
    category: 'Testimonials',
    icon: 'Users',
    html: `<section class="sitecraft-block testimonial-block" style="padding: 80px 24px; max-width: 1200px; margin: 0 auto;">
  <div style="text-align: center; max-width: 600px; margin: 0 auto 50px;">
    <h2 style="font-size: 2.4rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Loved by Creators Worldwide</h2>
    <p style="color: #64748b; font-size: 1.1rem;">Read real experiences from software developers, designers, and visual editors.</p>
  </div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px;">
    <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 32px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.02);">
      <div style="color: #fbbf24; font-size: 1.3rem; margin-bottom: 16px;">★★★★★</div>
      <p style="color: #334155; font-style: italic; line-height: 1.6; margin-bottom: 24px;">"This studio app transformed how we prototype landing pages. The drag block insertion and cleaner HTML exporter save us hours of manually coding templates."</p>
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="width: 44px; height: 44px; border-radius: 50%; background: #6366f1; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.95rem;">JD</span>
        <div>
          <h4 style="font-weight: 700; color: #0f172a; margin: 0;">Jane Doe</h4>
          <span style="color: #64748b; font-size: 0.8rem;">Lead Product Architect, WebFlow Inc.</span>
        </div>
      </div>
    </div>
    <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 32px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.02);">
      <div style="color: #fbbf24; font-size: 1.3rem; margin-bottom: 16px;">★★★★★</div>
      <p style="color: #334155; font-style: italic; line-height: 1.6; margin-bottom: 24px;">"Being able to double-click visual elements to edit inline while having the Monaco code editor synced on-the-fly is a developer's dream come true."</p>
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="width: 44px; height: 44px; border-radius: 50%; background: #10b981; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.95rem;">MC</span>
        <div>
          <h4 style="font-weight: 700; color: #0f172a; margin: 0;">Mark Chen</h4>
          <span style="color: #64748b; font-size: 0.8rem;">Senior UX/UI Engineer, SaaSify</span>
        </div>
      </div>
    </div>
  </div>
</section>`
  },
  {
    id: 'pricing-table',
    name: 'Premium Pricing Grid',
    category: 'Pricing',
    icon: 'DollarSign',
    html: `<section class="sitecraft-block pricing-block" style="padding: 80px 24px; max-width: 1100px; margin: 0 auto; text-align: center;">
  <div style="max-width: 600px; margin: 0 auto 50px;">
    <h2 style="font-size: 2.4rem; font-weight: 850; color: #0f172a; margin-bottom: 10px;">Simple, Transparent Pricing</h2>
    <p style="color: #64748b; font-size: 1.1rem;">All plans include unlimited static ZIP downloads. No hidden platform fees.</p>
  </div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; max-width: 900px; margin: 0 auto;">
    <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 40px; text-align: left; box-shadow: 0 4px 20px rgba(0,0,0,0.01);">
      <h3 style="font-size: 1.3rem; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Starter Plan</h3>
      <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 24px;">Perfect for individual developers and hobby projects.</p>
      <div style="font-size: 2.8rem; font-weight: 850; color: #0f172a; margin-bottom: 28px;">$0 <span style="font-size: 1.05rem; font-weight: 500; color: #64748b;">/month</span></div>
      <ul style="list-style: none; padding: 0; margin-bottom: 30px; display: flex; flex-direction: column; gap: 12px; color: #475569; font-size: 0.95rem;">
        <li>✓ 5 HTML Pages</li>
        <li>✓ Full Code & Visual Sync</li>
        <li>✓ Starter Layout Blocks</li>
        <li style="color: #94a3b8; text-decoration: line-through;">✗ Custom Asset Hosting</li>
      </ul>
      <a href="#" style="display: block; text-align: center; background: #f1f5f9; color: #0f172a; padding: 12px; border-radius: 10px; text-decoration: none; font-weight: 700; transition: background 0.2s;">Get Started Now</a>
    </div>
    <div style="background: #fff; border: 2.5px solid #6366f1; border-radius: 20px; padding: 40px; text-align: left; position: relative; box-shadow: 0 10px 30px rgba(99,102,241,0.08);">
      <span style="position: absolute; top: -14px; right: 24px; background: #6366f1; color: white; padding: 6px 14px; border-radius: 20px; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.05em;">RECOMMENDED</span>
      <h3 style="font-size: 1.3rem; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Pro Creator</h3>
      <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 24px;">Unlock advanced features for production ready sites.</p>
      <div style="font-size: 2.8rem; font-weight: 850; color: #0f172a; margin-bottom: 28px;">$29 <span style="font-size: 1.05rem; font-weight: 500; color: #64748b;">/month</span></div>
      <ul style="list-style: none; padding: 0; margin-bottom: 30px; display: flex; flex-direction: column; gap: 12px; color: #475569; font-size: 0.95rem;">
        <li>✓ Unlimited HTML Pages</li>
        <li>✓ All Premium Layout Blocks</li>
        <li>✓ Direct Media Asset Manager</li>
        <li>✓ Full Visual Property Inspector</li>
      </ul>
      <a href="#" style="display: block; text-align: center; background: #6366f1; color: white; padding: 12px; border-radius: 10px; text-decoration: none; font-weight: 700; box-shadow: 0 4px 12px rgba(99,102,241,0.3);">Start 14-Day Free Trial</a>
    </div>
  </div>
</section>`
  },
  {
    id: 'faq-accordion',
    name: 'Accordion FAQ Section',
    category: 'FAQ',
    icon: 'HelpCircle',
    html: `<section class="sitecraft-block faq-block" style="padding: 80px 24px; max-width: 800px; margin: 0 auto;">
  <div style="text-align: center; margin-bottom: 50px;">
    <h2 style="font-size: 2.4rem; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Frequently Asked Questions</h2>
    <p style="color: #64748b; font-size: 1.1rem;">Quick answers to common questions about our static site visual creator.</p>
  </div>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
      <h3 style="font-size: 1.15rem; font-weight: 700; color: #0f172a; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
        <span>How does the ZIP import work?</span>
        <span style="color: #6366f1;">+</span>
      </h3>
      <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">Simply drag and drop any compressed HTML theme archive. Our reader extracts CSS, JS, and image elements into an in-memory browser virtual drive for visual editing.</p>
    </div>
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
      <h3 style="font-size: 1.15rem; font-weight: 700; color: #0f172a; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
        <span>Is the generated HTML code clean and exportable?</span>
        <span style="color: #6366f1;">+</span>
      </h3>
      <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">Yes! During compilation, the exporter removes all visual editor overlays, highlight selectors, helper scripts, and packs clean, original files into your published ZIP file.</p>
    </div>
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
      <h3 style="font-size: 1.15rem; font-weight: 700; color: #0f172a; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
        <span>Can I edit templates on a mobile phone?</span>
        <span style="color: #6366f1;">+</span>
      </h3>
      <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0;">While you can preview responsive layouts in tablet and mobile viewports, visual creation and dragging work best on desktop screens.</p>
    </div>
  </div>
</section>`
  },
  {
    id: 'cta-banner',
    name: 'Call To Action Banner',
    category: 'Call to Action',
    icon: 'Zap',
    html: `<section class="sitecraft-block cta-block" style="padding: 80px 24px; margin: 50px auto; max-width: 1100px; background: linear-gradient(135deg, #4f46e5, #7c3aed); border-radius: 24px; color: white; text-align: center; box-shadow: 0 20px 40px rgba(99,102,241,0.15);">
  <h2 style="font-size: 2.6rem; font-weight: 850; margin-bottom: 16px; color: #ffffff; letter-spacing: -0.01em;">Launch your new static site today</h2>
  <p style="font-size: 1.15rem; opacity: 0.9; margin-bottom: 36px; max-width: 650px; margin-left: auto; margin-right: auto; line-height: 1.6;">Join thousands of designers, developers, and makers building static themes visually in the browser.</p>
  <a href="#" style="background: white; color: #4f46e5; padding: 16px 36px; border-radius: 12px; text-decoration: none; font-weight: 750; display: inline-block; font-size: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">Get Started Free</a>
</section>`
  },
  {
    id: 'contact-form',
    name: 'Contact Grid Section',
    category: 'Forms',
    icon: 'Mail',
    html: `<section class="sitecraft-block contact-block" style="padding: 80px 24px; max-width: 650px; margin: 0 auto;">
  <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 44px; box-shadow: 0 10px 30px rgba(0,0,0,0.02);">
    <h2 style="font-size: 2rem; color: #0f172a; margin-bottom: 8px; text-align: center; font-weight: 800;">Get in Touch</h2>
    <p style="color: #64748b; text-align: center; margin-bottom: 32px; font-size: 0.98rem;">Have comments or feature questions? Drop us a note.</p>
    <form style="display: flex; flex-direction: column; gap: 20px;">
      <div>
        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 8px;">Your Name</label>
        <input type="text" placeholder="John Doe" style="width: 100%; padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 0.95rem;">
      </div>
      <div>
        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 8px;">Email Address</label>
        <input type="email" placeholder="john@example.com" style="width: 100%; padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 0.95rem;">
      </div>
      <div>
        <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 8px;">Message</label>
        <textarea rows="4" placeholder="How can we help..." style="width: 100%; padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 0.95rem; font-family: inherit;"></textarea>
      </div>
      <button type="button" style="background: #6366f1; color: white; padding: 14px; border: none; border-radius: 10px; font-weight: 700; font-size: 1rem; cursor: pointer; margin-top: 10px; box-shadow: 0 4px 12px rgba(99,102,241,0.25);">Send Message</button>
    </form>
  </div>
</section>`
  },
  {
    id: 'footer-simple',
    name: 'Modern Accent Footer',
    category: 'Footers',
    icon: 'PanelBottom',
    html: `<footer class="sitecraft-block footer-block" style="background: #090d16; color: #94a3b8; padding: 60px 24px; border-top: 1px solid #1e293b; font-size: 0.9rem;">
  <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 30px;">
    <div>
      <h3 style="color: white; font-size: 1.3rem; margin-bottom: 8px; font-weight: 800;">⚡ SiteCraft Studio</h3>
      <p style="color: #64748b;">The ultimate local web template workspace.</p>
    </div>
    <div style="display: flex; gap: 24px;">
      <a href="#" style="color: #94a3b8; text-decoration: none; font-weight: 500;">Privacy Policy</a>
      <a href="#" style="color: #94a3b8; text-decoration: none; font-weight: 500;">Terms of Service</a>
      <a href="#" style="color: #94a3b8; text-decoration: none; font-weight: 500;">Contact Support</a>
    </div>
  </div>
  <div style="max-width: 1200px; margin: 40px auto 0; padding-top: 24px; border-top: 1px solid #1e293b; text-align: center; color: #475569; font-size: 0.8rem;">
    © 2026 SiteCraft Studio Technologies Inc. All rights reserved.
  </div>
</footer>`
  },
  {
    id: 'card-feature',
    name: 'Individual Feature Card',
    category: 'Cards & Components',
    icon: 'Layers',
    html: `<div class="sitecraft-block card-element" style="background: #ffffff; border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.02); max-width: 350px; margin: 15px auto;">
  <div style="font-size: 1.8rem; margin-bottom: 16px; background: #e0e7ff; width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #6366f1;">💎</div>
  <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 8px; color: #0f172a;">Feature Card Item</h3>
  <p style="color: #475569; font-size: 0.9rem; line-height: 1.5; margin: 0;">Add your feature descriptions, benefits or key service selling points here.</p>
</div>`
  },
  {
    id: 'card-product',
    name: 'Individual Product Card',
    category: 'Cards & Components',
    icon: 'Grid',
    html: `<div class="sitecraft-block card-element" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.02); max-width: 300px; margin: 15px auto; display: flex; flex-direction: column;">
  <div style="height: 160px; background: linear-gradient(135deg, #fed7aa, #f97316); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; position: relative;">🎒</div>
  <div style="padding: 16px; display: flex; flex-grow: 1; flex-direction: column; justify-content: space-between;">
    <div>
      <span style="color: #f97316; font-size: 0.7rem; font-weight: 700; text-transform: uppercase;">Category</span>
      <h3 style="font-size: 1.05rem; font-weight: 700; margin: 6px 0; color: #0f172a;">Premium Gear Bag</h3>
      <p style="color: #64748b; font-size: 0.82rem; line-height: 1.4; margin-bottom: 12px;">High quality waterproof bag design for modern creators.</p>
    </div>
    <div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <div style="font-size: 1.15rem; font-weight: 800; color: #0f172a;">$49.00</div>
        <div style="color: #fbbf24; font-size: 0.85rem;">★ 4.8</div>
      </div>
      <button style="width: 100%; padding: 8px; background: #0f172a; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.85rem;">Add to Cart</button>
    </div>
  </div>
</div>`
  },
  {
    id: 'card-testimonial',
    name: 'Individual Testimonial Card',
    category: 'Cards & Components',
    icon: 'Users',
    html: `<div class="sitecraft-block card-element" style="background: #ffffff; border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.02); max-width: 350px; margin: 15px auto;">
  <div style="color: #fbbf24; font-size: 1.1rem; margin-bottom: 12px;">★★★★★</div>
  <p style="color: #334155; font-style: italic; line-height: 1.5; font-size: 0.88rem; margin-bottom: 16px;">"The template builder was incredibly quick. Inserting card elements to construct a page has made visual landing page creation extremely fast."</p>
  <div style="display: flex; align-items: center; gap: 10px;">
    <span style="width: 36px; height: 36px; border-radius: 50%; background: #6366f1; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem;">JD</span>
    <div>
      <h4 style="font-weight: 700; color: #0f172a; margin: 0; font-size: 0.88rem;">Jane Doe</h4>
      <span style="color: #64748b; font-size: 0.75rem;">Designer, StudioLabs</span>
    </div>
  </div>
</div>`
  },
  {
    id: 'card-blog',
    name: 'Individual Blog Post Card',
    category: 'Cards & Components',
    icon: 'Layers',
    html: `<div class="sitecraft-block card-element" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.02); max-width: 320px; margin: 15px auto; display: flex; flex-direction: column;">
  <div style="height: 150px; background: linear-gradient(135deg, #c7d2fe, #6366f1); display: flex; align-items: center; justify-content: center; font-size: 2rem;">💻</div>
  <div style="padding: 16px; display: flex; flex-grow: 1; flex-direction: column; justify-content: space-between;">
    <div>
      <div style="display: flex; gap: 8px; margin-bottom: 8px; font-size: 0.75rem; color: #64748b; font-weight: 600;">
        <span>July 22, 2026</span>
        <span>•</span>
        <span style="color: #6366f1;">TECH</span>
      </div>
      <h3 style="font-size: 1.05rem; font-weight: 700; color: #0f172a; line-height: 1.3; margin-bottom: 8px;">Guide to visual page development</h3>
      <p style="color: #475569; font-size: 0.85rem; line-height: 1.4; margin-bottom: 14px;">Learn how to compile, structure and arrange blocks visually inside your local workspace.</p>
    </div>
    <a href="#" style="color: #6366f1; text-decoration: none; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; gap: 4px;">Read more →</a>
  </div>
</div>`
  },
  {
    id: 'card-profile',
    name: 'Individual Profile Card',
    category: 'Cards & Components',
    icon: 'Users',
    html: `<div class="sitecraft-block card-element" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.02); max-width: 250px; margin: 15px auto;">
  <div style="width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, #a7f3d0, #059669); margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 1.5rem;">AH</div>
  <h3 style="font-size: 1.1rem; font-weight: 700; color: #0f172a; margin-bottom: 4px;">Alex Henderson</h3>
  <span style="color: #6366f1; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">Co-Founder & CEO</span>
  <p style="color: #64748b; font-size: 0.82rem; margin: 12px 0 16px; line-height: 1.4;">Software architect passionate about visual coding automation.</p>
  <div style="display: flex; justify-content: center; gap: 8px; color: #94a3b8; font-size: 0.8rem;">
    <a href="#" style="color: inherit; text-decoration: none;">Twitter</a>
    <span>•</span>
    <a href="#" style="color: inherit; text-decoration: none;">LinkedIn</a>
  </div>
</div>`
  },
  {
    id: 'card-pricing',
    name: 'Individual Pricing Card',
    category: 'Cards & Components',
    icon: 'DollarSign',
    html: `<div class="sitecraft-block card-element" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 28px; box-shadow: 0 4px 12px rgba(0,0,0,0.02); max-width: 280px; margin: 15px auto; text-align: left;">
  <h3 style="font-size: 1.1rem; font-weight: 700; color: #0f172a; margin-bottom: 6px;">Pro Creator</h3>
  <p style="color: #64748b; font-size: 0.8rem; margin-bottom: 16px;">Advanced features for custom templates.</p>
  <div style="font-size: 2.2rem; font-weight: 850; color: #0f172a; margin-bottom: 20px;">$29 <span style="font-size: 0.9rem; font-weight: 500; color: #64748b;">/mo</span></div>
  <ul style="list-style: none; padding: 0; margin-bottom: 20px; display: flex; flex-direction: column; gap: 10px; color: #475569; font-size: 0.85rem;">
    <li>✓ Unlimited HTML Pages</li>
    <li>✓ Premium Layout Blocks</li>
    <li>✓ Media Asset Manager</li>
  </ul>
  <a href="#" style="display: block; text-align: center; background: #6366f1; color: white; padding: 10px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 0.85rem;">Select Plan</a>
</div>`
  },
  {
    id: 'faq-accordion-dynamic',
    name: 'Interactive Accordion [Dynamic]',
    category: 'FAQ',
    icon: 'HelpCircle',
    html: `<section class="sitecraft-block dynamic-faq-block" style="padding: 80px 24px; max-width: 800px; margin: 0 auto; font-family: inherit;">
  <style>
    .sitecraft-accordion {
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      margin-bottom: 16px;
      background: #ffffff;
      overflow: hidden;
      transition: all 0.25s ease;
    }
    .sitecraft-accordion-header {
      padding: 20px 24px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
      font-weight: 700;
      color: #0f172a;
    }
    .sitecraft-accordion-icon {
      font-size: 1.25rem;
      color: #6366f1;
      transition: transform 0.2s ease;
    }
    .sitecraft-accordion-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.25s ease-out, padding 0.25s ease;
      padding: 0 24px;
      color: #475569;
      font-size: 0.95rem;
      line-height: 1.6;
    }
    .sitecraft-accordion.active {
      border-color: #6366f1;
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.05);
    }
    .sitecraft-accordion.active .sitecraft-accordion-icon {
      transform: rotate(45deg);
    }
    .sitecraft-accordion.active .sitecraft-accordion-content {
      max-height: 200px;
      padding-bottom: 20px;
    }
  </style>
  <div style="text-align: center; margin-bottom: 40px;">
    <h2 style="font-size: 2.2rem; font-weight: 850; color: #0f172a; margin-bottom: 10px;">Frequently Asked Questions (Interactive)</h2>
    <p style="color: #64748b;">Click on any question below to expand and collapse answers dynamically.</p>
  </div>
  <div>
    <div class="sitecraft-accordion">
      <div class="sitecraft-accordion-header">
        <span>Can I export and host the website anywhere?</span>
        <span class="sitecraft-accordion-icon">+</span>
      </div>
      <div class="sitecraft-accordion-content">
        Yes! When you click Export ZIP, SiteCraft Studio compiles all HTML templates, inline CSS styles, script scripts, and images into a single package. You can host this static folder on Netlify, Vercel, AWS S3, GitHub Pages, or any server.
      </div>
    </div>
    <div class="sitecraft-accordion">
      <div class="sitecraft-accordion-header">
        <span>Does this support offline page creation?</span>
        <span class="sitecraft-accordion-icon">+</span>
      </div>
      <div class="sitecraft-accordion-content">
        Yes! Since SiteCraft is built entirely client-side using browser memory, indexdb caching, and in-memory zip handlers, all template styling and visual operations work completely offline without sending any code to a server.
      </div>
    </div>
  </div>
  <script>
    (function() {
      const container = document.currentScript ? document.currentScript.parentElement : document.body;
      const headers = container.querySelectorAll('.sitecraft-accordion-header');
      headers.forEach(header => {
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);
        newHeader.addEventListener('click', () => {
          const accordion = newHeader.parentElement;
          accordion.classList.toggle('active');
        });
      });
    })();
  </script>
</section>`
  },
  {
    id: 'pricing-table-dynamic',
    name: 'Interactive Billing Switcher [Dynamic]',
    category: 'Pricing',
    icon: 'DollarSign',
    html: `<section class="sitecraft-block dynamic-pricing-block" style="padding: 80px 24px; max-width: 1000px; margin: 0 auto; text-align: center; font-family: inherit;">
  <style>
    .billing-toggle-wrapper {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: #f1f5f9;
      padding: 4px;
      border-radius: 30px;
      margin-bottom: 40px;
    }
    .billing-toggle-btn {
      border: none;
      background: transparent;
      padding: 8px 20px;
      border-radius: 20px;
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
      color: #64748b;
    }
    .billing-toggle-btn.active {
      background: #ffffff;
      color: #0f172a;
      box-shadow: 0 4px 10px rgba(0,0,0,0.06);
    }
    .save-badge {
      background: #10b981;
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 800;
    }
  </style>
  <div style="margin-bottom: 30px;">
    <h2 style="font-size: 2.2rem; font-weight: 850; color: #0f172a; margin-bottom: 10px;">Simple Billing Plans</h2>
    <p style="color: #64748b; margin-bottom: 24px;">Choose the frequency that fits your workflow. Save 20% on annual billing plans.</p>
    
    <div class="billing-toggle-wrapper">
      <button class="billing-toggle-btn active" data-billing="monthly">Monthly</button>
      <button class="billing-toggle-btn" data-billing="yearly">Yearly</button>
      <span class="save-badge">Save 20%</span>
    </div>
  </div>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; max-width: 800px; margin: 0 auto; text-align: left;">
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.01);">
      <h3 style="font-size: 1.2rem; font-weight: 700; color: #0f172a;">Hobby Starter</h3>
      <p style="color: #64748b; font-size: 0.85rem; margin: 8px 0 20px;">For simple single-page portfolios.</p>
      <div style="font-size: 2.5rem; font-weight: 850; color: #0f172a; margin-bottom: 20px;">
        $<span class="price-val" data-monthly="9" data-yearly="7">9</span><span style="font-size: 1rem; color: #64748b; font-weight: 500;">/mo</span>
      </div>
      <button style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; background: white; border-radius: 8px; font-weight: 700; cursor: pointer;">Get Started</button>
    </div>
    <div style="background: #ffffff; border: 2.5px solid #6366f1; border-radius: 20px; padding: 40px; box-shadow: 0 10px 30px rgba(99,102,241,0.08); position: relative;">
      <span style="position: absolute; top: -14px; right: 24px; background: #6366f1; color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.72rem; font-weight: 800;">POPULAR</span>
      <h3 style="font-size: 1.2rem; font-weight: 700; color: #0f172a;">Pro Creator</h3>
      <p style="color: #64748b; font-size: 0.85rem; margin: 8px 0 20px;">For builders shipping weekly apps.</p>
      <div style="font-size: 2.5rem; font-weight: 850; color: #0f172a; margin-bottom: 20px;">
        $<span class="price-val" data-monthly="29" data-yearly="23">29</span><span style="font-size: 1rem; color: #64748b; font-weight: 500;">/mo</span>
      </div>
      <button style="width: 100%; padding: 12px; background: #6366f1; border: none; color: white; border-radius: 8px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(99,102,241,0.25);">Start Pro Trial</button>
    </div>
  </div>
  
  <script>
    (function() {
      const wrapper = document.currentScript ? document.currentScript.parentElement : document.body;
      const prices = wrapper.querySelectorAll('.price-val');
      const btns = wrapper.querySelectorAll('.billing-toggle-btn');
      
      btns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', () => {
          const container = newBtn.closest('.dynamic-pricing-block');
          container.querySelectorAll('.billing-toggle-btn').forEach(b => b.classList.remove('active'));
          newBtn.classList.add('active');
          const mode = newBtn.getAttribute('data-billing');
          container.querySelectorAll('.price-val').forEach(price => {
            const val = mode === 'yearly' ? price.getAttribute('data-yearly') : price.getAttribute('data-monthly');
            price.textContent = val;
          });
        });
      });
    })();
  </script>
</section>`
  },
  {
    id: 'blog-feed-dynamic',
    name: 'Live API Blog Feed [Dynamic]',
    category: 'Features & Cards',
    icon: 'Grid',
    html: `<section class="sitecraft-block api-blog-feed" style="padding: 80px 24px; max-width: 1100px; margin: 0 auto; text-align: center; font-family: inherit;">
  <div style="max-width: 600px; margin: 0 auto 40px;">
    <h2 style="font-size: 2.2rem; font-weight: 850; color: #0f172a; margin-bottom: 10px;">Live Insights Feed (API Fetch)</h2>
    <p style="color: #64748b;">This card deck dynamically queries real articles from a live REST API feed inside the browser.</p>
  </div>
  
  <div class="api-feed-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; text-align: left;">
    <div class="feed-placeholder" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94a3b8; font-size: 1.1rem; font-weight: 500;">
      <span style="display: inline-block; animation: spin 1s linear infinite; margin-right: 10px;">🔄</span> Loading live articles from endpoint...
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    </div>
  </div>
  
  <script>
    (function() {
      const sections = document.querySelectorAll('.api-blog-feed');
      const latestSection = sections[sections.length - 1] || document.body;
      const container = latestSection.querySelector('.api-feed-container');
      if (!container) return;
      
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
        .then(res => res.json())
        .then(data => {
          container.innerHTML = '';
          data.forEach((post, index) => {
            const colors = ['linear-gradient(135deg, #c7d2fe, #6366f1)', 'linear-gradient(135deg, #a5f3fc, #06b6d4)', 'linear-gradient(135deg, #fbcfe8, #f472b6)'];
            const card = document.createElement('div');
            card.style.cssText = 'background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.02); display: flex; flex-direction: column;';
            card.innerHTML = \`
              <div style="height: 140px; background: \${colors[index % 3]}; display: flex; align-items: center; justify-content: center; font-size: 2.2rem;">📰</div>
              <div style="padding: 24px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="font-size: 0.72rem; color: #6366f1; font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">Dynamic Post #\${post.id}</div>
                  <h3 style="font-size: 1.1rem; font-weight: 700; color: #0f172a; margin-bottom: 10px; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">\${post.title}</h3>
                  <p style="color: #64748b; font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">\${post.body}</p>
                </div>
                <a href="#" style="color: #6366f1; text-decoration: none; font-weight: 700; font-size: 0.9rem;">Read Article →</a>
              </div>
            \`;
            container.appendChild(card);
          });
        })
        .catch(err => {
          container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: #ef4444; padding: 20px;">Failed to load dynamic blog posts. Please check network.</div>';
          console.error(err);
        });
    })();
  </script>
</section>`
  },
  {
    id: 'json-render-dynamic',
    name: 'Local JSON Product List [Dynamic]',
    category: 'Features & Cards',
    icon: 'Grid',
    html: `<section class="sitecraft-block local-json-feed" style="padding: 80px 24px; max-width: 1100px; margin: 0 auto; text-align: center; font-family: inherit;">
  <div style="text-align: center; max-width: 600px; margin: 0 auto 40px;">
    <h2 style="font-size: 2.2rem; font-weight: 850; color: #0f172a; margin-bottom: 10px;">Local JSON Product List</h2>
    <p style="color: #64748b;">This section dynamically renders cards using data from your local <strong>products.json</strong> file.</p>
  </div>
  
  <div class="json-feed-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; text-align: left;">
    <!-- Rendered items appear here -->
  </div>
  
  <script>
    (function() {
      const sections = document.querySelectorAll('.local-json-feed');
      const latestSection = sections[sections.length - 1] || document.body;
      const container = latestSection.querySelector('.json-feed-container');
      if (!container) return;
      
      // sitecraft-inline-json:products.json
      const jsonData = [
        { "title": "Sample Item A", "description": "This is sample data. Create or edit 'products.json' in the pages list to view your data here.", "price": "$19.99", "category": "Starter" },
        { "title": "Sample Item B", "description": "You can customize titles, descriptions, and categories directly in products.json.", "price": "$29.99", "category": "Advanced" }
      ];
      
      container.innerHTML = '';
      jsonData.forEach((item, index) => {
        const colors = ['linear-gradient(135deg, #c7d2fe, #6366f1)', 'linear-gradient(135deg, #a5f3fc, #06b6d4)', 'linear-gradient(135deg, #fbcfe8, #f472b6)'];
        const card = document.createElement('div');
        card.style.cssText = 'background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.02); display: flex; flex-direction: column;';
        card.innerHTML = \`
          <div style="height: 140px; background: \${colors[index % 3]}; display: flex; align-items: center; justify-content: center; font-size: 2.2rem;">📦</div>
          <div style="padding: 24px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.72rem; color: #6366f1; font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">\${item.category || 'Product'}</div>
              <h3 style="font-size: 1.1rem; font-weight: 700; color: #0f172a; margin-bottom: 10px; line-height: 1.3;">\${item.title || item.name || 'Untitled'}</h3>
              <p style="color: #64748b; font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">\${item.description || item.body || ''}</p>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 1.2rem; font-weight: 800; color: #0f172a;">\${item.price || ''}</span>
              <button style="padding: 6px 12px; background: #0f172a; color: white; border: none; border-radius: 6px; font-size: 0.8rem; cursor: pointer;">Buy Now</button>
            </div>
          </div>
        \`;
        container.appendChild(card);
      });
    })();
  </script>
</section>`
  },
  {
    id: 'custom-html-container',
    name: 'Custom HTML Container',
    category: 'Cards & Components',
    icon: 'Layers',
    html: `<section class="sitecraft-block custom-html-block" style="padding: 60px 24px; max-width: 1000px; margin: 30px auto; border: 2px dashed #cbd5e1; border-radius: 16px; text-align: center; font-family: inherit; background: #ffffff;">
  <div style="padding: 40px; color: #64748b;">
    <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 12px; color: #0f172a;">Custom HTML Container</h3>
    <p style="margin-bottom: 20px; font-size: 0.95rem;">Select this container and open the <strong>Code Editor</strong> to place your custom HTML structures, tags, or scripts directly inside.</p>
  </div>
</section>`
  },
  {
    id: 'gallery-filterable',
    name: 'Filterable Portfolio Gallery',
    category: 'Gallery',
    icon: 'Grid',
    html: `<section class="sitecraft-block filterable-gallery-block" style="padding: 80px 24px; max-width: 1200px; margin: 0 auto; font-family: inherit;">
  <style>
    .gallery-filter-btn {
      border: 1px solid #cbd5e1;
      background: white;
      color: #475569;
      padding: 8px 20px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 0.88rem;
      cursor: pointer;
      transition: all 0.25s ease;
    }
    .gallery-filter-btn:hover {
      border-color: #6366f1;
      color: #6366f1;
    }
    .gallery-filter-btn.active {
      background: #6366f1;
      border-color: #6366f1;
      color: white;
      box-shadow: 0 4px 10px rgba(99,102,241,0.25);
    }
    .gallery-item-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.02);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .gallery-item-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.08);
    }
    .gallery-image-wrapper {
      position: relative;
      height: 220px;
      overflow: hidden;
    }
    .gallery-image-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .gallery-item-card:hover .gallery-image-wrapper img {
      transform: scale(1.08);
    }
    .gallery-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 23, 42, 0.4);
      opacity: 0;
      transition: opacity 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .gallery-item-card:hover .gallery-overlay {
      opacity: 1;
    }
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 30px;
    }
    @media (max-width: 640px) {
      .gallery-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }
  </style>
  
  <div style="text-align: center; max-width: 600px; margin: 0 auto 40px;">
    <h2 style="font-size: 2.4rem; font-weight: 850; color: #0f172a; margin-bottom: 12px;">Creative Showcases</h2>
    <p style="color: #64748b; font-size: 1.1rem;">A fully filterable responsive catalog of design work, art prints, and media projects.</p>
  </div>
  
  <div class="gallery-filters" style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 40px;">
    <button class="gallery-filter-btn active" data-filter="all">Show All</button>
    <button class="gallery-filter-btn" data-filter="design">Design</button>
    <button class="gallery-filter-btn" data-filter="nature">Nature</button>
    <button class="gallery-filter-btn" data-filter="tech">Technology</button>
  </div>
  
  <div class="gallery-grid">
    <div class="gallery-item-card" data-category="design">
      <div class="gallery-image-wrapper">
        <img src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80" alt="Minimal design work">
        <div class="gallery-overlay">
          <span style="color: white; font-weight: 700; border: 1px solid white; padding: 8px 16px; border-radius: 30px; font-size: 0.85rem;">View Concept</span>
        </div>
      </div>
      <div style="padding: 20px;">
        <span style="color: #6366f1; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">Brand Identity</span>
        <h3 style="font-size: 1.15rem; font-weight: 700; margin: 6px 0; color: #0f172a;">Aero Branding Suite</h3>
        <p style="color: #64748b; font-size: 0.88rem; margin: 0; line-height: 1.4;">Minimal brand system designed for aero startups.</p>
      </div>
    </div>
    
    <div class="gallery-item-card" data-category="nature">
      <div class="gallery-image-wrapper">
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" alt="Coastline photography">
        <div class="gallery-overlay">
          <span style="color: white; font-weight: 700; border: 1px solid white; padding: 8px 16px; border-radius: 30px; font-size: 0.85rem;">View Concept</span>
        </div>
      </div>
      <div style="padding: 20px;">
        <span style="color: #10b981; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">Photography</span>
        <h3 style="font-size: 1.15rem; font-weight: 700; margin: 6px 0; color: #0f172a;">Serene Coastlines</h3>
        <p style="color: #64748b; font-size: 0.88rem; margin: 0; line-height: 1.4;">Aerial sunset captures along the Hawaiian shores.</p>
      </div>
    </div>
    
    <div class="gallery-item-card" data-category="tech">
      <div class="gallery-image-wrapper">
        <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80" alt="Programming workspace">
        <div class="gallery-overlay">
          <span style="color: white; font-weight: 700; border: 1px solid white; padding: 8px 16px; border-radius: 30px; font-size: 0.85rem;">View Concept</span>
        </div>
      </div>
      <div style="padding: 20px;">
        <span style="color: #06b6d4; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">Digital Art</span>
        <h3 style="font-size: 1.15rem; font-weight: 700; margin: 6px 0; color: #0f172a;">Cybernetic Patterns</h3>
        <p style="color: #64748b; font-size: 0.88rem; margin: 0; line-height: 1.4;">Generative network flows and complex neural visualizations.</p>
      </div>
    </div>
    
    <div class="gallery-item-card" data-category="design">
      <div class="gallery-image-wrapper">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" alt="Interior architectural design">
        <div class="gallery-overlay">
          <span style="color: white; font-weight: 700; border: 1px solid white; padding: 8px 16px; border-radius: 30px; font-size: 0.85rem;">View Concept</span>
        </div>
      </div>
      <div style="padding: 20px;">
        <span style="color: #6366f1; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">Architecture</span>
        <h3 style="font-size: 1.15rem; font-weight: 700; margin: 6px 0; color: #0f172a;">Minimalist Living</h3>
        <p style="color: #64748b; font-size: 0.88rem; margin: 0; line-height: 1.4;">Residential interior design incorporating organic concrete shapes.</p>
      </div>
    </div>
    
    <div class="gallery-item-card" data-category="nature">
      <div class="gallery-image-wrapper">
        <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80" alt="Alps lake landscape">
        <div class="gallery-overlay">
          <span style="color: white; font-weight: 700; border: 1px solid white; padding: 8px 16px; border-radius: 30px; font-size: 0.85rem;">View Concept</span>
        </div>
      </div>
      <div style="padding: 20px;">
        <span style="color: #10b981; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">Photography</span>
        <h3 style="font-size: 1.15rem; font-weight: 700; margin: 6px 0; color: #0f172a;">Alpine Reflection</h3>
        <p style="color: #64748b; font-size: 0.88rem; margin: 0; line-height: 1.4;">Still morning waters under the snowy mountain summits.</p>
      </div>
    </div>

    <div class="gallery-item-card" data-category="tech">
      <div class="gallery-image-wrapper">
        <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80" alt="Hike mountain tech theme">
        <div class="gallery-overlay">
          <span style="color: white; font-weight: 700; border: 1px solid white; padding: 8px 16px; border-radius: 30px; font-size: 0.85rem;">View Concept</span>
        </div>
      </div>
      <div style="padding: 20px;">
        <span style="color: #06b6d4; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">Adventure Tech</span>
        <h3 style="font-size: 1.15rem; font-weight: 700; margin: 6px 0; color: #0f172a;">Hiker Companion App</h3>
        <p style="color: #64748b; font-size: 0.88rem; margin: 0; line-height: 1.4;">Offline mapping tech designed for off-grid backcountry trail safety.</p>
      </div>
    </div>
  </div>
  
  <script>
    (function() {
      const section = document.currentScript ? document.currentScript.parentElement : document.body;
      const filters = section.querySelectorAll('.gallery-filter-btn');
      const cards = section.querySelectorAll('.gallery-item-card');
      
      filters.forEach(filter => {
        const newFilter = filter.cloneNode(true);
        filter.parentNode.replaceChild(newFilter, filter);
        newFilter.addEventListener('click', () => {
          section.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
          newFilter.classList.add('active');
          const cat = newFilter.getAttribute('data-filter');
          cards.forEach(card => {
            if (cat === 'all' || card.getAttribute('data-category') === cat) {
              card.style.display = 'block';
              setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
            } else {
              card.style.opacity = '0';
              card.style.transform = 'scale(0.95)';
              setTimeout(() => { card.style.display = 'none'; }, 200);
            }
          });
        });
      });
    })();
  </script>
</section>`
  },
  {
    id: 'gallery-masonry',
    name: 'Modern Masonry Grid Gallery',
    category: 'Gallery',
    icon: 'Grid',
    html: `<section class="sitecraft-block masonry-gallery-block" style="padding: 80px 24px; max-width: 1200px; margin: 0 auto; font-family: inherit;">
  <style>
    .masonry-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      grid-auto-rows: 240px;
      grid-gap: 24px;
    }
    .masonry-card {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.015);
      transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .masonry-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }
    .masonry-card:hover {
      transform: scale(1.02);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
      z-index: 5;
    }
    .masonry-card:hover img {
      transform: scale(1.08);
    }
    .masonry-card-tall {
      grid-row: span 2;
    }
    .masonry-card-wide {
      grid-column: span 2;
    }
    .masonry-card-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0) 100%);
      padding: 24px;
      opacity: 0;
      transition: opacity 0.35s ease;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: 60%;
    }
    .masonry-card:hover .masonry-card-overlay {
      opacity: 1;
    }
    @media (max-width: 768px) {
      .masonry-container {
        grid-template-columns: 1fr;
        grid-auto-rows: auto;
        grid-gap: 16px;
      }
      .masonry-card-tall {
        grid-row: span 1 !important;
      }
      .masonry-card-wide {
        grid-column: span 1 !important;
      }
      .masonry-card {
        height: 280px;
      }
    }
  </style>

  <div style="text-align: center; max-width: 600px; margin: 0 auto 50px;">
    <h2 style="font-size: 2.4rem; font-weight: 850; color: #0f172a; margin-bottom: 12px;">Creative Collage</h2>
    <p style="color: #64748b; font-size: 1.1rem;">A fluid layout combining vertical landscape and wide scenic view layouts.</p>
  </div>

  <div class="masonry-container">
    <div class="masonry-card masonry-card-tall">
      <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80" alt="Tall mountain image">
      <div class="masonry-card-overlay">
        <span style="color: #a855f7; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Vertical View</span>
        <h4 style="color: white; margin: 0; font-size: 1.15rem; font-weight: 700;">Alpine Summits</h4>
      </div>
    </div>
    
    <div class="masonry-card">
      <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" alt="Scenic beach image">
      <div class="masonry-card-overlay">
        <span style="color: #3b82f6; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Nature</span>
        <h4 style="color: white; margin: 0; font-size: 1.15rem; font-weight: 700;">Emerald Coasts</h4>
      </div>
    </div>
    
    <div class="masonry-card masonry-card-wide">
      <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80" alt="Wide forest image">
      <div class="masonry-card-overlay">
        <span style="color: #10b981; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Landscape</span>
        <h4 style="color: white; margin: 0; font-size: 1.25rem; font-weight: 700;">Misty Forest Valleys</h4>
      </div>
    </div>
    
    <div class="masonry-card">
      <img src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80" alt="Park bridge">
      <div class="masonry-card-overlay">
        <span style="color: #ec4899; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Urban</span>
        <h4 style="color: white; margin: 0; font-size: 1.15rem; font-weight: 700;">Bridge of Tranquility</h4>
      </div>
    </div>

    <div class="masonry-card masonry-card-tall">
      <img src="https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&w=600&q=80" alt="Green fields">
      <div class="masonry-card-overlay">
        <span style="color: #f59e0b; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Meadow</span>
        <h4 style="color: white; margin: 0; font-size: 1.15rem; font-weight: 700;">Golden Sunset Fields</h4>
      </div>
    </div>

    <div class="masonry-card">
      <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80" alt="Hiker tech theme">
      <div class="masonry-card-overlay">
        <span style="color: #06b6d4; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Exploration</span>
        <h4 style="color: white; margin: 0; font-size: 1.15rem; font-weight: 700;">Trailblazers</h4>
      </div>
    </div>
  </div>
</section>`
  },
  {
    id: 'gallery-carousel',
    name: 'Slick Slide Carousel Gallery',
    category: 'Gallery',
    icon: 'Grid',
    html: `<section class="sitecraft-block slider-gallery-block" style="padding: 80px 24px; max-width: 1100px; margin: 0 auto; font-family: inherit;">
  <style>
    .slider-container {
      position: relative;
      overflow: hidden;
      border-radius: 24px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.06);
      aspect-ratio: 16 / 9;
      background: #0f172a;
    }
    .slider-track {
      display: flex;
      width: 100%;
      height: 100%;
      transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .slide-item {
      min-width: 100%;
      height: 100%;
      position: relative;
    }
    .slide-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .slide-content-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 60px 40px 40px;
      background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%);
      color: white;
    }
    .slide-nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.35);
      color: white;
      font-size: 1.15rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      z-index: 10;
    }
    .slide-nav-btn:hover {
      background: white;
      color: #0f172a;
      transform: translateY(-50%) scale(1.05);
    }
    .slide-prev { left: 24px; }
    .slide-next { right: 24px; }
    .slider-dots {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-top: 20px;
    }
    .slider-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #cbd5e1;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .slider-dot.active {
      width: 24px;
      background: #6366f1;
      border-radius: 10px;
    }
    @media (max-width: 640px) {
      .slider-container {
        aspect-ratio: 4 / 3 !important;
      }
      .slide-content-overlay {
        padding: 30px 20px 20px !important;
      }
      .slide-content-overlay h3 {
        font-size: 1.25rem !important;
      }
      .slide-content-overlay p {
        font-size: 0.9rem !important;
      }
      .slide-nav-btn {
        width: 36px !important;
        height: 36px !important;
        font-size: 0.95rem !important;
      }
      .slide-prev { left: 12px !important; }
      .slide-next { right: 12px !important; }
    }
  </style>

  <div style="text-align: center; max-width: 600px; margin: 0 auto 50px;">
    <h2 style="font-size: 2.4rem; font-weight: 850; color: #0f172a; margin-bottom: 12px;">Spotlight Carousel</h2>
    <p style="color: #64748b; font-size: 1.1rem;">A sliding showcases gallery for high-resolution photography, architecture, and interior design portfolios.</p>
  </div>

  <div class="slider-container">
    <button class="slide-nav-btn slide-prev">←</button>
    <button class="slide-nav-btn slide-next">→</button>
    
    <div class="slider-track">
      <div class="slide-item">
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" alt="Hawaiian shoreline">
        <div class="slide-content-overlay">
          <span style="color: #38bdf8; font-weight: 700; font-size: 0.8rem; text-transform: uppercase;">01 / PHOTOGRAPHY</span>
          <h3 style="font-size: 1.8rem; font-weight: 800; margin: 8px 0 0;">Laupahoehoe Golden Coast</h3>
        </div>
      </div>
      <div class="slide-item">
        <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80" alt="Lake reflection in Alps">
        <div class="slide-content-overlay">
          <span style="color: #38bdf8; font-weight: 700; font-size: 0.8rem; text-transform: uppercase;">02 / WILDERNESS</span>
          <h3 style="font-size: 1.8rem; font-weight: 800; margin: 8px 0 0;">Lago di Braies Reflection</h3>
        </div>
      </div>
      <div class="slide-item">
        <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80" alt="Forest valleys in mist">
        <div class="slide-content-overlay">
          <span style="color: #38bdf8; font-weight: 700; font-size: 0.8rem; text-transform: uppercase;">03 / ENVIRONMENT</span>
          <h3 style="font-size: 1.8rem; font-weight: 800; margin: 8px 0 0;">Misty Mountain Ridges</h3>
        </div>
      </div>
    </div>
  </div>
  
  <div class="slider-dots">
    <span class="slider-dot active" data-index="0"></span>
    <span class="slider-dot" data-index="1"></span>
    <span class="slider-dot" data-index="2"></span>
  </div>

  <script>
    (function() {
      const section = document.currentScript ? document.currentScript.parentElement : document.body;
      const track = section.querySelector('.slider-track');
      const prevBtn = section.querySelector('.slide-prev');
      const nextBtn = section.querySelector('.slide-next');
      const dots = section.querySelectorAll('.slider-dot');
      const slides = section.querySelectorAll('.slide-item');
      
      let index = 0;
      const total = slides.length;
      
      function updateSlider() {
        track.style.transform = 'translateX(-' + (index * 100) + '%)';
        dots.forEach(d => d.classList.remove('active'));
        dots[index].classList.add('active');
      }
      
      if (prevBtn && nextBtn && track) {
        // Clone and replace to prevent duplicate event listener stacking
        const newPrev = prevBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(newPrev, prevBtn);
        newPrev.addEventListener('click', () => {
          index = (index - 1 + total) % total;
          updateSlider();
        });
        
        const newNext = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newNext, nextBtn);
        newNext.addEventListener('click', () => {
          index = (index + 1) % total;
          updateSlider();
        });
        
        dots.forEach(dot => {
          const newDot = dot.cloneNode(true);
          dot.parentNode.replaceChild(newDot, dot);
          newDot.addEventListener('click', () => {
            index = parseInt(newDot.getAttribute('data-index'), 10);
            updateSlider();
          });
        });
      }
    })();
  </script>
</section>`
  }
];
