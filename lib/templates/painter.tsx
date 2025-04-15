export const painterTemplate = {
  id: "painter-template",
  name: "Artistic Painter Portfolio",
  data: {
    pages: [
      {
        component: `
            <div class="site-wrapper">
              <!-- Animated Canvas Background -->
              <canvas id="paint-canvas" class="paint-canvas"></canvas>
  
              <!-- Floating Navigation Drawer -->
              <div class="nav-drawer">
                <div class="drawer-handle">
                  <div class="handle-line"></div>
                  <div class="handle-line"></div>
                  <div class="handle-line"></div>
                </div>
                <nav class="drawer-content">
                  <div class="drawer-header">
                    <div class="artist-profile">
                      <div class="artist-avatar">
                        <img src="https://images.unsplash.com/photo-1584184924103-e310d9dc82fc?auto=format&fit=crop&q=80&w=200" alt="Artist" />
                      </div>
                      <h3 class="artist-name">Vincent Walker</h3>
                      <p class="artist-title">Contemporary Artist</p>
                    </div>
                  </div>
                  <ul class="drawer-menu">
                    <li><a href="#home" class="menu-item active"><span class="menu-icon">🎨</span>Home</a></li>
                    <li><a href="#gallery" class="menu-item"><span class="menu-icon">🖼️</span>Gallery</a></li>
                    <li><a href="#services" class="menu-item"><span class="menu-icon">🎯</span>Services</a></li>
                    <li><a href="#process" class="menu-item"><span class="menu-icon">⚡</span>Process</a></li>
                    <li><a href="#testimonials" class="menu-item"><span class="menu-icon">💫</span>Reviews</a></li>
                    <li><a href="#contact" class="menu-item"><span class="menu-icon">📧</span>Contact</a></li>
                  </ul>
                  <div class="social-links">
                    <a href="#" class="social-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                    <a href="#" class="social-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="#" class="social-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                    </a>
                  </div>
                </nav>
              </div>
  
              <!-- Main Content -->
              <main class="main-content">
                <!-- Hero Section -->
                <section id="home" class="hero-section">
                  <div class="hero-content">
                    <h1 class="hero-title">
                      <span class="paint-stroke">Transforming</span>
                      <span class="space-text">Spaces</span>
                      <span class="into-text">into</span>
                      <span class="art-text">Art</span>
                    </h1>
                    <p class="hero-subtitle">Professional Painting & Artistic Solutions</p>
                    <div class="cta-container">
                      <button class="primary-cta">View Gallery</button>
                      <button class="secondary-cta">Get Quote</button>
                    </div>
                  </div>
                  <div class="hero-image">
                    <div class="floating-paint-1"></div>
                    <div class="floating-paint-2"></div>
                    <div class="floating-paint-3"></div>
                    <img src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=1200" alt="Painting Process" class="main-image" />
                  </div>
                </section>
  
                <!-- Gallery Section -->
                <section id="gallery" class="gallery-section">
                  <h2 class="section-title">Featured Works</h2>
                  <div class="gallery-grid">
                    <div class="gallery-item large">
                      <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1200" alt="Modern Interior" />
                      <div class="item-overlay">
                        <h3>Modern Minimalism</h3>
                        <p>Interior Design Project</p>
                      </div>
                    </div>
                    <div class="gallery-item">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQja9b6siKcn1esVT0OGyQBEWlU1Xuoi7xFzA&s" alt="Exterior Design" />
                      <div class="item-overlay">
                        <h3>Urban Facade</h3>
                        <p>Exterior Renovation</p>
                      </div>
                    </div>
                    <div class="gallery-item">
                      <img src="https://images.unsplash.com/photo-1574182245530-967d9b3831af?auto=format&fit=crop&q=80&w=800" alt="Color Study" />
                      <div class="item-overlay">
                        <h3>Color Study</h3>
                        <p>Residential Project</p>
                      </div>
                    </div>
                    <div class="gallery-item">
                      <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D" alt="Artistic Wall" />
                      <div class="item-overlay">
                        <h3>Abstract Wall</h3>
                        <p>Commercial Space</p>
                      </div>
                    </div>
                  </div>
                </section>
  
                <!-- Services Section -->
                <section id="services" class="services-section">
                  <h2 class="section-title">Our Services</h2>
                  <div class="services-grid">
                    <div class="service-card">
                      <div class="service-icon">🏠</div>
                      <h3>Interior Painting</h3>
                      <p>Transform your living spaces with our expert interior painting services.</p>
                      <ul class="service-features">
                        <li>Color Consultation</li>
                        <li>Wall Preparation</li>
                        <li>Premium Finishes</li>
                        <li>Texture Applications</li>
                      </ul>
                    </div>
                    <div class="service-card">
                      <div class="service-icon">🏢</div>
                      <h3>Exterior Painting</h3>
                      <p>Protect and beautify your property's exterior with lasting results.</p>
                      <ul class="service-features">
                        <li>Weather Protection</li>
                        <li>Surface Repair</li>
                        <li>Color Matching</li>
                        <li>Quality Materials</li>
                      </ul>
                    </div>
                    <div class="service-card">
                      <div class="service-icon">🎨</div>
                      <h3>Custom Murals</h3>
                      <p>Create unique artistic statements with custom wall murals.</p>
                      <ul class="service-features">
                        <li>Design Consultation</li>
                        <li>Sketch Approval</li>
                        <li>Professional Execution</li>
                        <li>Protective Coating</li>
                      </ul>
                    </div>
                  </div>
                </section>
  
                <!-- Process Section -->
                <section id="process" class="process-section">
                  <h2 class="section-title">Our Process</h2>
                  <div class="process-timeline">
                    <div class="timeline-item">
                      <div class="timeline-number">01</div>
                      <h3>Consultation</h3>
                      <p>Initial meeting to discuss your vision and requirements</p>
                    </div>
                    <div class="timeline-item">
                      <div class="timeline-number">02</div>
                      <h3>Planning</h3>
                      <p>Detailed project planning and color selection</p>
                    </div>
                    <div class="timeline-item">
                      <div class="timeline-number">03</div>
                      <h3>Preparation</h3>
                      <p>Surface preparation and protection of surrounding areas</p>
                    </div>
                    <div class="timeline-item">
                      <div class="timeline-number">04</div>
                      <h3>Execution</h3>
                      <p>Professional painting with attention to detail</p>
                    </div>
                  </div>
                </section>
  
                <!-- Testimonials Section -->
                <section id="testimonials" class="testimonials-section">
                  <div class="testimonial-card slide-in">
                    <div class="quote">❝</div>
                    <p>Exceptional service! The team was professional and completed the work ahead of schedule.</p>
                    <div class="client-info">
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="John" class="client-photo" />
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
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Sarah" class="client-photo" />
                      <div>
                        <h4>Sarah Johnson</h4>
                        <span>Business Owner</span>
                      </div>
                    </div>
                  </div>
                </section>
  
                <!-- Contact Section -->
                <section id="contact" class="contact-section">
                  <div class="contact-container">
                    <div class="contact-info">
                      <h2>Get in Touch</h2>
                      <p>Let's discuss your next project</p>
                      <div class="contact-details">
                        <div class="contact-item">
                          <span class="contact-icon">📞</span>
                          <div>
                            <h3>Phone</h3>
                            <p>(555) 123-4567</p>
                          </div>
                        </div>
                        <div class="contact-item">
                          <span class="contact-icon">📧</span>
                          <div>
                            <h3>Email</h3>
                            <p>hello@vincentwalker.art</p>
                          </div>
                        </div>
                        <div class="contact-item">
                          <span class="contact-icon">📍</span>
                          <div>
                            <h3>Studio</h3>
                            <p>123 Art Street, Creative District</p>
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
                          <option value="interior">Interior Painting</option>
                          <option value="exterior">Exterior Painting</option>
                          <option value="mural">Custom Mural</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <textarea placeholder="Project Details" required></textarea>
                      </div>
                      <button type="submit" class="submit-btn">Send Message</button>
                    </form>
                  </div>
                </section>
              </main>
            </div>
  
            <script>
              // Canvas Animation
              window.addEventListener('load', function() {
                const canvas = document.getElementById('paint-canvas');
                const ctx = canvas.getContext('2d');
  
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
  
                function createPaintSplatter(x, y) {
                  ctx.beginPath();
                  ctx.arc(x, y, Math.random() * 20 + 10, 0, Math.PI * 2);
                  ctx.fillStyle = ['#FF6B6B', '#4ECDC4', '#FFE66D'][Math.floor(Math.random() * 3)];
                  ctx.globalAlpha = 0.1;
                  ctx.fill();
                }
  
                for (let i = 0; i < 50; i++) {
                  createPaintSplatter(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height
                  );
                }
  
                // Menu Item Click Handling
                document.querySelectorAll('.menu-item').forEach(item => {
                  item.addEventListener('click', (e) => {
                    document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    
                    const targetId = item.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                      e.preventDefault();
                      targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  });
                });
              });
            </script>
  
            <style>
              /* Base Styles */
              :root {
                --primary: #FF6B6B;
                --secondary: #4ECDC4;
                --accent: #FFE66D;
                --dark: #2C3E50;
                --light: #F7F9FC;
                --text: #333;
                --gradient: linear-gradient(135deg, var(--primary), var(--secondary));
                --shadow: 0 10px 30px rgba(0,0,0,0.1);
                --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              }
  
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
  
              body {
                font-family: 'Poppins', sans-serif;
                color: var(--text);
                background: var(--light);
                overflow-x: hidden;
              }
  
              /* Canvas Background */
              .paint-canvas {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
                opacity: 0.1;
              }
  
              /* Navigation Drawer */
              .nav-drawer {
                position: fixed;
                left: 0;
                top: 0;
                height: 100vh;
                z-index: 1000;
                transform: translateX(-280px);
                transition: var(--transition);
              }
  
              .nav-drawer:hover,
              .nav-drawer:focus-within {
                transform: translateX(0);
              }
  
              .drawer-handle {
                position: absolute;
                right: -40px;
                top: 50%;
                transform: translateY(-50%);
                width: 40px;
                height: 60px;
                background: var(--primary);
                border-radius: 0 10px 10px 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 4px;
                cursor: pointer;
              }
  
              .handle-line {
                width: 20px;
                height: 2px;
                background: white;
                transition: var(--transition);
              }
  
              .drawer-content {
                width: 280px;
                height: 100%;
                background: white;
                padding: 2rem;
                box-shadow: var(--shadow);
              }
  
              .artist-profile {
                text-align: center;
                margin-bottom: 2rem;
              }
  
              .artist-avatar {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                overflow: hidden;
                margin: 0 auto 1rem;
                border: 3px solid var(--primary);
              }
  
              .artist-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
  
              .drawer-menu {
                list-style: none;
                margin-bottom: 2rem;
              }
  
              .menu-item {
                display: flex;
                align-items: center;
                padding: 0.75rem 1rem;
                color: var(--text);
                text-decoration: none;
                border-radius: 8px;
                transition: var(--transition);
                margin-bottom: 0.5rem;
              }
  
              .menu-item:hover,
              .menu-item.active {
                background: var(--gradient);
                color: white;
              }
  
              .menu-icon {
                margin-right: 1rem;
              }
  
              .social-links {
                display: flex;
                justify-content: center;
                gap: 1rem;
              }
  
              .social-icon {
                color: var(--text);
                transition: var(--transition);
              }
  
              .social-icon:hover {
                color: var(--primary);
                transform: scale(1.1);
              }
  
              /* Main Content */
              .main-content {
                margin-left: 0;
                padding: 2rem;
              }
  
              /* Hero Section */
              .hero-section {
                min-height: 100vh;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 4rem;
                align-items: center;
                padding: 4rem 0;
              }
  
              .hero-title {
                font-size: 4rem;
                line-height: 1.2;
                margin-bottom: 1.5rem;
              }
  
              .paint-stroke {
                background: var(--gradient);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                display: block;
              }
  
              .space-text {
                font-size: 5rem;
                color: var(--dark);
                display: block;
              }
  
              .into-text {
                font-size: 3rem;
                color: var(--secondary);
                display: block;
              }
  
              .art-text {
                font-size: 6rem;
                background: var(--gradient);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                display: block;
              }
  
              .hero-subtitle {
                font-size: 1.25rem;
                margin-bottom: 2rem;
                color: var(--text);
              }
  
              .cta-container {
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
  
              .secondary-cta {
                background: transparent;
                border: 2px solid var(--primary);
                color: var(--primary);
              }
  
              .hero-image {
                position: relative;
              }
  
              .main-image {
                width: 100%;
                border-radius: 20px;
                box-shadow: var(--shadow);
              }
  
              .floating-paint-1,
              .floating-paint-2,
              .floating-paint-3 {
                position: absolute;
                border-radius: 50%;
                filter: blur(20px);
                animation: float 6s infinite alternate;
              }
  
              .floating-paint-1 {
                width: 100px;
                height: 100px;
                background: var(--primary);
                top: -20px;
                left: -20px;
              }
  
              .floating-paint-2 {
                width: 150px;
                height: 150px;
                background: var(--secondary);
                bottom: 40px;
                right: -40px;
                animation-delay: 2s;
              }
  
              .floating-paint-3 {
                width: 80px;
                height: 80px;
                background: var(--accent);
                top: 40%;
                left: -30px;
                animation-delay: 4s;
              }
  
              @keyframes float {
                0% {
                  transform: translate(0, 0) rotate(0deg);
                }
                100% {
                  transform: translate(20px, 20px) rotate(360deg);
                }
              }
  
              /* Gallery Section */
              .gallery-section {
                padding: 6rem 0;
              }
  
              .section-title {
                font-size: 2.5rem;
                text-align: center;
                margin-bottom: 3rem;
                color: var(--dark);
              }
  
              .gallery-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 2rem;
              }
  
              .gallery-item {
                position: relative;
                overflow: hidden;
                border-radius: 15px;
                cursor: pointer;
              }
  
              .gallery-item.large {
                grid-column: span 2;
                grid-row: span 2;
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
                color: white;
                transition: var(--transition);
              }
  
              .gallery-item:hover .item-overlay {
                bottom: 0;
              }
  
              .gallery-item:hover img {
                transform: scale(1.1);
              }
  
              /* Services Section */
              .services-section {
                padding: 6rem 0;
                background: white;
              }
  
              .services-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
              }
  
              .service-card {
                padding: 2rem;
                border-radius: 15px;
                background: var(--light);
                box-shadow: var(--shadow);
                transition: var(--transition);
              }
  
              .service-card:hover {
                transform: translateY(-10px);
              }
  
              .service-icon {
                font-size: 2.5rem;
                margin-bottom: 1rem;
              }
  
              .service-features {
                list-style: none;
                margin-top: 1rem;
              }
  
              .service-features li {
                padding: 0.5rem 0;
                border-bottom: 1px solid rgba(0,0,0,0.1);
              }
  
              /* Process Section */
              .process-section {
                padding: 6rem 0;
              }
  
              .process-timeline {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 2rem;
                position: relative;
              }
  
              .timeline-item {
                text-align: center;
                padding: 2rem;
                background: white;
                border-radius: 15px;
                box-shadow: var(--shadow);
                position: relative;
              }
  
              .timeline-number {
                width: 60px;
                height: 60px;
                background: var(--gradient);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                font-weight: bold;
                margin: 0 auto 1rem;
              }
  
              /* Testimonials Section */
              .testimonials-section {
                padding: 6rem 0;
                background: var(--light);
              }
  
              .testimonial-card {
                background: white;
                padding: 2rem;
                border-radius: 15px;
                box-shadow: var(--shadow);
                margin-bottom: 2rem;
                position: relative;
              }
  
              .quote {
                font-size: 3rem;
                color: var(--primary);
                position: absolute;
                top: -1rem;
                left: 2rem;
              }
  
              .client-info {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-top: 1.5rem;
              }
  
              .client-photo {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                object-fit: cover;
              }
  
              /* Contact Section */
              .contact-section {
                padding: 6rem 0;
                background: white;
              }
  
              .contact-container {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 4rem;
              }
  
              .contact-details {
                margin-top: 2rem;
              }
  
              .contact-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1.5rem;
              }
  
              .contact-icon {
                font-size: 1.5rem;
              }
  
              .contact-form {
                background: var(--light);
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
                border: 1px solid rgba(0,0,0,0.1);
                border-radius: 8px;
                font-family: inherit;
                transition: var(--transition);
              }
  
              .form-group input:focus,
              .form-group select:focus,
              .form-group textarea:focus {
                outline: none;
                border-color: var(--primary);
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
  
              .submit-btn:hover {
                transform: translateY(-2px);
                box-shadow: var(--shadow);
              }
  
              /* Responsive Design */
              @media (max-width: 1024px) {
                .hero-section {
                  grid-template-columns: 1fr;
                  text-align: center;
                }
  
                .hero-title {
                  font-size: 3rem;
                }
  
                .space-text {
                  font-size: 4rem;
                }
  
                .art-text {
                  font-size: 5rem;
                }
  
                .cta-container {
                  justify-content: center;
                }
  
                .gallery-grid {
                  grid-template-columns: repeat(2, 1fr);
                }
  
                .contact-container {
                  grid-template-columns: 1fr;
                }
              }
  
              @media (max-width: 768px) {
                .gallery-grid {
                  grid-template-columns: 1fr;
                }
  
                .gallery-item.large {
                  grid-column: auto;
                  grid-row: auto;
                }
  
                .process-timeline {
                  grid-template-columns: 1fr;
                }
              }
            </style>
          `,
      },
    ],
  },
};
