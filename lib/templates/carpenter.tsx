export const carpenterTemplate = {
  id: "carpenter-template",
  name: "Carpenter Portfolio",
  data: {
    pages: [
      {
        component: `
          <div class="site-wrapper">
            <header class="nav-header">
              <nav class="navbar">
                <div class="logo">Craftsman Woodworks</div>
                <div class="nav-links">
                  <a href="#home">Home</a>
                  <a href="#services">Services</a>
                  <a href="#portfolio">Portfolio</a>
                  <a href="#testimonials">Testimonials</a>
                  <a href="#contact">Contact</a>
                </div>
                <button class="mobile-menu-btn">☰</button>
              </nav>
            </header>
            
            <section id="home" class="hero">
              <div class="hero-content">
                <h1 class="slide-in">Master Carpentry & Woodworking</h1>
                <p class="fade-in">Crafting excellence in every piece, bringing your vision to life</p>
                <div class="cta-container">
                  <button class="cta-button primary">View Our Work</button>
                  <button class="cta-button secondary">Get Quote</button>
                </div>
              </div>
              <div class="hero-overlay"></div>
            </section>

            <section id="services" class="services">
              <h2>Our Services</h2>
              <div class="service-grid">
                <div class="service-card">
                  <div class="service-icon">🪑</div>
                  <h3>Custom Furniture</h3>
                  <p>Bespoke pieces tailored to your needs and style preferences</p>
                  <a href="#contact" class="service-link">Learn More →</a>
                </div>
                <div class="service-card">
                  <div class="service-icon">🏠</div>
                  <h3>Home Renovation</h3>
                  <p>Complete woodwork solutions for your home improvement projects</p>
                  <a href="#contact" class="service-link">Learn More →</a>
                </div>
                <div class="service-card">
                  <div class="service-icon">🔨</div>
                  <h3>Restoration</h3>
                  <p>Expert restoration of antique and vintage wooden furniture</p>
                  <a href="#contact" class="service-link">Learn More →</a>
                </div>
              </div>
            </section>

            <section id="portfolio" class="portfolio">
              <h2>Recent Projects</h2>
              <div class="portfolio-grid">
                <div class="portfolio-item">
                  <img src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&q=80&w=500" alt="Custom Kitchen" />
                  <div class="portfolio-overlay">
                    <h3>Custom Kitchen</h3>
                    <p>Modern farmhouse design</p>
                  </div>
                </div>
                <div class="portfolio-item">
                  <img src="https://images.unsplash.com/photo-1560185127-2d5d45dacf96?auto=format&fit=crop&q=80&w=500" alt="Dining Table" />
                  <div class="portfolio-overlay">
                    <h3>Dining Table</h3>
                    <p>Solid oak craftsmanship</p>
                  </div>
                </div>
                <div class="portfolio-item">
                  <img src="https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=500" alt="Built-in Shelving" />
                  <div class="portfolio-overlay">
                    <h3>Built-in Shelving</h3>
                    <p>Custom storage solutions</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="testimonials" class="testimonials">
              <h2>Client Testimonials</h2>
              <div class="testimonial-grid">
                <div class="testimonial-card">
                  <div class="quote">"</div>
                  <p>Exceptional craftsmanship and attention to detail. They transformed our kitchen into a masterpiece.</p>
                  <div class="client-info">
                    <strong>John Smith</strong>
                    <span>Kitchen Renovation</span>
                  </div>
                </div>
                <div class="testimonial-card">
                  <div class="quote">"</div>
                  <p>Professional, punctual, and perfect execution. Couldn't be happier with our custom dining table.</p>
                  <div class="client-info">
                    <strong>Sarah Johnson</strong>
                    <span>Custom Furniture</span>
                  </div>
                </div>
              </div>
            </section>

            <section id="contact" class="contact">
              <h2>Get In Touch</h2>
              <div class="contact-container">
                <div class="contact-info">
                  <h3>Contact Information</h3>
                  <p>📍 123 Woodcraft Lane</p>
                  <p>📞 (555) 123-4567</p>
                  <p>✉️ info@craftsmanwoodworks.com</p>
                </div>
                <form class="contact-form">
                  <input type="text" placeholder="Your Name" required />
                  <input type="email" placeholder="Your Email" required />
                  <textarea placeholder="Your Message" required></textarea>
                  <button type="submit" class="submit-btn">Send Message</button>
                </form>
              </div>
            </section>

            <footer class="footer">
              <div class="footer-content">
                <div class="footer-section">
                  <h3>Craftsman Woodworks</h3>
                  <p>Quality craftsmanship since 1995</p>
                </div>
                <div class="footer-section">
                  <h3>Quick Links</h3>
                  <a href="#home">Home</a>
                  <a href="#services">Services</a>
                  <a href="#portfolio">Portfolio</a>
                  <a href="#contact">Contact</a>
                </div>
                <div class="footer-section">
                  <h3>Working Hours</h3>
                  <p>Monday - Friday: 9am - 6pm</p>
                  <p>Saturday: 10am - 4pm</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
              <div class="footer-bottom">
                <p>&copy; 2024 Craftsman Woodworks. All rights reserved.</p>
              </div>
            </footer>
          </div>

          <style>
            /* Base Styles */
            :root {
              --primary-color: #8B4513;
              --secondary-color: #D2691E;
              --accent-color: #DEB887;
              --text-color: #2C1810;
              --background-light: #FDF5E6;
              --transition: all 0.3s ease;
            }

            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            html {
              scroll-behavior: smooth;
            }

            .site-wrapper {
              font-family: 'Raleway', sans-serif;
              color: var(--text-color);
              line-height: 1.6;
            }

            /* Navigation */
            .nav-header {
              position: fixed;
              width: 100%;
              top: 0;
              z-index: 1000;
              background: rgba(255, 255, 255, 0.95);
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }

            .navbar {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 1rem 5%;
              max-width: 1400px;
              margin: 0 auto;
            }

            .logo {
              font-size: 1.8rem;
              font-weight: bold;
              color: var(--primary-color);
              text-transform: uppercase;
              letter-spacing: 1px;
            }

            .nav-links a {
              margin-left: 2rem;
              color: var(--text-color);
              text-decoration: none;
              font-weight: 500;
              transition: var(--transition);
              position: relative;
            }

            .nav-links a::after {
              content: '';
              position: absolute;
              width: 0;
              height: 2px;
              bottom: -5px;
              left: 0;
              background-color: var(--primary-color);
              transition: var(--transition);
            }

            .nav-links a:hover::after {
              width: 100%;
            }

            .mobile-menu-btn {
              display: none;
              background: none;
              border: none;
              font-size: 1.5rem;
              cursor: pointer;
              color: var(--primary-color);
            }

            /* Hero Section */
            .hero {
              height: 100vh;
              background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
                          url('https://images.unsplash.com/photo-1622675363311-3e1904dc1885?auto=format&fit=crop&q=80&w=1920') center/cover;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              color: white;
              position: relative;
            }

            .hero-content {
              max-width: 800px;
              padding: 2rem;
              position: relative;
              z-index: 2;
            }

            .hero h1 {
              font-size: 4rem;
              margin-bottom: 1.5rem;
              opacity: 0;
              animation: slideIn 1s forwards;
            }

            .hero p {
              font-size: 1.5rem;
              margin-bottom: 2rem;
              opacity: 0;
              animation: fadeIn 1s 0.5s forwards;
            }

            .cta-container {
              display: flex;
              gap: 1rem;
              justify-content: center;
              opacity: 0;
              animation: fadeIn 1s 1s forwards;
            }

            .cta-button {
              padding: 1rem 2rem;
              font-size: 1.2rem;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              transition: var(--transition);
              font-weight: 600;
            }

            .cta-button.primary {
              background: var(--primary-color);
              color: white;
            }

            .cta-button.secondary {
              background: transparent;
              border: 2px solid white;
              color: white;
            }

            .cta-button:hover {
              transform: translateY(-3px);
              box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            }

            /* Services Section */
            .services {
              padding: 6rem 5%;
              background: var(--background-light);
            }

            .services h2 {
              text-align: center;
              font-size: 2.5rem;
              margin-bottom: 3rem;
              color: var(--primary-color);
              position: relative;
            }

            .services h2::after {
              content: '';
              display: block;
              width: 50px;
              height: 3px;
              background: var(--primary-color);
              margin: 1rem auto;
            }

            .service-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 2rem;
              max-width: 1400px;
              margin: 0 auto;
            }

            .service-card {
              background: white;
              padding: 2.5rem;
              border-radius: 15px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              transition: var(--transition);
              text-align: center;
              position: relative;
              overflow: hidden;
            }

            .service-card::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 5px;
              background: var(--primary-color);
              transform: scaleX(0);
              transition: var(--transition);
            }

            .service-card:hover {
              transform: translateY(-10px);
            }

            .service-card:hover::before {
              transform: scaleX(1);
            }

            .service-icon {
              font-size: 3rem;
              margin-bottom: 1.5rem;
            }

            .service-card h3 {
              color: var(--primary-color);
              margin-bottom: 1rem;
              font-size: 1.5rem;
            }

            .service-link {
              display: inline-block;
              margin-top: 1rem;
              color: var(--primary-color);
              text-decoration: none;
              font-weight: 600;
              transition: var(--transition);
            }

            .service-link:hover {
              color: var(--secondary-color);
              transform: translateX(5px);
            }

            /* Portfolio Section */
            .portfolio {
              padding: 6rem 5%;
              background: white;
            }

            .portfolio h2 {
              text-align: center;
              font-size: 2.5rem;
              margin-bottom: 3rem;
              color: var(--primary-color);
            }

            .portfolio-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 2rem;
              max-width: 1400px;
              margin: 0 auto;
            }

            .portfolio-item {
              position: relative;
              overflow: hidden;
              border-radius: 10px;
              height: 300px;
            }

            .portfolio-item img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: var(--transition);
            }

            .portfolio-overlay {
              position: absolute;
              bottom: -100%;
              left: 0;
              width: 100%;
              padding: 2rem;
              background: rgba(139, 69, 19, 0.9);
              color: white;
              transition: var(--transition);
            }

            .portfolio-item:hover .portfolio-overlay {
              bottom: 0;
            }

            .portfolio-item:hover img {
              transform: scale(1.1);
            }

            /* Testimonials Section */
            .testimonials {
              padding: 6rem 5%;
              background: var(--background-light);
            }

            .testimonials h2 {
              text-align: center;
              font-size: 2.5rem;
              margin-bottom: 3rem;
              color: var(--primary-color);
            }

            .testimonial-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 2rem;
              max-width: 1400px;
              margin: 0 auto;
            }

            .testimonial-card {
              background: white;
              padding: 2rem;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              position: relative;
            }

            .quote {
              font-size: 4rem;
              color: var(--primary-color);
              position: absolute;
              top: -20px;
              left: 20px;
              opacity: 0.2;
            }

            .client-info {
              margin-top: 1rem;
              padding-top: 1rem;
              border-top: 1px solid #eee;
            }

            .client-info strong {
              display: block;
              color: var(--primary-color);
            }

            /* Contact Section */
            .contact {
              padding: 6rem 5%;
              background: white;
            }

            .contact h2 {
              text-align: center;
              font-size: 2.5rem;
              margin-bottom: 3rem;
              color: var(--primary-color);
            }

            .contact-container {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 4rem;
              max-width: 1200px;
              margin: 0 auto;
            }

            .contact-info h3 {
              color: var(--primary-color);
              margin-bottom: 1.5rem;
            }

            .contact-info p {
              margin-bottom: 1rem;
            }

            .contact-form {
              display: grid;
              gap: 1rem;
            }

            .contact-form input,
            .contact-form textarea {
              padding: 1rem;
              border: 1px solid #ddd;
              border-radius: 5px;
              font-family: inherit;
            }

            .contact-form textarea {
              height: 150px;
              resize: vertical;
            }

            .submit-btn {
              background: var(--primary-color);
              color: white;
              padding: 1rem;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              transition: var(--transition);
              font-weight: 600;
            }

            .submit-btn:hover {
              background: var(--secondary-color);
            }

            /* Footer */
            .footer {
              background: var(--text-color);
              color: white;
              padding: 4rem 5% 2rem;
            }

            .footer-content {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 2rem;
              max-width: 1200px;
              margin: 0 auto;
            }

            .footer-section h3 {
              color: var(--accent-color);
              margin-bottom: 1.5rem;
            }

            .footer-section a {
              color: white;
              text-decoration: none;
              display: block;
              margin-bottom: 0.5rem;
              transition: var(--transition);
            }

            .footer-section a:hover {
              color: var(--accent-color);
              transform: translateX(5px);
            }

            .footer-bottom {
              text-align: center;
              margin-top: 3rem;
              padding-top: 2rem;
              border-top: 1px solid rgba(255,255,255,0.1);
            }

            /* Animations */
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateY(-100px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            /* Responsive Design */
            @media (max-width: 768px) {
              .nav-links {
                display: none;
              }

              .mobile-menu-btn {
                display: block;
              }

              .hero h1 {
                font-size: 2.5rem;
              }

              .hero p {
                font-size: 1.2rem;
              }

              .cta-container {
                flex-direction: column;
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
