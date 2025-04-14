export const electricianTemplate = {
  id: "electrician-template",
  name: "Modern Electrician Portfolio",
  data: {
    pages: [
      {
        component: `
          <div class="site-wrapper">
            <!-- Floating Navigation -->
            <nav class="floating-nav">
              <div class="nav-brand">
                <span class="brand-icon">⚡</span>
                <span class="brand-text">VoltMaster</span>
              </div>
              <div class="nav-links">
                <a href="#home" class="nav-link active">Home</a>
                <a href="#services" class="nav-link">Services</a>
                <a href="#work" class="nav-link">Our Work</a>
                <a href="#testimonials" class="nav-link">Testimonials</a>
                <a href="#contact" class="nav-link">Contact</a>
              </div>
              <button class="emergency-btn pulse">24/7 Emergency</button>
              <button class="mobile-menu">☰</button>
            </nav>

            <!-- Hero Section -->
            <section id="home" class="hero">
              <div class="hero-content">
                <h1 class="glitch-text">Powering Your World</h1>
                <p class="fade-in">Professional electrical services for residential and commercial needs</p>
                <div class="cta-group">
                  <button class="primary-cta glow">Get Started</button>
                  <button class="secondary-cta">Learn More</button>
                </div>
              </div>
              <div class="hero-visual">
                <div class="circuit-animation"></div>
              </div>
            </section>

            <!-- Services Section -->
            <section id="services" class="services">
              <h2>Our Services</h2>
              <div class="service-cards">
                <div class="service-card flip-card">
                  <div class="card-inner">
                    <div class="card-front">
                      <span class="service-icon">🏠</span>
                      <h3>Residential</h3>
                      <p>Complete home electrical solutions</p>
                    </div>
                    <div class="card-back">
                      <ul>
                        <li>Wiring Installation</li>
                        <li>Safety Inspections</li>
                        <li>Lighting Design</li>
                        <li>Smart Home Setup</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="service-card flip-card">
                  <div class="card-inner">
                    <div class="card-front">
                      <span class="service-icon">🏢</span>
                      <h3>Commercial</h3>
                      <p>Business electrical infrastructure</p>
                    </div>
                    <div class="card-back">
                      <ul>
                        <li>Power Distribution</li>
                        <li>Emergency Systems</li>
                        <li>Data Cabling</li>
                        <li>Energy Efficiency</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="service-card flip-card">
                  <div class="card-inner">
                    <div class="card-front">
                      <span class="service-icon">🔧</span>
                      <h3>Maintenance</h3>
                      <p>Regular upkeep and repairs</p>
                    </div>
                    <div class="card-back">
                      <ul>
                        <li>24/7 Emergency</li>
                        <li>Preventive Care</li>
                        <li>System Updates</li>
                        <li>Safety Checks</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Work Section -->
            <section id="work" class="work">
              <h2>Recent Projects</h2>
              <div class="project-grid">
                <div class="project-item">
                  <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800" alt="Commercial Project" />
                  <div class="project-overlay">
                    <h3>Office Complex</h3>
                    <p>Complete electrical system upgrade</p>
                  </div>
                </div>
                <div class="project-item">
                  <img src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800" alt="Smart Home" />
                  <div class="project-overlay">
                    <h3>Smart Home</h3>
                    <p>Automated lighting and security</p>
                  </div>
                </div>
                <div class="project-item">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" alt="Industrial" />
                  <div class="project-overlay">
                    <h3>Industrial Facility</h3>
                    <p>Power distribution system</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Testimonials Section -->
            <section id="testimonials" class="testimonials">
              <h2>Client Feedback</h2>
              <div class="testimonial-slider">
                <div class="testimonial-card slide-in">
                  <div class="quote">❝</div>
                  <p>Exceptional service! The team was professional and completed the work ahead of schedule.</p>
                  <div class="client-info">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="John" class="client-photo" />
                    <div>
                      <h4>John Smith</h4>
                      <span>Homeowner</span>
                    </div>
                  </div>
                </div>
                <div class="testimonial-card slide-in">
                  <div class="quote">❝</div>
                  <p>VoltMaster transformed our office's electrical infrastructure. Highly recommended!</p>
                  <div class="client-info">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Sarah" class="client-photo" />
                    <div>
                      <h4>Sarah Johnson</h4>
                      <span>Business Owner</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Contact Section -->
            <section id="contact" class="contact">
              <div class="contact-container">
                <div class="contact-info">
                  <h2>Get in Touch</h2>
                  <p>Available 24/7 for emergency services</p>
                  <div class="contact-methods">
                    <div class="method">
                      <span class="method-icon">📞</span>
                      <div>
                        <h3>Phone</h3>
                        <p>(555) 123-4567</p>
                      </div>
                    </div>
                    <div class="method">
                      <span class="method-icon">📧</span>
                      <div>
                        <h3>Email</h3>
                        <p>info@voltmaster.com</p>
                      </div>
                    </div>
                    <div class="method">
                      <span class="method-icon">📍</span>
                      <div>
                        <h3>Address</h3>
                        <p>123 Electric Ave, Powertown</p>
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
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <textarea placeholder="Your Message" required></textarea>
                  </div>
                  <button type="submit" class="submit-btn glow">Send Message</button>
                </form>
              </div>
            </section>
          </div>

          <style>
            /* Base Styles */
            :root {
              --primary: #00a8ff;
              --secondary: #192a56;
              --accent: #ffa502;
              --text: #2f3640;
              --background: #f5f6fa;
              --white: #ffffff;
              --gradient: linear-gradient(135deg, var(--primary), #0097e6);
              --shadow: 0 10px 20px rgba(0,0,0,0.1);
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

            /* Navigation */
            .floating-nav {
              position: fixed;
              top: 20px;
              left: 50%;
              transform: translateX(-50%);
              width: 90%;
              max-width: 1200px;
              padding: 1rem 2rem;
              background: rgba(255, 255, 255, 0.95);
              backdrop-filter: blur(10px);
              border-radius: 50px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              box-shadow: var(--shadow);
              z-index: 1000;
            }

            .nav-brand {
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }

            .brand-icon {
              font-size: 1.5rem;
            }

            .brand-text {
              font-size: 1.25rem;
              font-weight: 700;
              background: var(--gradient);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }

            .nav-links {
              display: flex;
              gap: 2rem;
            }

            .nav-link {
              text-decoration: none;
              color: var(--text);
              font-weight: 500;
              transition: var(--transition);
              position: relative;
            }

            .nav-link::after {
              content: '';
              position: absolute;
              bottom: -5px;
              left: 0;
              width: 0;
              height: 2px;
              background: var(--gradient);
              transition: var(--transition);
            }

            .nav-link:hover::after,
            .nav-link.active::after {
              width: 100%;
            }

            .emergency-btn {
              padding: 0.75rem 1.5rem;
              background: var(--accent);
              color: white;
              border: none;
              border-radius: 25px;
              font-weight: 600;
              cursor: pointer;
              transition: var(--transition);
            }

            .pulse {
              animation: pulse 2s infinite;
            }

            @keyframes pulse {
              0% {
                box-shadow: 0 0 0 0 rgba(255, 165, 2, 0.4);
              }
              70% {
                box-shadow: 0 0 0 10px rgba(255, 165, 2, 0);
              }
              100% {
                box-shadow: 0 0 0 0 rgba(255, 165, 2, 0);
              }
            }

            .mobile-menu {
              display: none;
              background: none;
              border: none;
              font-size: 1.5rem;
              cursor: pointer;
            }

            /* Hero Section */
            .hero {
              min-height: 100vh;
              display: grid;
              grid-template-columns: 1fr 1fr;
              align-items: center;
              padding: 7rem 5% 5rem;
              background: linear-gradient(135deg, #f5f6fa 0%, #dcdde1 100%);
              position: relative;
              overflow: hidden;
            }

            .hero-content {
              z-index: 1;
            }

            .glitch-text {
              font-size: 4rem;
              color: var(--secondary);
              position: relative;
              margin-bottom: 1.5rem;
              animation: glitch 1s linear infinite;
            }

            @keyframes glitch {
              2%, 64% {
                transform: translate(2px,0) skew(0deg);
              }
              4%, 60% {
                transform: translate(-2px,0) skew(0deg);
              }
              62% {
                transform: translate(0,0) skew(5deg);
              }
            }

            .hero p {
              font-size: 1.25rem;
              margin-bottom: 2rem;
              opacity: 0;
              animation: fadeIn 1s forwards 0.5s;
            }

            @keyframes fadeIn {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .cta-group {
              display: flex;
              gap: 1rem;
            }

            .primary-cta,
            .secondary-cta {
              padding: 1rem 2rem;
              border-radius: 30px;
              font-weight: 600;
              cursor: pointer;
              transition: var(--transition);
            }

            .primary-cta {
              background: var(--gradient);
              color: white;
              border: none;
            }

            .glow {
              animation: glow 2s ease-in-out infinite alternate;
            }

            @keyframes glow {
              from {
                box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px var(--primary);
              }
              to {
                box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px var(--primary);
              }
            }

            .secondary-cta {
              background: transparent;
              border: 2px solid var(--primary);
              color: var(--primary);
            }

            .hero-visual {
              position: relative;
            }

            .circuit-animation {
              position: absolute;
              width: 100%;
              height: 100%;
              background: url('https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=1000') center/cover;
              opacity: 0.8;
              animation: circuit 20s linear infinite;
            }

            @keyframes circuit {
              0% {
                transform: scale(1) rotate(0deg);
              }
              50% {
                transform: scale(1.1) rotate(180deg);
              }
              100% {
                transform: scale(1) rotate(360deg);
              }
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
              color: var(--secondary);
            }

            .service-cards {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 2rem;
              max-width: 1200px;
              margin: 0 auto;
            }

            .flip-card {
              background: transparent;
              perspective: 1000px;
              height: 300px;
            }

            .card-inner {
              position: relative;
              width: 100%;
              height: 100%;
              text-align: center;
              transition: transform 0.8s;
              transform-style: preserve-3d;
            }

            .flip-card:hover .card-inner {
              transform: rotateY(180deg);
            }

            .card-front,
            .card-back {
              position: absolute;
              width: 100%;
              height: 100%;
              backface-visibility: hidden;
              border-radius: 15px;
              padding: 2rem;
            }

            .card-front {
              background: white;
              box-shadow: var(--shadow);
            }

            .card-back {
              background: var(--gradient);
              color: white;
              transform: rotateY(180deg);
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .service-icon {
              font-size: 3rem;
              margin-bottom: 1rem;
              display: block;
            }

            /* Work Section */
            .work {
              padding: 6rem 5%;
              background: var(--background);
            }

            .work h2 {
              text-align: center;
              font-size: 2.5rem;
              margin-bottom: 3rem;
              color: var(--secondary);
            }

            .project-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 2rem;
              max-width: 1200px;
              margin: 0 auto;
            }

            .project-item {
              position: relative;
              overflow: hidden;
              border-radius: 15px;
              height: 300px;
            }

            .project-item img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: var(--transition);
            }

            .project-overlay {
              position: absolute;
              bottom: -100%;
              left: 0;
              width: 100%;
              padding: 2rem;
              background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
              color: white;
              transition: var(--transition);
            }

            .project-item:hover .project-overlay {
              bottom: 0;
            }

            .project-item:hover img {
              transform: scale(1.1);
            }

            /* Testimonials Section */
            .testimonials {
              padding: 6rem 5%;
              background: var(--white);
            }

            .testimonials h2 {
              text-align: center;
              font-size: 2.5rem;
              margin-bottom: 3rem;
              color: var(--secondary);
            }

            .testimonial-slider {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 2rem;
              max-width: 1200px;
              margin: 0 auto;
            }

            .testimonial-card {
              background: white;
              padding: 2rem;
              border-radius: 15px;
              box-shadow: var(--shadow);
              position: relative;
            }

            .quote {
              font-size: 4rem;
              color: var(--primary);
              position: absolute;
              top: -20px;
              left: 20px;
              opacity: 0.2;
            }

            .client-info {
              display: flex;
              align-items: center;
              gap: 1rem;
              margin-top: 1.5rem;
            }

            .client-photo {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              object-fit: cover;
            }

            .slide-in {
              opacity: 0;
              transform: translateX(-100px);
              animation: slideIn 1s forwards;
            }

            @keyframes slideIn {
              to {
                opacity: 1;
                transform: translateX(0);
              }
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
              color: var(--secondary);
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
              background: var(--gradient);
              color: white;
              border: none;
              border-radius: 8px;
              font-weight: 600;
              cursor: pointer;
              transition: var(--transition);
            }

            /* Responsive Design */
            @media (max-width: 768px) {
              .nav-links,
              .emergency-btn {
                display: none;
              }

              .mobile-menu {
                display: block;
              }

              .hero {
                grid-template-columns: 1fr;
                text-align: center;
                padding-top: 100px;
              }

              .glitch-text {
                font-size: 2.5rem;
              }

              .cta-group {
                justify-content: center;
              }

              .hero-visual {
                display: none;
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
