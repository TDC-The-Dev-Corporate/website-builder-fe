export const carpenterTemplate = {
  id: "carpenter-template",
  name: "Carpenter Portfolio",
  data: {
    pages: [
      {
        component: `
          <div class="site-wrapper">
            <!-- Overlay for modals and drawers -->
            <div id="overlay" class="overlay"></div>
            
            <!-- Mobile drawer navigation -->
            <div id="drawer" class="drawer">
              <div class="drawer-header">
                <div class="logo">Craftsman Woodworks</div>
                <button data-action="close-drawer" class="close-btn">&times;</button>
              </div>
              <div class="drawer-links">
                <a href="#home">Home</a>
                <a href="#services">Services</a>
                <a href="#portfolio">Portfolio</a>
                <a href="#testimonials">Testimonials</a>
                <a href="#contact">Contact</a>
              </div>
            </div>
            
            <!-- Quote Request Modal -->
            <div id="quote-modal" class="modal">
              <div class="modal-content">
                <div class="modal-header">
                  <h3>Request a Quote</h3>
                  <button data-action="close-modal" data-modal-id="quote-modal" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                  <form class="modal-form" id="quote-form">
                    <input type="text" placeholder="Your Name" required />
                    <input type="tel" placeholder="Your Phone" required />
                    <select required>
                      <option value="" disabled selected>Select Service</option>
                      <option value="custom-furniture">Custom Furniture</option>
                      <option value="home-renovation">Home Renovation</option>
                      <option value="restoration">Restoration</option>
                    </select>
                    <textarea placeholder="Project Details" required rows="4"></textarea>
                    <button type="submit" class="submit-btn">Submit Request</button>
                  </form>
                </div>
              </div>
            </div>
            
            <!-- Portfolio Item Modals -->
            <div id="portfolio-modal-1" class="modal">
              <div class="modal-content portfolio-modal-content">
                <div class="modal-header">
                  <h3>Custom Kitchen</h3>
                  <button data-action="close-modal" data-modal-id="portfolio-modal-1" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                  <img src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&q=80&w=900" alt="Custom Kitchen" class="modal-img" />
                  <div class="portfolio-details">
                    <h4>Modern Farmhouse Design</h4>
                    <p>This custom kitchen renovation featured hand-crafted cabinetry, a center island with butcher block countertop, and custom storage solutions throughout.</p>
                    <div class="project-meta">
                      <div class="meta-item">
                        <strong>Client:</strong> Johnson Family
                      </div>
                      <div class="meta-item">
                        <strong>Timeline:</strong> 6 weeks
                      </div>
                      <div class="meta-item">
                        <strong>Services:</strong> Design, Fabrication, Installation
                      </div>
                    </div>
                    <button data-action="open-modal" data-modal-id="quote-modal" class="cta-button primary">Request Similar Project</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div id="portfolio-modal-2" class="modal">
              <div class="modal-content portfolio-modal-content">
                <div class="modal-header">
                  <h3>Dining Table</h3>
                  <button data-action="close-modal" data-modal-id="portfolio-modal-2" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                  <img src="https://images.unsplash.com/photo-1560185127-2d5d45dacf96?auto=format&fit=crop&q=80&w=900" alt="Dining Table" class="modal-img" />
                  <div class="portfolio-details">
                    <h4>Solid Oak Craftsmanship</h4>
                    <p>This bespoke dining table was handcrafted from solid oak with traditional joinery techniques. The natural finish highlights the wood's beautiful grain pattern.</p>
                    <div class="project-meta">
                      <div class="meta-item">
                        <strong>Client:</strong> Williams Residence
                      </div>
                      <div class="meta-item">
                        <strong>Timeline:</strong> 4 weeks
                      </div>
                      <div class="meta-item">
                        <strong>Services:</strong> Design, Fabrication
                      </div>
                    </div>
                    <button data-action="open-modal" data-modal-id="quote-modal" class="cta-button primary">Request Similar Project</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div id="portfolio-modal-3" class="modal">
              <div class="modal-content portfolio-modal-content">
                <div class="modal-header">
                  <h3>Built-in Shelving</h3>
                  <button data-action="close-modal" data-modal-id="portfolio-modal-3" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                  <img src="https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=900" alt="Built-in Shelving" class="modal-img" />
                  <div class="portfolio-details">
                    <h4>Custom Storage Solutions</h4>
                    <p>These built-in shelves were designed to maximize storage while complementing the home's existing architecture. The project included integrated lighting and adjustable shelving.</p>
                    <div class="project-meta">
                      <div class="meta-item">
                        <strong>Client:</strong> Smithfield Library
                      </div>
                      <div class="meta-item">
                        <strong>Timeline:</strong> 3 weeks
                      </div>
                      <div class="meta-item">
                        <strong>Services:</strong> Design, Fabrication, Installation
                      </div>
                    </div>
                    <button data-action="open-modal" data-modal-id="quote-modal" class="cta-button primary">Request Similar Project</button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Service Detail Modals -->
            <div id="service-modal-1" class="modal">
              <div class="modal-content">
                <div class="modal-header">
                  <h3>Custom Furniture</h3>
                  <button data-action="close-modal" data-modal-id="service-modal-1" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                  <img src="https://images.unsplash.com/photo-1560185127-2d5d45dacf96?auto=format&fit=crop&q=80&w=900" alt="Custom Furniture" class="modal-img" />
                  <div class="service-details">
                    <p>Our custom furniture is handcrafted to your exact specifications. We work with you from concept to completion to create pieces that perfectly fit your space and style.</p>
                    <h4>Our Process:</h4>
                    <ol>
                      <li>Initial consultation to understand your needs and preferences</li>
                      <li>Custom design and material selection</li>
                      <li>Crafting your piece with attention to every detail</li>
                      <li>Finishing and delivery</li>
                    </ol>
                    <h4>Materials We Work With:</h4>
                    <ul>
                      <li>Hardwoods (Oak, Maple, Walnut, Cherry)</li>
                      <li>Reclaimed wood</li>
                      <li>Metal accents</li>
                      <li>Glass and stone</li>
                    </ul>
                    <button data-action="open-modal" data-modal-id="quote-modal" class="cta-button primary">Request a Quote</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div id="service-modal-2" class="modal">
              <div class="modal-content">
                <div class="modal-header">
                  <h3>Home Renovation</h3>
                  <button data-action="close-modal" data-modal-id="service-modal-2" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                  <img src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&q=80&w=900" alt="Home Renovation" class="modal-img" />
                  <div class="service-details">
                    <p>Transform your living spaces with our comprehensive woodworking renovation services. We specialize in kitchens, built-ins, staircases, and custom architectural details.</p>
                    <h4>Renovation Services:</h4>
                    <ul>
                      <li>Kitchen and bathroom cabinetry</li>
                      <li>Built-in shelving and storage solutions</li>
                      <li>Custom staircases and railings</li>
                      <li>Architectural millwork and trim</li>
                      <li>Custom doors and windows</li>
                    </ul>
                    <button data-action="open-modal" data-modal-id="quote-modal" class="cta-button primary">Request a Quote</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div id="service-modal-3" class="modal">
              <div class="modal-content">
                <div class="modal-header">
                  <h3>Restoration</h3>
                  <button data-action="close-modal" data-modal-id="service-modal-3" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                  <img src="https://images.unsplash.com/photo-1508872430077-52c9671db2e5?auto=format&fit=crop&q=80&w=900" alt="Restoration" class="modal-img" />
                  <div class="service-details">
                    <p>We breathe new life into antique and vintage wooden furniture. Our restoration services preserve the character and craftsmanship of your treasured pieces while ensuring they remain functional for years to come.</p>
                    <h4>Restoration Services:</h4>
                    <ul>
                      <li>Structural repairs and reinforcement</li>
                      <li>Surface restoration and refinishing</li>
                      <li>Hardware replacement and restoration</li>
                      <li>Custom part fabrication for missing elements</li>
                      <li>Conservation of antique finishes</li>
                    </ul>
                    <button data-action="open-modal" data-modal-id="quote-modal" class="cta-button primary">Request a Quote</button>
                  </div>
                </div>
              </div>
            </div>
            
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
                <button class="mobile-menu-btn" data-action="open-drawer">☰</button>
              </nav>
            </header>
            
            <section id="home" class="hero">
              <div class="hero-content">
                <h1 class="slide-in">Master Carpentry & Woodworking</h1>
                <p class="fade-in">Crafting excellence in every piece, bringing your vision to life</p>
                <div class="cta-container">
                  <button class="cta-button primary" data-action="open-modal" data-modal-id="portfolio-modal-1">View Our Work</button>
                  <button class="cta-button secondary" data-action="open-modal" data-modal-id="quote-modal">Get Quote</button>
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
                  <button class="service-link" data-action="open-modal" data-modal-id="service-modal-1">Learn More →</button>
                </div>
                <div class="service-card">
                  <div class="service-icon">🏠</div>
                  <h3>Home Renovation</h3>
                  <p>Complete woodwork solutions for your home improvement projects</p>
                  <button class="service-link" data-action="open-modal" data-modal-id="service-modal-2">Learn More →</button>
                </div>
                <div class="service-card">
                  <div class="service-icon">🔨</div>
                  <h3>Restoration</h3>
                  <p>Expert restoration of antique and vintage wooden furniture</p>
                  <button class="service-link" data-action="open-modal" data-modal-id="service-modal-3">Learn More →</button>
                </div>
              </div>
            </section>

            <section id="portfolio" class="portfolio">
              <h2>Recent Projects</h2>
              <div class="portfolio-grid">
                <div class="portfolio-item" data-action="open-modal" data-modal-id="portfolio-modal-1">
                  <img src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&q=80&w=500" alt="Custom Kitchen" />
                  <div class="portfolio-overlay">
                    <h3>Custom Kitchen</h3>
                    <p>Modern farmhouse design</p>
                  </div>
                </div>
                <div class="portfolio-item" data-action="open-modal" data-modal-id="portfolio-modal-2">
                  <img src="https://images.unsplash.com/photo-1560185127-2d5d45dacf96?auto=format&fit=crop&q=80&w=500" alt="Dining Table" />
                  <div class="portfolio-overlay">
                    <h3>Dining Table</h3>
                    <p>Solid oak craftsmanship</p>
                  </div>
                </div>
                <div class="portfolio-item" data-action="open-modal" data-modal-id="portfolio-modal-3">
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
                <form class="contact-form" id="contact-form">
                  <input type="text" placeholder="Your Name" required />
                  <input type="tel" placeholder="Your Phone" required />
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
              background: none;
              border: none;
              cursor: pointer;
              padding: 0;
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
              cursor: pointer;
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
            .contact-form textarea,
            .modal-form input,
            .modal-form textarea,
            .modal-form select {
              padding: 1rem;
              border: 1px solid #ddd;
              border-radius: 5px;
              font-family: inherit;
            }

            .contact-form textarea,
            .modal-form textarea {
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

            /* Modal Styles */
            .overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.7);
              backdrop-filter: blur(3px);
              z-index: 1999;
              display: none;
              opacity: 0;
              transition: opacity 0.3s ease;
            }

            .overlay.active {
              display: block;
              opacity: 1;
            }

            .modal {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) scale(0.9);
              z-index: 2000;
              background: white;
              border-radius: 10px;
              box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
              max-width: 90%;
              width: 800px;
              max-height: 90vh;
              overflow-y: auto;
              display: none;
              opacity: 0;
              transition: transform 0.3s ease, opacity 0.3s ease;
            }

            .modal.active {
              display: block;
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }

            .modal-content {
              padding: 2rem;
            }

            .portfolio-modal-content {
              padding: 0;
            }

            .modal-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0 0 1.5rem;
              border-bottom: 1px solid #eee;
              margin-bottom: 1.5rem;
            }

            .portfolio-modal-content .modal-header {
              padding: 1.5rem 2rem;
              margin-bottom: 0;
            }

            .modal-header h3 {
              font-size: 1.8rem;
              color: var(--primary-color);
              margin: 0;
            }

            .close-btn {
              background: none;
              border: none;
              font-size: 1.8rem;
              cursor: pointer;
              color: #777;
              transition: color 0.2s;
              padding: 0;
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }

            .close-btn:hover {
              color: #000;
              background-color: rgba(0, 0, 0, 0.1);
            }

            .modal-body {
              font-size: 1rem;
            }

            .portfolio-modal-content .modal-body {
              display: grid;
              grid-template-columns: 1fr;
            }

            @media (min-width: 768px) {
              .portfolio-modal-content .modal-body {
                grid-template-columns: 1fr 1fr;
              }
            }

            .modal-img {
              width: 100%;
              height: auto;
              object-fit: cover;
              border-radius: 0;
            }

            @media (min-width: 768px) {
              .modal-img {
                height: 100%;
                max-height: 500px;
                border-radius: 0 0 0 10px;
              }
            }

            .portfolio-details,
            .service-details {
              padding: 2rem;
            }

            .portfolio-details h4,
            .service-details h4 {
              color: var(--primary-color);
              margin: 1.5rem 0 0.75rem;
            }

            .project-meta {
              margin: 1.5rem 0;
              padding: 1rem;
              background: var(--background-light);
              border-radius: 5px;
            }

            .meta-item {
              margin-bottom: 0.5rem;
            }

            .service-details ul,
            .service-details ol {
              margin-left: 1.5rem;
              margin-bottom: 1.5rem;
            }

            .service-details li {
              margin-bottom: 0.5rem;
            }

            .modal-form {
              display: grid;
              gap: 1rem;
              margin-top: 1rem;
            }

            /* Drawer Styles */
            .drawer {
              position: fixed;
              top: 0;
              right: -300px;
              width: 300px;
              height: 100%;
              background: white;
              z-index: 2000;
              box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
              transition: right 0.3s ease;
              overflow-y: auto;
            }

            .drawer.active {
              right: 0;
            }

            .drawer-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 1.5rem;
              border-bottom: 1px solid #eee;
            }

            .drawer-links {
              padding: 1.5rem;
            }

            .drawer-links a {
              display: block;
              padding: 1rem 0;
              color: var(--text-color);
              text-decoration: none;
              font-weight: 500;
              border-bottom: 1px solid #eee;
              transition: var(--transition);
            }

            .drawer-links a:hover {
              color: var(--primary-color);
              transform: translateX(5px);
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
              
              .modal {
                width: 95%;
              }
              
              .portfolio-details, 
              .service-details {
                padding: 1.5rem;
              }
            }
          </style>
          
          <script>
            // Event Delegation System
            document.addEventListener('click', function(e) {
              const btn = e.target.closest('[data-action]');
              if (!btn) return;
              
              const action = btn.dataset.action;
              const modalId = btn.dataset.modalId;
              
              if (action === 'open-drawer') {
                document.getElementById('drawer').classList.add('active');
                document.getElementById('overlay').classList.add('active');
              }
              
              if (action === 'close-drawer') {
                document.getElementById('drawer').classList.remove('active');
                document.getElementById('overlay').classList.remove('active');
              }
              
              if (action === 'open-modal' && modalId) {
                document.getElementById(modalId).classList.add('active');
                document.getElementById('overlay').classList.add('active');
              }
              
              if (action === 'close-modal' && modalId) {
                document.getElementById(modalId).classList.remove('active');
                document.getElementById('overlay').classList.remove('active');
              }
            });
            
            // Close modals and drawers when clicking on overlay
            document.getElementById('overlay').addEventListener('click', function() {
              document.getElementById('drawer').classList.remove('active');
              
              // Close all modals
              const modals = document.querySelectorAll('.modal');
              modals.forEach(modal => {
                modal.classList.remove('active');
              });
              
              this.classList.remove('active');
            });
            
            // Prevent clicks inside modals from closing them
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
              modal.addEventListener('click', function(e) {
                e.stopPropagation();
              });
            });
            
            // Handle form submissions
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
              form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for your submission! We will contact you shortly.');
                this.reset();
                
                // Close the modal if the form is inside one
                const modal = this.closest('.modal');
                if (modal) {
                  modal.classList.remove('active');
                  document.getElementById('overlay').classList.remove('active');
                }
              });
            });
          </script>
          `,
      },
    ],
  },
};
