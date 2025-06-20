export const plumberTemplate = {
  id: "plumber-template",
  name: "Modern Plumber Portfolio",
  data: {
    pages: [
      {
        component: `
          <div class="site-wrapper">
            <!-- Sidebar -->
            <aside class="sidebar">
              <div class="sidebar-header">
                <div class="logo">
                  <span class="logo-icon">🔧</span>
                  <span class="logo-text">ProPlumb</span>
                </div>
                <button class="close-sidebar">×</button>
              </div>
              
              <nav class="sidebar-nav">
                <a href="#home" class="nav-item active">
                  <span class="nav-icon">🏠</span>
                  <span>Home</span>
                </a>
                <a href="#services" class="nav-item">
                  <span class="nav-icon">🛠️</span>
                  <span>Services</span>
                </a>
                <a href="#projects" class="nav-item">
                  <span class="nav-icon">📁</span>
                  <span>Projects</span>
                </a>
                <a href="#reviews" class="nav-item">
                  <span class="nav-icon">⭐</span>
                  <span>Reviews</span>
                </a>
                <a href="#contact" class="nav-item">
                  <span class="nav-icon">📞</span>
                  <span>Contact</span>
                </a>
              </nav>
              
              <div class="sidebar-footer">
                <div class="emergency-contact">
                  <h3>24/7 Emergency</h3>
                  <p class="phone">📞 (555) 123-4567</p>
                </div>
                <button class="emergency-btn">Request Emergency Service</button>
              </div>
            </aside>

            <!-- Main Content -->
            <main class="main-content">
              <!-- Mobile Header -->
              <header class="mobile-header">
                <button class="menu-toggle">☰</button>
                <div class="logo">ProPlumb</div>
                <button class="emergency-mobile">🚨</button>
              </header>

              <!-- Hero Section -->
              <section id="home" class="hero-section">
                <div class="hero-content">
                  <h1>Professional Plumbing Solutions</h1>
                  <p>Expert plumbing services for residential and commercial properties</p>
                  <div class="hero-cta">
                    <button class="primary-btn">Schedule Service</button>
                    <button class="secondary-btn">View Services</button>
                  </div>
                  <div class="hero-stats">
                    <div class="stat-item">
                      <span class="stat-number">15+</span>
                      <span class="stat-label">Years Experience</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-number">5000+</span>
                      <span class="stat-label">Projects Completed</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-number">24/7</span>
                      <span class="stat-label">Emergency Service</span>
                    </div>
                  </div>
                </div>
                <div class="hero-image"></div>
              </section>

              <!-- Services Section -->
              <section id="services" class="services-section">
                <h2>Our Services</h2>
                <div class="services-grid">
                  <div class="service-card">
                    <div class="service-icon">🚰</div>
                    <h3>Leak Detection & Repair</h3>
                    <p>Advanced leak detection and efficient repair solutions</p>
                    <ul class="service-features">
                      <li>Non-invasive detection</li>
                      <li>Same-day repairs</li>
                      <li>Warranty included</li>
                    </ul>
                    <button class="service-btn">Learn More</button>
                  </div>
                  <div class="service-card">
                    <div class="service-icon">🛁</div>
                    <h3>Bathroom Remodeling</h3>
                    <p>Complete bathroom renovation and installation</p>
                    <ul class="service-features">
                      <li>Custom designs</li>
                      <li>Quality fixtures</li>
                      <li>Professional installation</li>
                    </ul>
                    <button class="service-btn">Learn More</button>
                  </div>
                  <div class="service-card">
                    <div class="service-icon">🚿</div>
                    <h3>Water Heater Services</h3>
                    <p>Installation, repair, and maintenance</p>
                    <ul class="service-features">
                      <li>24/7 emergency service</li>
                      <li>All brands serviced</li>
                      <li>Energy-efficient options</li>
                    </ul>
                    <button class="service-btn">Learn More</button>
                  </div>
                </div>
              </section>

              <!-- Projects Section -->
              <section id="projects" class="projects-section">
                <h2>Recent Projects</h2>
                <div class="project-grid">
                  <div class="project-card">
                    <img src="https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800" alt="Bathroom Renovation" />
                    <div class="project-info">
                      <h3>Luxury Bathroom Renovation</h3>
                      <p>Complete remodel with custom fixtures</p>
                      <span class="project-tag">Residential</span>
                    </div>
                  </div>
                  <div class="project-card">
                    <img src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=800" alt="Commercial Plumbing" />
                    <div class="project-info">
                      <h3>Commercial Plumbing System</h3>
                      <p>Office building infrastructure upgrade</p>
                      <span class="project-tag">Commercial</span>
                    </div>
                  </div>
                  <div class="project-card">
                    <img src="https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?auto=format&fit=crop&q=80&w=800" alt="Emergency Repair" />
                    <div class="project-info">
                      <h3>Emergency Leak Repair</h3>
                      <p>24-hour response and resolution</p>
                      <span class="project-tag">Emergency</span>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Reviews Section -->
              <section id="reviews" class="reviews-section">
                <h2>Client Reviews</h2>
                <div class="reviews-grid">
                  <div class="review-card">
                    <div class="review-header">
                      <div class="reviewer-info">
                        <div class="reviewer-avatar">MB</div>
                        <div class="reviewer-details">
                          <h4>Michael Brown</h4>
                          <div class="rating">⭐⭐⭐⭐⭐</div>
                        </div>
                      </div>
                      <span class="review-date">2 weeks ago</span>
                    </div>
                    <p class="review-text">"Exceptional service! Fixed our emergency leak quickly and professionally. Highly recommend their 24/7 service."</p>
                  </div>
                  <div class="review-card">
                    <div class="review-header">
                      <div class="reviewer-info">
                        <div class="reviewer-avatar">SJ</div>
                        <div class="reviewer-details">
                          <h4>Sarah Johnson</h4>
                          <div class="rating">⭐⭐⭐⭐⭐</div>
                        </div>
                      </div>
                      <span class="review-date">1 month ago</span>
                    </div>
                    <p class="review-text">"Complete bathroom renovation exceeded our expectations. Great attention to detail and excellent communication throughout."</p>
                  </div>
                </div>
              </section>

              <!-- Contact Section -->
              <section id="contact" class="contact-section">
                <h2>Get in Touch</h2>
                <div class="contact-container">
                  <div class="contact-info">
                    <div class="info-card">
                      <h3>Contact Information</h3>
                      <div class="info-item">
                        <span class="info-icon">📍</span>
                        <p>123 Plumber Street, Watertown, ST 12345</p>
                      </div>
                      <div class="info-item">
                        <span class="info-icon">📞</span>
                        <p>(555) 123-4567</p>
                      </div>
                      <div class="info-item">
                        <span class="info-icon">✉️</span>
                        <p>info@proplumb.com</p>
                      </div>
                      <div class="info-item">
                        <span class="info-icon">⏰</span>
                        <p>Mon-Fri: 8am-6pm<br>24/7 Emergency Service</p>
                      </div>
                    </div>
                  </div>
                  <form class="contact-form">
                    <div class="form-group">
                      <input type="text" placeholder="Your Name" required />
                    </div>
                    <div class="form-group">
                      <input type="email" placeholder="Your Email" required />
                    </div>
                    <div class="form-group">
                      <select required>
                        <option value="">Select Service</option>
                        <option value="leak">Leak Repair</option>
                        <option value="installation">Installation</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="emergency">Emergency Service</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <textarea placeholder="Describe your plumbing needs..." required></textarea>
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
              --primary: #2563eb;
              --primary-dark: #1d4ed8;
              --secondary: #64748b;
              --accent: #f97316;
              --background: #f8fafc;
              --sidebar-width: 280px;
              --header-height: 70px;
              --text-primary: #1e293b;
              --text-secondary: #64748b;
              --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
              --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
              --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
              --transition: all 0.3s ease;
            }

            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            body {
              font-family: 'Inter', sans-serif;
              background: var(--background);
              color: var(--text-primary);
              line-height: 1.6;
            }

            /* Sidebar Styles */
            .sidebar {
              position: fixed;
              left: 0;
              top: 0;
              width: var(--sidebar-width);
              height: 100vh;
              background: white;
              border-right: 1px solid #e2e8f0;
              display: flex;
              flex-direction: column;
              z-index: 1000;
            }

            .sidebar-header {
              padding: 1.5rem;
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-bottom: 1px solid #e2e8f0;
            }

            .logo {
              display: flex;
              align-items: center;
              gap: 0.75rem;
            }

            .logo-icon {
              font-size: 1.5rem;
            }

            .logo-text {
              font-size: 1.25rem;
              font-weight: 700;
              color: var(--primary);
            }

            .close-sidebar {
              display: none;
              background: none;
              border: none;
              font-size: 1.5rem;
              cursor: pointer;
              color: var(--secondary);
            }

            .sidebar-nav {
              flex: 1;
              padding: 1.5rem;
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
            }

            .nav-item {
              display: flex;
              align-items: center;
              gap: 1rem;
              padding: 1rem;
              text-decoration: none;
              color: var(--text-secondary);
              border-radius: 0.5rem;
              transition: var(--transition);
            }

            .nav-item:hover {
              background: #f1f5f9;
              color: var(--primary);
            }

            .nav-item.active {
              background: #eff6ff;
              color: var(--primary);
              font-weight: 600;
            }

            .nav-icon {
              font-size: 1.25rem;
            }

            .sidebar-footer {
              padding: 1.5rem;
              border-top: 1px solid #e2e8f0;
            }

            .emergency-contact {
              margin-bottom: 1rem;
            }

            .emergency-contact h3 {
              color: var(--accent);
              font-size: 1rem;
              margin-bottom: 0.5rem;
            }

            .phone {
              font-size: 1.125rem;
              font-weight: 600;
            }

            .emergency-btn {
              width: 100%;
              padding: 0.75rem;
              background: var(--accent);
              color: white;
              border: none;
              border-radius: 0.5rem;
              font-weight: 600;
              cursor: pointer;
              transition: var(--transition);
            }

            .emergency-btn:hover {
              background: #ea580c;
            }

            /* Main Content Styles */
            .main-content {
              margin-left: var(--sidebar-width);
              padding: 2rem;
              min-height: 100vh;
            }

            /* Mobile Header */
            .mobile-header {
              display: none;
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              padding: 1rem;
              background: white;
              box-shadow: var(--shadow-sm);
              z-index: 900;
            }

            .menu-toggle,
            .emergency-mobile {
              background: none;
              border: none;
              font-size: 1.5rem;
              cursor: pointer;
            }

            /* Hero Section */
            .hero-section {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 4rem;
              padding: 4rem 0;
              align-items: center;
            }

            .hero-content h1 {
              font-size: 3.5rem;
              line-height: 1.2;
              margin-bottom: 1.5rem;
              color: var(--text-primary);
            }

            .hero-content p {
              font-size: 1.25rem;
              color: var(--text-secondary);
              margin-bottom: 2rem;
            }

            .hero-cta {
              display: flex;
              gap: 1rem;
              margin-bottom: 3rem;
            }

            .primary-btn,
            .secondary-btn {
              padding: 0.75rem 1.5rem;
              border-radius: 0.5rem;
              font-weight: 600;
              cursor: pointer;
              transition: var(--transition);
            }

            .primary-btn {
              background: var(--primary);
              color: white;
              border: none;
            }

            .primary-btn:hover {
              background: var(--primary-dark);
            }

            .secondary-btn {
              background: white;
              color: var(--primary);
              border: 2px solid var(--primary);
            }

            .secondary-btn:hover {
              background: #eff6ff;
            }

            .hero-stats {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 2rem;
            }

            .stat-item {
              text-align: center;
            }

            .stat-number {
              display: block;
              font-size: 2rem;
              font-weight: 700;
              color: var(--primary);
              margin-bottom: 0.5rem;
            }

            .stat-label {
              color: var(--text-secondary);
            }

            .hero-image {
              background: url('https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=1000') center/cover;
              height: 500px;
              border-radius: 1rem;
              box-shadow: var(--shadow-lg);
            }

            /* Services Section */
            .services-section {
              padding: 4rem 0;
            }

            .services-section h2 {
              font-size: 2.5rem;
              margin-bottom: 3rem;
              text-align: center;
            }

            .services-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 2rem;
            }

            .service-card {
              background: white;
              padding: 2rem;
              border-radius: 1rem;
              box-shadow: var(--shadow);
              transition: var(--transition);
            }

            .service-card:hover {
              transform: translateY(-5px);
            }

            .service-icon {
              font-size: 2.5rem;
              margin-bottom: 1.5rem;
            }

            .service-card h3 {
              font-size: 1.5rem;
              margin-bottom: 1rem;
            }

            .service-features {
              list-style: none;
              margin: 1.5rem 0;
            }

            .service-features li {
              margin-bottom: 0.5rem;
              padding-left: 1.5rem;
              position: relative;
            }

            .service-features li::before {
              content: '✓';
              position: absolute;
              left: 0;
              color: var(--primary);
            }

            .service-btn {
              width: 100%;
              padding: 0.75rem;
              background: var(--primary);
              color: white;
              border: none;
              border-radius: 0.5rem;
              font-weight: 600;
              cursor: pointer;
              transition: var(--transition);
            }

            .service-btn:hover {
              background: var(--primary-dark);
            }

            /* Projects Section */
            .projects-section {
              padding: 4rem 0;
            }

            .projects-section h2 {
              font-size: 2.5rem;
              margin-bottom: 3rem;
              text-align: center;
            }

            .project-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 2rem;
            }

            .project-card {
              position: relative;
              border-radius: 1rem;
              overflow: hidden;
              box-shadow: var(--shadow);
            }

            .project-card img {
              width: 100%;
              height: 250px;
              object-fit: cover;
              transition: var(--transition);
            }

            .project-card:hover img {
              transform: scale(1.1);
            }

            .project-info {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              padding: 1.5rem;
              background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
              color: white;
            }

            .project-tag {
              display: inline-block;
              padding: 0.25rem 0.75rem;
              background: var(--primary);
              border-radius: 1rem;
              font-size: 0.875rem;
              margin-top: 0.5rem;
            }

            /* Reviews Section */
            .reviews-section {
              padding: 4rem 0;
            }

            .reviews-section h2 {
              font-size: 2.5rem;
              margin-bottom: 3rem;
              text-align: center;
            }

            .reviews-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 2rem;
            }

            .review-card {
              background: white;
              padding: 2rem;
              border-radius: 1rem;
              box-shadow: var(--shadow);
            }

            .review-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 1rem;
            }

            .reviewer-info {
              display: flex;
              align-items: center;
              gap: 1rem;
            }

            .reviewer-avatar {
              width: 3rem;
              height: 3rem;
              background: var(--primary);
              color: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 600;
            }

            .review-date {
              color: var(--text-secondary);
              font-size: 0.875rem;
            }

            /* Contact Section */
            .contact-section {
              padding: 4rem 0;
            }

            .contact-section h2 {
              font-size: 2.5rem;
              margin-bottom: 3rem;
              text-align: center;
            }

            .contact-container {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 4rem;
            }

            .info-card {
              background: white;
              padding: 2rem;
              border-radius: 1rem;
              box-shadow: var(--shadow);
            }

            .info-card h3 {
              margin-bottom: 2rem;
              color: var(--primary);
            }

            .info-item {
              display: flex;
              gap: 1rem;
              margin-bottom: 1.5rem;
            }

            .info-icon {
              font-size: 1.5rem;
            }

            .contact-form {
              background: white;
              padding: 2rem;
              border-radius: 1rem;
              box-shadow: var(--shadow);
            }

            .form-group {
              margin-bottom: 1.5rem;
            }

            .form-group input,
            .form-group select,
            .form-group textarea {
              width: 100%;
              padding: 0.75rem;
              border: 1px solid #e2e8f0;
              border-radius: 0.5rem;
              font-family: inherit;
            }

            .form-group textarea {
              height: 150px;
              resize: vertical;
            }

            .submit-btn {
              width: 100%;
              padding: 0.75rem;
              background: var(--primary);
              color: white;
              border: none;
              border-radius: 0.5rem;
              font-weight: 600;
              cursor: pointer;
              transition: var(--transition);
            }

            .submit-btn:hover {
              background: var(--primary-dark);
            }

            /* Responsive Design */
            @media (max-width: 1024px) {
              .hero-section {
                grid-template-columns: 1fr;
                text-align: center;
              }

              .hero-cta {
                justify-content: center;
              }

              .hero-stats {
                max-width: 600px;
                margin: 0 auto;
              }
            }

            @media (max-width: 768px) {
              .sidebar {
                transform: translateX(-100%);
                transition: var(--transition);
              }

              .sidebar.active {
                transform: translateX(0);
              }

              .close-sidebar {
                display: block;
              }

              .main-content {
                margin-left: 0;
                padding-top: calc(var(--header-height) + 2rem);
              }

              .mobile-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
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
