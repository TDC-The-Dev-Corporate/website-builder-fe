export const landscaperTemplate = {
  id: "landscaper-template",
  name: "Modern Landscaper Portfolio",
  data: {
    pages: [
      {
        component: `
          <div class="site-wrapper">
            <!-- Drawer Navigation -->
            <nav class="drawer-nav">
              <div class="drawer-header">
                <span class="logo-icon">🌿</span>
                <h1>GreenScape</h1>
                <button class="close-drawer">×</button>
              </div>
              <div class="nav-links">
                <a href="#home" class="nav-link active">
                  <span class="link-icon">🏠</span>
                  Home
                </a>
                <a href="#services" class="nav-link">
                  <span class="link-icon">🌳</span>
                  Services
                </a>
                <a href="#gallery" class="nav-link">
                  <span class="link-icon">🖼️</span>
                  Gallery
                </a>
                <a href="#process" class="nav-link">
                  <span class="link-icon">📋</span>
                  Process
                </a>
                <a href="#contact" class="nav-link">
                  <span class="link-icon">📞</span>
                  Contact
                </a>
              </div>
              <div class="drawer-footer">
                <button class="quote-btn">Get Free Quote</button>
              </div>
            </nav>

            <!-- Main Content -->
            <main class="main-content">
              <!-- Mobile Header -->
              <header class="mobile-header">
                <button class="menu-toggle">☰</button>
                <span class="mobile-logo">GreenScape</span>
                <button class="mobile-quote">💬</button>
              </header>

              <!-- Hero Section -->
              <section id="home" class="hero">
                <div class="hero-content">
                  <h1 class="reveal-text">Transform Your Outdoor Space</h1>
                  <p class="fade-up">Professional landscaping and garden design services</p>
                  <div class="hero-buttons">
                    <button class="primary-btn scale-in">View Our Work</button>
                    <button class="secondary-btn scale-in">Free Consultation</button>
                  </div>
                  <div class="achievement-cards">
                    <div class="achievement-card fade-up">
                      <span class="number">500+</span>
                      <span class="label">Projects Completed</span>
                    </div>
                    <div class="achievement-card fade-up">
                      <span class="number">15+</span>
                      <span class="label">Years Experience</span>
                    </div>
                    <div class="achievement-card fade-up">
                      <span class="number">100%</span>
                      <span class="label">Satisfaction</span>
                    </div>
                  </div>
                </div>
                <div class="hero-image parallax"></div>
              </section>

              <!-- Services Section -->
              <section id="services" class="services">
                <h2>Our Services</h2>
                <div class="service-grid">
                  <div class="service-card zoom-in">
                    <div class="card-image" style="background-image: url('https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=800')">
                      <div class="card-overlay"></div>
                    </div>
                    <div class="card-content">
                      <h3>Landscape Design</h3>
                      <p>Custom outdoor living spaces tailored to your lifestyle</p>
                      <ul class="feature-list">
                        <li>3D Design Visualization</li>
                        <li>Plant Selection</li>
                        <li>Hardscape Planning</li>
                      </ul>
                      <button class="learn-more">Learn More →</button>
                    </div>
                  </div>
                  <div class="service-card zoom-in">
                    <div class="card-image" style="background-image: url('https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=800')">
                      <div class="card-overlay"></div>
                    </div>
                    <div class="card-content">
                      <h3>Garden Maintenance</h3>
                      <p>Regular care to keep your garden beautiful year-round</p>
                      <ul class="feature-list">
                        <li>Seasonal Pruning</li>
                        <li>Lawn Care</li>
                        <li>Pest Control</li>
                      </ul>
                      <button class="learn-more">Learn More →</button>
                    </div>
                  </div>
                  <div class="service-card zoom-in">
                    <div class="card-image" style="background-image: url('https://images.unsplash.com/photo-1584479898061-15742e14f50d?auto=format&fit=crop&q=80&w=800')">
                      <div class="card-overlay"></div>
                    </div>
                    <div class="card-content">
                      <h3>Irrigation Systems</h3>
                      <p>Smart watering solutions for efficient garden maintenance</p>
                      <ul class="feature-list">
                        <li>Smart Controllers</li>
                        <li>Drip Systems</li>
                        <li>Water Conservation</li>
                      </ul>
                      <button class="learn-more">Learn More →</button>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Gallery Section -->
              <section id="gallery" class="gallery">
                <h2>Our Work</h2>
                <div class="gallery-grid">
                  <div class="gallery-item">
                    <img src="https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=800" alt="Modern Garden" />
                    <div class="item-overlay">
                      <h3>Modern Garden</h3>
                      <p>Contemporary design with sustainable features</p>
                    </div>
                  </div>
                  <div class="gallery-item">
                    <img src="https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=800" alt="Zen Garden" />
                    <div class="item-overlay">
                      <h3>Zen Garden</h3>
                      <p>Peaceful retreat with Japanese influences</p>
                    </div>
                  </div>
                  <div class="gallery-item">
                    <img src="https://images.unsplash.com/photo-1584479898061-15742e14f50d?auto=format&fit=crop&q=80&w=800" alt="Family Garden" />
                    <div class="item-overlay">
                      <h3>Family Garden</h3>
                      <p>Kid-friendly space with entertainment areas</p>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Process Section -->
              <section id="process" class="process">
                <h2>Our Process</h2>
                <div class="timeline">
                  <div class="timeline-item fade-in">
                    <div class="timeline-number">1</div>
                    <div class="timeline-content">
                      <h3>Initial Consultation</h3>
                      <p>We discuss your vision, budget, and timeline</p>
                    </div>
                  </div>
                  <div class="timeline-item fade-in">
                    <div class="timeline-number">2</div>
                    <div class="timeline-content">
                      <h3>Design Phase</h3>
                      <p>Creating detailed plans and 3D visualizations</p>
                    </div>
                  </div>
                  <div class="timeline-item fade-in">
                    <div class="timeline-number">3</div>
                    <div class="timeline-content">
                      <h3>Implementation</h3>
                      <p>Expert execution of the approved design</p>
                    </div>
                  </div>
                  <div class="timeline-item fade-in">
                    <div class="timeline-number">4</div>
                    <div class="timeline-content">
                      <h3>Maintenance</h3>
                      <p>Ongoing care to maintain your garden's beauty</p>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Contact Section -->
              <section id="contact" class="contact">
                <div class="contact-container">
                  <div class="contact-info">
                    <h2>Get in Touch</h2>
                    <p>Transform your outdoor space into something extraordinary</p>
                    <div class="contact-details">
                      <div class="detail-item">
                        <span class="detail-icon">📞</span>
                        <div>
                          <h3>Phone</h3>
                          <p>(555) 123-4567</p>
                        </div>
                      </div>
                      <div class="detail-item">
                        <span class="detail-icon">📧</span>
                        <div>
                          <h3>Email</h3>
                          <p>info@greenscape.com</p>
                        </div>
                      </div>
                      <div class="detail-item">
                        <span class="detail-icon">📍</span>
                        <div>
                          <h3>Address</h3>
                          <p>123 Garden Lane, Greenville</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form class="contact-form scale-in">
                    <div class="form-group">
                      <input type="text" placeholder="Your Name" required />
                    </div>
                    <div class="form-group">
                      <input type="email" placeholder="Your Email" required />
                    </div>
                    <div class="form-group">
                      <select required>
                        <option value="">Select Service</option>
                        <option value="design">Landscape Design</option>
                        <option value="maintenance">Garden Maintenance</option>
                        <option value="irrigation">Irrigation Systems</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <textarea placeholder="Tell us about your project" required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Send Message</button>
                  </form>
                </div>
              </section>
            </main>
          </div>

          <style>
            /* Base Styles */
            :root {
              --primary: #4CAF50;
              --primary-dark: #388E3C;
              --secondary: #2E7D32;
              --accent: #8BC34A;
              --text: #333333;
              --text-light: #666666;
              --background: #F5F5F5;
              --white: #FFFFFF;
              --drawer-width: 280px;
              --header-height: 70px;
              --shadow: 0 4px 6px rgba(0,0,0,0.1);
              --transition: all 0.3s ease;
            }

            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            body {
              font-family: 'Inter', sans-serif;
              color: var(--text);
              background: var(--background);
              line-height: 1.6;
            }

            /* Drawer Navigation */
            .drawer-nav {
              position: fixed;
              left: 0;
              top: 0;
              width: var(--drawer-width);
              height: 100vh;
              background: var(--white);
              box-shadow: var(--shadow);
              display: flex;
              flex-direction: column;
              z-index: 1000;
              transform: translateX(-100%);
              transition: var(--transition);
            }

            .drawer-nav.active {
              transform: translateX(0);
            }

            .drawer-header {
              padding: 2rem;
              display: flex;
              align-items: center;
              gap: 1rem;
              border-bottom: 1px solid #eee;
            }

            .logo-icon {
              font-size: 2rem;
            }

            .drawer-header h1 {
              font-size: 1.5rem;
              color: var(--primary);
            }

            .close-drawer {
              margin-left: auto;
              background: none;
              border: none;
              font-size: 1.5rem;
              cursor: pointer;
              color: var(--text-light);
            }

            .nav-links {
              padding: 2rem;
              flex: 1;
            }

            .nav-link {
              display: flex;
              align-items: center;
              gap: 1rem;
              padding: 1rem;
              text-decoration: none;
              color: var(--text);
              border-radius: 8px;
              transition: var(--transition);
              margin-bottom: 0.5rem;
            }

            .nav-link:hover,
            .nav-link.active {
              background: var(--primary);
              color: var(--white);
            }

            .link-icon {
              font-size: 1.25rem;
            }

            .drawer-footer {
              padding: 2rem;
              border-top: 1px solid #eee;
            }

            .quote-btn {
              width: 100%;
              padding: 1rem;
              background: var(--accent);
              color: var(--white);
              border: none;
              border-radius: 8px;
              font-weight: 600;
              cursor: pointer;
              transition: var(--transition);
            }

            .quote-btn:hover {
              background: var(--primary);
            }

            /* Mobile Header */
            .mobile-header {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              padding: 1rem;
              background: var(--white);
              box-shadow: var(--shadow);
              display: flex;
              justify-content: space-between;
              align-items: center;
              z-index: 900;
            }

            .menu-toggle,
            .mobile-quote {
              background: none;
              border: none;
              font-size: 1.5rem;
              cursor: pointer;
            }

            .mobile-logo {
              font-size: 1.25rem;
              font-weight: 600;
              color: var(--primary);
            }

            /* Main Content */
            .main-content {
              margin-left: var(--drawer-width);
              padding-top: var(--header-height);
            }

            /* Hero Section */
            .hero {
              min-height: calc(100vh - var(--header-height));
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 4rem;
              padding: 4rem 5%;
              position: relative;
            }

            .hero-content {
              display: flex;
              flex-direction: column;
              justify-content: center;
            }

            .reveal-text {
              font-size: 3.5rem;
              line-height: 1.2;
              margin-bottom: 1.5rem;
              opacity: 0;
              transform: translateY(20px);
              animation: revealText 1s forwards;
            }

            @keyframes revealText {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .fade-up {
              opacity: 0;
              transform: translateY(20px);
              animation: fadeUp 0.6s forwards;
            }

            @keyframes fadeUp {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .hero-buttons {
              display: flex;
              gap: 1rem;
              margin: 2rem 0;
            }

            .primary-btn,
            .secondary-btn {
              padding: 1rem 2rem;
              border-radius: 8px;
              font-weight: 600;
              cursor: pointer;
              transition: var(--transition);
            }

            .primary-btn {
              background: var(--primary);
              color: var(--white);
              border: none;
            }

            .secondary-btn {
              background: transparent;
              border: 2px solid var(--primary);
              color: var(--primary);
            }

            .scale-in {
              opacity: 0;
              transform: scale(0.9);
              animation: scaleIn 0.6s forwards;
            }

            @keyframes scaleIn {
              to {
                opacity: 1;
                transform: scale(1);
              }
            }

            .achievement-cards {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 1.5rem;
              margin-top: 2rem;
            }

            .achievement-card {
              text-align: center;
              padding: 1.5rem;
              background: var(--white);
              border-radius: 8px;
              box-shadow: var(--shadow);
            }

            .number {
              display: block;
              font-size: 2rem;
              font-weight: 700;
              color: var(--primary);
              margin-bottom: 0.5rem;
            }

            .hero-image {
              background: url('https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=1000') center/cover;
              border-radius: 20px;
              box-shadow: var(--shadow);
            }

            .parallax {
              transform: translateZ(0);
              transition: transform 0.3s ease-out;
            }

            /* Services Section */
            .services {
              padding: 6rem 5%;
              background: var(--white);
            }

            .services h2 {
              text-align: center;
              font-size: 2.5rem;
              margin-bottom: 3rem;
              color: var(--primary);
            }

            .service-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 2rem;
              max-width: 1200px;
              margin: 0 auto;
            }

            .service-card {
              background: var(--white);
              border-radius: 15px;
              overflow: hidden;
              box-shadow: var(--shadow);
              transition: var(--transition);
            }

            .zoom-in {
              opacity: 0;
              transform: scale(0.95);
              animation: zoomIn 0.6s forwards;
            }

            @keyframes zoomIn {
              to {
                opacity: 1;
                transform: scale(1);
              }
            }

            .card-image {
              height: 200px;
              background-size: cover;
              background-position: center;
              position: relative;
            }

            .card-overlay {
              position: absolute;
              inset: 0;
              background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.7));
            }

            .card-content {
              padding: 2rem;
            }

            .feature-list {
              list-style: none;
              margin: 1.5rem 0;
            }

            .feature-list li {
              margin-bottom: 0.5rem;
              padding-left: 1.5rem;
              position: relative;
            }

            .feature-list li::before {
              content: '✓';
              position: absolute;
              left: 0;
              color: var(--primary);
            }

            .learn-more {
              background: none;
              border: none;
              color: var(--primary);
              font-weight: 600;
              cursor: pointer;
              transition: var(--transition);
            }

            .learn-more:hover {
              transform: translateX(5px);
            }

            /* Gallery Section */
            .gallery {
              padding: 6rem 5%;
              background: var(--background);
            }

            .gallery h2 {
              text-align: center;
              font-size: 2.5rem;
              margin-bottom: 3rem;
              color: var(--primary);
            }

            .gallery-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 2rem;
              max-width: 1200px;
              margin: 0 auto;
            }

            .gallery-item {
              position: relative;
              border-radius: 15px;
              overflow: hidden;
              aspect-ratio: 4/3;
            }

            .gallery-item img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: var(--transition);
            }

            .item-overlay {
              position: absolute;
              bottom: -100%;
              left: 0;
              width: 100%;
              padding: 2rem;
              background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
              color: var(--white);
              transition: var(--transition);
            }

            .gallery-item:hover .item-overlay {
              bottom: 0;
            }

            .gallery-item:hover img {
              transform: scale(1.1);
            }

            /* Process Section */
            .process {
              padding: 6rem 5%;
              background: var(--white);
            }

            .process h2 {
              text-align: center;
              font-size: 2.5rem;
              margin-bottom: 3rem;
              color: var(--primary);
            }

            .timeline {
              max-width: 800px;
              margin: 0 auto;
              position: relative;
            }

            .timeline::before {
              content: '';
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              width: 2px;
              height: 100%;
              background: var(--primary);
            }

            .timeline-item {
              display: flex;
              align-items: center;
              margin-bottom: 2rem;
              opacity: 0;
            }

            .fade-in {
              animation: fadeIn 0.6s forwards;
            }

            @keyframes fadeIn {
              to {
                opacity: 1;
              }
            }

            .timeline-number {
              width: 40px;
              height: 40px;
              background: var(--primary);
              color: var(--white);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 600;
              z-index: 1;
            }

            .timeline-content {
              flex: 1;
              background: var(--white);
              padding: 1.5rem;
              border-radius: 8px;
              box-shadow: var(--shadow);
              margin-left: 1rem;
            }

            /* Contact Section */
            .contact {
              padding: 6rem 5%;
              background: var(--background);
            }

            .contact-container {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 4rem;
              max-width: 1200px;
              margin: 0 auto;
            }

            .contact-info h2 {
              font-size: 2.5rem;
              margin-bottom: 1rem;
              color: var(--primary);
            }

            .contact-details {
              margin-top: 2rem;
            }

            .detail-item {
              display: flex;
              align-items: center;
              gap: 1rem;
              margin-bottom: 1.5rem;
            }

            .detail-icon {
              font-size: 1.5rem;
            }

            .contact-form {
              background: var(--white);
              padding: 2rem;
              border-radius: 15px;
              box-shadow: var(--shadow);
            }

            .form-group {
              margin-bottom: 1.5rem;
            }

            .form-group input,
            .form-group select,
            .form-group textarea {
              width: 100%;
              padding: 1rem;
              border: 1px solid #ddd;
              border-radius: 8px;
              font-family: inherit;
            }

            .form-group textarea {
              height: 150px;
              resize: vertical;
            }

            .submit-btn {
              width: 100%;
              padding: 1rem;
              background: var(--primary);
              color: var(--white);
              border: none;
              border-radius: 8px;
              font-weight: 600;
              cursor: pointer;
              transition: var(--transition);
            }

            .submit-btn:hover {
              background: var(--primary-dark);
            }

            /* Responsive Design */
            @media (max-width: 768px) {
              .drawer-nav {
                transform: translateX(-100%);
              }

              .main-content {
                margin-left: 0;
              }

              .hero {
                grid-template-columns: 1fr;
                text-align: center;
                padding-top: calc(var(--header-height) + 2rem);
              }

              .hero-buttons {
                justify-content: center;
              }

              .achievement-cards {
                grid-template-columns: 1fr;
              }

              .timeline::before {
                left: 20px;
              }

              .timeline-item {
                flex-direction: column;
                align-items: flex-start;
                margin-left: 20px;
              }

              .contact-container {
                grid-template-columns: 1fr;
              }
            }
          </style>
          `,
      },
    ],
  },
};
