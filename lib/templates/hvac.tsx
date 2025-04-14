export const hvacTemplate = {
  id: "hvac-template",
  name: "HVAC Services",
  data: {
    pages: [
      {
        component: `
          <div class="site-wrapper">
            <header class="header">
              <nav class="navbar">
                <div class="nav-brand">
                  <span class="temp-icon">❄️</span>
                  <span class="brand-text">ClimateControl Pro</span>
                </div>
                <div class="nav-menu">
                  <a href="#home">Home</a>
                  <a href="#services">Services</a>
                  <a href="#why-us">Why Us</a>
                  <a href="#pricing">Pricing</a>
                  <a href="#contact" class="nav-cta">Emergency Service</a>
                </div>
                <button class="mobile-toggle">☰</button>
              </nav>
            </header>

            <section id="home" class="hero">
              <div class="hero-content">
                <h1>Expert HVAC Solutions</h1>
                <p>24/7 Heating, Ventilation & Air Conditioning Services</p>
                <div class="hero-cta">
                  <button class="cta-primary">Schedule Service</button>
                  <button class="cta-secondary">View Plans</button>
                </div>
                <div class="hero-features">
                  <div class="feature">
                    <span class="feature-icon">⚡</span>
                    <span>24/7 Emergency Service</span>
                  </div>
                  <div class="feature">
                    <span class="feature-icon">🛠️</span>
                    <span>Licensed Technicians</span>
                  </div>
                  <div class="feature">
                    <span class="feature-icon">💰</span>
                    <span>Competitive Pricing</span>
                  </div>
                </div>
              </div>
              <div class="hero-image"></div>
            </section>

            <section id="services" class="services">
              <h2>Our Services</h2>
              <div class="service-grid">
                <div class="service-card">
                  <div class="card-icon">❄️</div>
                  <h3>AC Installation & Repair</h3>
                  <p>Expert installation and maintenance of all AC brands</p>
                  <ul class="service-features">
                    <li>New System Installation</li>
                    <li>Emergency Repairs</li>
                    <li>Regular Maintenance</li>
                    <li>Energy Efficiency Upgrades</li>
                  </ul>
                  <a href="#contact" class="card-cta">Learn More →</a>
                </div>
                <div class="service-card">
                  <div class="card-icon">🔥</div>
                  <h3>Heating Systems</h3>
                  <p>Complete heating solutions for your comfort</p>
                  <ul class="service-features">
                    <li>Furnace Installation</li>
                    <li>Heat Pump Services</li>
                    <li>Boiler Maintenance</li>
                    <li>Heating Repairs</li>
                  </ul>
                  <a href="#contact" class="card-cta">Learn More →</a>
                </div>
                <div class="service-card">
                  <div class="card-icon">🌪️</div>
                  <h3>Ventilation</h3>
                  <p>Improve your indoor air quality</p>
                  <ul class="service-features">
                    <li>Duct Cleaning</li>
                    <li>Air Filter Replacement</li>
                    <li>Ventilation Installation</li>
                    <li>Air Quality Testing</li>
                  </ul>
                  <a href="#contact" class="card-cta">Learn More →</a>
                </div>
              </div>
            </section>

            <section id="why-us" class="why-us">
              <h2>Why Choose Us</h2>
              <div class="benefits-grid">
                <div class="benefit-card">
                  <div class="benefit-icon">👨‍🔧</div>
                  <h3>Expert Technicians</h3>
                  <p>Certified professionals with years of experience</p>
                </div>
                <div class="benefit-card">
                  <div class="benefit-icon">⚡</div>
                  <h3>Fast Response</h3>
                  <p>Quick emergency response within 2 hours</p>
                </div>
                <div class="benefit-card">
                  <div class="benefit-icon">💰</div>
                  <h3>Fair Pricing</h3>
                  <p>Transparent pricing with no hidden fees</p>
                </div>
                <div class="benefit-card">
                  <div class="benefit-icon">✅</div>
                  <h3>Guaranteed Work</h3>
                  <p>100% satisfaction guarantee on all services</p>
                </div>
              </div>
            </section>

            <section id="pricing" class="pricing">
              <h2>Service Plans</h2>
              <div class="pricing-grid">
                <div class="pricing-card basic">
                  <div class="plan-header">
                    <h3>Basic</h3>
                    <div class="price">
                      <span class="amount">$99</span>
                      <span class="period">/month</span>
                    </div>
                  </div>
                  <ul class="plan-features">
                    <li>Annual Maintenance Check</li>
                    <li>Filter Replacement</li>
                    <li>10% Off Repairs</li>
                    <li>Priority Scheduling</li>
                  </ul>
                  <button class="plan-cta">Choose Plan</button>
                </div>
                <div class="pricing-card premium">
                  <div class="plan-header">
                    <h3>Premium</h3>
                    <div class="price">
                      <span class="amount">$199</span>
                      <span class="period">/month</span>
                    </div>
                  </div>
                  <ul class="plan-features">
                    <li>Bi-Annual Maintenance</li>
                    <li>All Basic Features</li>
                    <li>20% Off Repairs</li>
                    <li>24/7 Emergency Support</li>
                    <li>Extended Warranty</li>
                  </ul>
                  <button class="plan-cta">Choose Plan</button>
                </div>
                <div class="pricing-card business">
                  <div class="plan-header">
                    <h3>Business</h3>
                    <div class="price">
                      <span class="amount">Custom</span>
                    </div>
                  </div>
                  <ul class="plan-features">
                    <li>Custom Maintenance Schedule</li>
                    <li>All Premium Features</li>
                    <li>Priority Emergency Response</li>
                    <li>Dedicated Account Manager</li>
                    <li>Custom Solutions</li>
                  </ul>
                  <button class="plan-cta">Contact Us</button>
                </div>
              </div>
            </section>

            <section id="contact" class="contact">
              <div class="contact-content">
                <div class="contact-info">
                  <h2>Get in Touch</h2>
                  <p>24/7 Emergency Service Available</p>
                  <div class="contact-methods">
                    <div class="method">
                      <span class="method-icon">📞</span>
                      <div class="method-details">
                        <h3>Phone</h3>
                        <p>(555) 123-4567</p>
                      </div>
                    </div>
                    <div class="method">
                      <span class="method-icon">✉️</span>
                      <div class="method-details">
                        <h3>Email</h3>
                        <p>service@climatepro.com</p>
                      </div>
                    </div>
                    <div class="method">
                      <span class="method-icon">📍</span>
                      <div class="method-details">
                        <h3>Address</h3>
                        <p>123 Climate Street, Cooltown, ST 12345</p>
                      </div>
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
                      <option value="ac">AC Service</option>
                      <option value="heating">Heating Service</option>
                      <option value="ventilation">Ventilation</option>
                      <option value="emergency">Emergency Service</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <textarea placeholder="Your Message" required></textarea>
                  </div>
                  <button type="submit" class="form-submit">Send Message</button>
                </form>
              </div>
            </section>

            <footer class="footer">
              <div class="footer-content">
                <div class="footer-section">
                  <h3>About Us</h3>
                  <p>Professional HVAC services with over 20 years of experience in keeping homes and businesses comfortable.</p>
                </div>
                <div class="footer-section">
                  <h3>Quick Links</h3>
                  <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                    <li><a href="#contact">Contact</a></li>
                  </ul>
                </div>
                <div class="footer-section">
                  <h3>Service Areas</h3>
                  <ul>
                    <li>Cooltown</li>
                    <li>Heatville</li>
                    <li>Ventburg</li>
                    <li>Airfield</li>
                  </ul>
                </div>
                <div class="footer-section">
                  <h3>Business Hours</h3>
                  <ul>
                    <li>Monday - Friday: 8am - 6pm</li>
                    <li>Saturday: 9am - 4pm</li>
                    <li>Sunday: Emergency Only</li>
                    <li>24/7 Emergency Service</li>
                  </ul>
                </div>
              </div>
              <div class="footer-bottom">
                <p>&copy; 2024 ClimateControl Pro. All rights reserved.</p>
              </div>
            </footer>
          </div>

          <style>
            /* Base Styles */
            :root {
              --primary: #0077cc;
              --secondary: #00a5e5;
              --accent: #ff6b6b;
              --background: #f8f9fa;
              --text: #333;
              --light: #ffffff;
              --dark: #1a1a1a;
              --gray: #6c757d;
              --border: #dee2e6;
              --shadow: 0 2px 15px rgba(0,0,0,0.1);
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

            body {
              font-family: 'Inter', sans-serif;
              line-height: 1.6;
              color: var(--text);
            }

            /* Header & Navigation */
            .header {
              position: fixed;
              width: 100%;
              top: 0;
              z-index: 1000;
              background: rgba(255, 255, 255, 0.95);
              backdrop-filter: blur(10px);
              box-shadow: var(--shadow);
            }

            .navbar {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 1rem 5%;
              max-width: 1400px;
              margin: 0 auto;
            }

            .nav-brand {
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }

            .temp-icon {
              font-size: 1.8rem;
            }

            .brand-text {
              font-size: 1.5rem;
              font-weight: 700;
              color: var(--primary);
            }

            .nav-menu {
              display: flex;
              gap: 2rem;
              align-items: center;
            }

            .nav-menu a {
              text-decoration: none;
              color: var(--text);
              font-weight: 500;
              transition: var(--transition);
              position: relative;
            }

            .nav-menu a::after {
              content: '';
              position: absolute;
              width: 0;
              height: 2px;
              bottom: -4px;
              left: 0;
              background: var(--primary);
              transition: var(--transition);
            }

            .nav-menu a:hover::after {
              width: 100%;
            }

            .nav-cta {
              background: var(--accent);
              color: white !important;
              padding: 0.75rem 1.5rem;
              border-radius: 25px;
              transition: var(--transition);
            }

            .nav-cta:hover {
              transform: translateY(-2px);
              box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
            }

            .mobile-toggle {
              display: none;
              background: none;
              border: none;
              font-size: 1.5rem;
              cursor: pointer;
              color: var(--primary);
            }

            /* Hero Section */
            .hero {
              min-height: 100vh;
              display: flex;
              align-items: center;
              padding: 7rem 5% 5rem;
              background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
              position: relative;
              overflow: hidden;
            }

            .hero-content {
              flex: 1;
              max-width: 600px;
              position: relative;
              z-index: 2;
            }

            .hero h1 {
              font-size: 4rem;
              color: var(--primary);
              margin-bottom: 1.5rem;
              line-height: 1.2;
              opacity: 0;
              animation: slideUp 1s forwards;
            }

            .hero p {
              font-size: 1.5rem;
              color: var(--gray);
              margin-bottom: 2rem;
              opacity: 0;
              animation: slideUp 1s 0.3s forwards;
            }

            .hero-cta {
              display: flex;
              gap: 1rem;
              margin-bottom: 3rem;
              opacity: 0;
              animation: slideUp 1s 0.6s forwards;
            }

            .cta-primary, .cta-secondary {
              padding: 1rem 2rem;
              border-radius: 25px;
              font-weight: 600;
              font-size: 1.1rem;
              cursor: pointer;
              transition: var(--transition);
            }

            .cta-primary {
              background: var(--primary);
              color: white;
              border: none;
            }

            .cta-secondary {
              background: transparent;
              border: 2px solid var(--primary);
              color: var(--primary);
            }

            .cta-primary:hover, .cta-secondary:hover {
              transform: translateY(-3px);
              box-shadow: 0 5px 15px rgba(0, 119, 204, 0.3);
            }

            .hero-features {
              display: flex;
              gap: 2rem;
              opacity: 0;
              animation: slideUp 1s 0.9s forwards;
            }

            .feature {
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }

            .feature-icon {
              font-size: 1.5rem;
            }

            .hero-image {
              position: absolute;
              right: -5%;
              top: 50%;
              transform: translateY(-50%);
              width: 50%;
              height: 70%;
              background: url('https://images.unsplash.com/photo-1581094794329-c8112c4e5190?auto=format&fit=crop&q=80&w=2070') center/cover;
              border-radius: 30px;
              box-shadow: var(--shadow);
              opacity: 0;
              animation: slideIn 1s 1.2s forwards;
            }

            /* Services Section */
            .services {
              padding: 6rem 5%;
              background: var(--light);
            }

            .services h2 {
              text-align: center;
              font-size: 2.5rem;
              color: var(--primary);
              margin-bottom: 3rem;
              position: relative;
            }

            .services h2::after {
              content: '';
              position: absolute;
              bottom: -10px;
              left: 50%;
              transform: translateX(-50%);
              width: 50px;
              height: 3px;
              background: var(--primary);
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
              padding: 2rem;
              border-radius: 15px;
              box-shadow: var(--shadow);
              transition: var(--transition);
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
              background: var(--primary);
              transform: scaleX(0);
              transition: var(--transition);
            }

            .service-card:hover {
              transform: translateY(-10px);
            }

            .service-card:hover::before {
              transform: scaleX(1);
            }

            .card-icon {
              font-size: 3rem;
              margin-bottom: 1.5rem;
            }

            .service-card h3 {
              color: var(--primary);
              margin-bottom: 1rem;
              font-size: 1.5rem;
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

            .card-cta {
              display: inline-block;
              color: var(--primary);
              text-decoration: none;
              font-weight: 600;
              transition: var(--transition);
            }

            .card-cta:hover {
              transform: translateX(5px);
            }

            /* Why Us Section */
            .why-us {
              padding: 6rem 5%;
              background: var(--background);
            }

            .why-us h2 {
              text-align: center;
              font-size: 2.5rem;
              color: var(--primary);
              margin-bottom: 3rem;
            }

            .benefits-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 2rem;
              max-width: 1200px;
              margin: 0 auto;
            }

            .benefit-card {
              background: white;
              padding: 2rem;
              border-radius: 15px;
              text-align: center;
              transition: var(--transition);
              box-shadow: var(--shadow);
            }

            .benefit-card:hover {
              transform: translateY(-5px);
            }

            .benefit-icon {
              font-size: 2.5rem;
              margin-bottom: 1rem;
            }

            /* Pricing Section */
            .pricing {
              padding: 6rem 5%;
              background: var(--light);
            }

            .pricing h2 {
              text-align: center;
              font-size: 2.5rem;
              color: var(--primary);
              margin-bottom: 3rem;
            }

            .pricing-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 2rem;
              max-width: 1200px;
              margin: 0 auto;
            }

            .pricing-card {
              background: white;
              padding: 2rem;
              border-radius: 15px;
              box-shadow: var(--shadow);
              transition: var(--transition);
            }

            .pricing-card:hover {
              transform: translateY(-10px);
            }

            .plan-header {
              text-align: center;
              margin-bottom: 2rem;
              padding-bottom: 2rem;
              border-bottom: 1px solid var(--border);
            }

            .price {
              margin-top: 1rem;
            }

            .amount {
              font-size: 2.5rem;
              font-weight: 700;
              color: var(--primary);
            }

            .period {
              color: var(--gray);
            }

            .plan-features {
              list-style: none;
              margin-bottom: 2rem;
            }

            .plan-features li {
              margin-bottom: 0.5rem;
              padding-left: 1.5rem;
              position: relative;
            }

            .plan-features li::before {
              content: '✓';
              position: absolute;
              left: 0;
              color: var(--primary);
            }

            .plan-cta {
              width: 100%;
              padding: 1rem;
              border: none;
              border-radius: 25px;
              background: var(--primary);
              color: white;
              font-weight: 600;
              cursor: pointer;
              transition: var(--transition);
            }

            .plan-cta:hover {
              background: var(--secondary);
            }

            /* Contact Section */
            .contact {
              padding: 6rem 5%;
              background: var(--background);
            }

            .contact-content {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 4rem;
              max-width: 1200px;
              margin: 0 auto;
            }

            .contact-info h2 {
              font-size: 2.5rem;
              color: var(--primary);
              margin-bottom: 1rem;
            }

            .contact-methods {
              margin-top: 2rem;
            }

            .method {
              display: flex;
              align-items: center;
              gap: 1rem;
              margin-bottom: 1.5rem;
            }

            .method-icon {
              font-size: 1.5rem;
            }

            .contact-form {
              background: white;
              padding: 2rem;
              border-radius: 15px;
              box-shadow: var(--shadow);
            }

            .form-group {
              margin-bottom: 1rem;
            }

            .form-group input,
            .form-group select,
            .form-group textarea {
              width: 100%;
              padding: 1rem;
              border: 1px solid var(--border);
              border-radius: 5px;
              font-family: inherit;
            }

            .form-group textarea {
              height: 150px;
              resize: vertical;
            }

            .form-submit {
              width: 100%;
              padding: 1rem;
              background: var(--primary);
              color: white;
              border: none;
              border-radius: 25px;
              font-weight: 600;
              cursor: pointer;
              transition: var(--transition);
            }

            .form-submit:hover {
              background: var(--secondary);
            }

            /* Footer */
            .footer {
              background: var(--dark);
              color: white;
              padding: 4rem 5% 2rem;
            }

            .footer-content {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 2rem;
              max-width: 1200px;
              margin: 0 auto;
            }

            .footer-section h3 {
              color: var(--primary);
              margin-bottom: 1.5rem;
            }

            .footer-section ul {
              list-style: none;
            }

            .footer-section ul li {
              margin-bottom: 0.5rem;
            }

            .footer-section a {
              color: white;
              text-decoration: none;
              transition: var(--transition);
            }

            .footer-section a:hover {
              color: var(--primary);
            }

            .footer-bottom {
              text-align: center;
              margin-top: 3rem;
              padding-top: 2rem;
              border-top: 1px solid rgba(255,255,255,0.1);
            }

            /* Animations */
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translate(100px, -50%);
              }
              to {
                opacity: 1;
                transform: translate(0, -50%);
              }
            }

            /* Responsive Design */
            @media (max-width: 768px) {
              .nav-menu {
                display: none;
              }

              .mobile-toggle {
                display: block;
              }

              .hero {
                text-align: center;
                padding-top: 5rem;
              }

              .hero h1 {
                font-size: 2.5rem;
              }

              .hero-features {
                flex-direction: column;
                align-items: center;
              }

              .hero-image {
                display: none;
              }

              .hero-cta {
                justify-content: center;
              }

              .contact-content {
                grid-template-columns: 1fr;
              }
            }
          </style>
          `,
      },
    ],
  },
};
