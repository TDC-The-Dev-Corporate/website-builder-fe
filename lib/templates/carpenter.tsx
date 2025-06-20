export const carpenterTemplate = {
  id: "carpenter-template",
  name: "Carpenter Portfolio",
  data: {
    pages: [
      {
        component: `
          <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap" rel="stylesheet">
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
                <a href="#contact" class="contact-me-btn">Contact Me</a>
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
            
            <!-- Modal (reused) -->
            <div class="image-modal" id="image-modal">
              <span class="modal-close">&times;</span>
              <img src="" alt="Full Image" class="modal-img" />
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
                  <a href="#contact" class="contact-me-btn">Contact Me</a>
                </div>
                <button class="mobile-menu-btn" data-action="open-drawer">☰</button>
              </nav>
            </header>
            
            <section id="home" class="hero">
              <div class="hero-content">
                <h1 class="slide-in">MASTER CARPENTRY & WOODWORKING</h1>
                <p class="fade-in">Crafting excellence in every piece, passionately bringing your unique vision to life.</p>
                <div class="cta-container">
                  <button class="cta-button primary" data-action="open-modal" data-modal-id="portfolio-modal-1">
                    View our work
                  </button>
                  <button class="cta-button secondary" data-action="open-modal" data-modal-id="quote-modal">
                    Get a Quote
                  </button>
                </div>
              </div>
              <div class="hero-overlay"></div>
            </section>

            <section id="services" class="services">
              <div class="services-header">
              <h2>FROM CONCEPT TO CREATION: OUR CARPENTRY SERVICES</h2>
              <p class="services-subtitle">Tailored Woodwork Solutions for Every Space</p>
              </div>
              <div class="service-grid">
                <!-- Card 1 -->
                <div class="service-card">
                  <img src="data:image/jpeg;base64,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" alt="Custom Furniture" class="service-image" />
                  <div class="service-text">
                    <h3>Custom Furniture</h3>
                    <p>Bespoke pieces tailored to your needs and style preferences</p>
                    <button class="service-link"
                    data-action="open-modal"
                    data-modal-id="service-modal-1">Explore More</button>
                  </div>
                </div>

                <!-- Card 2 -->
                <div class="service-card">
                  <img src="https://img.freepik.com/free-photo/3d-rendering-wooden-house_23-2151264473.jpg?semt=ais_items_boosted&w=740" alt="Home Renovation" class="service-image" />
                  <div class="service-text">
                    <h3>Home Renovation</h3>
                    <p>Complete woodwork solutions for your home improvement projects</p>
                    <button class="service-link"
                    data-action="open-modal"
                    data-modal-id="service-modal-2">Explore More</button>
                  </div>
                </div>

                <!-- Card 3 -->
                <div class="service-card">
                  <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRBIRB8MGt52D9By0Xnx-04Cr18-SVBY4I-aL41b5nUQUuLsYjY" alt="Restoration" class="service-image" />
                  <div class="service-text">
                    <h3>Restoration</h3>
                    <p>Expert restoration of antique and vintage wooden furniture</p>
                    <button class="service-link"
                    data-action="open-modal"
                    data-modal-id="service-modal-3">Explore More</button>
                  </div>
                </div>
              </div>
            </section>


            <!-- Portfolio Section -->
            <section id="portfolio" class="portfolio">
              <h2 class="portfolio-title">PORTFOLIO</h2>
              <p class="portfolio-subtitle">
                A Showcase of Custom Carpentry Projects Designed with Precision and Passion
              </p>

              <div class="portfolio-columns">
                <!-- Column 1 -->
                <div class="portfolio-col">
                  <img src="data:image/jpeg;base64,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"
                      alt="Custom Kitchen"
                      class="portfolio-image"
                      data-modal-id="modal-1" />
                  <img src="data:image/jpeg;base64,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"
                      alt="Dining Table"
                      class="portfolio-image"
                      data-modal-id="modal-2" />
                </div>

                <!-- Column 2 -->
                <div class="portfolio-col tall">
                  <img src="data:image/jpeg;base64,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"
                      alt="Built-in Shelving"
                      class="portfolio-image"
                      data-modal-id="modal-3" />
                </div>

                <!-- Column 3 -->
                <div class="portfolio-col">
                  <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSXLDVaIXO0hdfC51g-856dwavfV-sBz8TwUZVpDml0HYqaY8Wk"
                      alt="Staircase"
                      class="portfolio-image small"
                      data-modal-id="modal-4" />
                  <img src="https://img.freepik.com/free-photo/handcrafted-wooden-decorative-sculptures_23-2151002995.jpg?semt=ais_hybrid&w=740"
                      alt="Closet"
                      class="portfolio-image small"
                      data-modal-id="modal-5" />
                  <img src="https://img.freepik.com/free-photo/dry-twig-wooden-cabinet-white-room_53876-105824.jpg?semt=ais_hybrid&w=740"
                      alt="Office Cabinet"
                      class="portfolio-image small"
                      data-modal-id="modal-6" />
                </div>
              </div>
            </section>


           <section id="testimonials" class="testimonial-section">
            <h2 class="testimonial-title">WORDS THAT BUILD US UP</h2>
            <p class="testimonial-subtitle">Real Stories from Homeowners and Businesses Who Trusted Our Craftsmanship</p>

            <div class="testimonial-wrapper">
              <!-- Testimonial 1 -->
              <div class="testimonial-card">
                <img src="https://img.freepik.com/free-photo/portrait-confident-young-businessman-with-his-arms-crossed_23-2148176206.jpg" alt="James Walker" class="testimonial-img" />
                <div class="testimonial-text-block">
                  <p class="testimonial-quote">“ I couldn’t be happier with the craftsmanship and attention to detail. From custom shelves to a full kitchen remodel, everything was delivered exactly as promised — on time and with amazing quality. Highly recommended! ”</p>
                  <p class="testimonial-author"><em>James Walker, Austin, TX</em></p>
                </div>
              </div>

              <!-- Testimonial 2 -->
              <div class="testimonial-card">
                <img src="data:image/jpeg;base64,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" alt="Emil Carter" class="testimonial-img" />
                <div class="testimonial-text-block">
                  <p class="testimonial-quote">“ Exceptional work from start to finish. The custom cabinetry they built for my home office is both functional and beautiful. It’s rare to find such professionalism and precision these days. "</p>
                  <p class="testimonial-author"><em>Emil Carter, San Diego, CA</em></p>
                </div>
              </div>
            </div>
          </section>



           <section id="contact" class="contact">
            <h2 class="contact-title">GET IN TOUCH</h2>
            <p class="contact-subtitle">We’d love to hear from you – whether it's a new project, feedback, or just to say hello.</p>

            <div class="contact-container">
              <div class="contact-info">
                <h3>Contact Information</h3>
                <p>📍 123 Woodcraft Lane</p>
                <p>📞 (555) 123-4567</p>
                <p>✉️ info@craftsmanwoodworks.com</p>
              </div>
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

           .contact-me-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 135px;
            height: 43px;
            padding: 12px 24px;
            gap: 10px;
            border-radius: 10px;
            background-color: #481E10;
            color: white !important;
            font-family: 'Raleway', sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: 100%;
            text-decoration: none;
            cursor: pointer;
            transition: background-color 0.3s ease;
            vertical-align: middle;
          }

          .contact-me-btn:hover {
            background-color: #32150B; 
            color: white; 
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

            /* Apply globally to both nav and drawer */
            .logo {
              font-family: 'Raleway', sans-serif;
              font-weight: 700;
              font-size: 20px;
              line-height: 100%;
              letter-spacing: 0;
              vertical-align: middle;
            }

            .nav-links a,
            .drawer-links a {
              font-family: 'Raleway', sans-serif;
              font-weight: 400;
              font-size: 16px;
              line-height: 100%;
              letter-spacing: 0;
              vertical-align: middle;
              margin-left: 2rem;
              text-decoration: none;
              color: var(--text-color);
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
              height: 599px;
              background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
                          url('https://img.freepik.com/free-photo/details-classic-oak-furniture-closeup-old-sofa-classic-office-interior-design-concept-space-text_166373-2661.jpg') center/cover no-repeat;
              display: flex;
              align-items: center;
              justify-content: flex-start; /* Align left */
              color: white;
              position: relative;
              text-align: left;
              padding-left: 5%;
            }

            .hero-content {
              max-width: 800px;
              padding: 2rem;
              position: relative;
              z-index: 2;
            }

            .hero h1 {
              font-family: 'Raleway', sans-serif;
              font-weight: 400;
              font-size: 64px;
              text-transform: uppercase;
              line-height: 129%;
              margin-bottom: 1rem;
              color: #FFFFFF;
              opacity: 0;
              animation: slideIn 1s forwards;
            }

            .hero p {
              font-family: 'Inter', sans-serif;
              font-weight: 300;
              font-size: 20px;
              line-height: 129%;
              margin-bottom: 2rem;
              max-width: 764px;
              color: #FFFFFF;
              opacity: 0;
              animation: fadeIn 1s 0.5s forwards;
            }

            .cta-container {
              display: flex;
              gap: 1rem;
              opacity: 0;
              animation: fadeIn 1s 1s forwards;
            }

            .cta-button {
              padding: 12px 24px;
              font-size: 16px;
              border: none;
              border-radius: 10px;
              cursor: pointer;
              font-family: 'Raleway', sans-serif;
              font-weight: 400;
              line-height: 100%;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              height: 43px;
            }

            .cta-button.primary {
              background-color: #FFFFFF;
              color: #481E10;
            }

            .cta-button.secondary {
              background-color: rgba(255, 255, 255, 0.2);
              color: #FFFFFF;
            }

            .cta-button:hover {
              transform: translateY(-3px);
              box-shadow: 0 5px 15px rgba(0,0,0,0.2);
              transition: all 0.3s ease;
            }

            /* Optional: responsive tweak for mobile */
            @media (max-width: 768px) {
              .hero {
                padding-left: 1.5rem;
                align-items: flex-start;
              }

              .hero h1 {
                font-size: 42px;
              }

              .hero p {
                font-size: 16px;
              }

              .cta-container {
                flex-direction: column;
                align-items: flex-start;
              }
            }

            /* Services Section */
            .services {
              padding: 6rem 7%;
            }

            .services-header {
              max-width: 930px;
              margin-bottom: 4rem;
            }

            .services-header h2 {
              font-family: 'Raleway', sans-serif;
              font-weight: 400;
              font-size: 48px;
              line-height: 137%;
              text-transform: uppercase;
              color: #481E10;
              margin-bottom: 1rem;
            }

            .services-header p {
              font-family: 'Inter', sans-serif;
              font-weight: 300;
              font-size: 20px;
              line-height: 129%;
              color: #000000;
              max-width: 424px;
            }

            .service-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 2rem;
              max-width: 1400px;
              margin: 0 auto;
            }

            .service-card {
              background: #fff;
              border: 1px solid #EBEBEB;
              border-radius: 20px;
              padding: 0 0 2rem 0;
              text-align: left;
              transition: var(--transition);
              overflow: hidden;
            }

            .service-image {
              width: 100%;
              height: 235px;
              object-fit: cover;
              border-top-left-radius: 20px;
              border-top-right-radius: 20px;
            }

            .service-card h3 {
              font-family: 'Raleway', sans-serif;
              font-weight: 700;
              font-size: 20px;
              line-height: 137%;
              text-transform: uppercase;
              color: #481E10;
              margin: 24px;
              margin-bottom: 0.5rem;
            }

            .service-card p {
              font-family: 'Inter', sans-serif;
              font-weight: 300;
              font-size: 20px;
              line-height: 129%;
              color: #000000;
              margin: 0 24px 1.5rem 24px;
            }

            .service-link {
              display: inline-block;
              margin: 0 24px;
              padding: 12px 24px;
              font-family: 'Raleway', sans-serif;
              font-weight: 400;
              font-size: 16px;
              line-height: 100%;
              color: #481E10;
              background: none;
              border: 1px solid #481E10;
              border-radius: 10px;
              cursor: pointer;
              transition: var(--transition);
            }

            .service-link:hover {
              background-color: #f6f3f2;
            }

            @media screen and (max-width: 768px) {
              .services-header h2 {
                font-size: 36px;
              }

              .services-header p {
                font-size: 18px;
              }

              .service-card p {
                font-size: 18px;
              }
            }

            /* Portfolio Section */
            .portfolio {
              padding: 4rem 5%;
              background: white;
              text-align: center;
            }

            .portfolio-title {
              font-family: Raleway, sans-serif;
              font-size: 48px;
              font-weight: 400;
              text-transform: uppercase;
              color: #481E10;
              line-height: 137%;
              margin-bottom: 1rem;
            }

            .portfolio-subtitle {
              font-family: Inter, sans-serif;
              font-size: 20px;
              font-weight: 300;
              color: #000;
              line-height: 129%;
              max-width: 746px;
              margin: 0 auto 3rem;
            }

            /* Update the portfolio-columns styles */
          .portfolio-columns {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            max-width: 1440px;
            margin: 0 auto;
            align-items: start; /* Changed from stretch to start */
          }

          .portfolio-col {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            height: auto; /* Remove fixed height */
          }

          .portfolio-image {
            width: 100%;
            height: auto;
            border: 1px solid #EBEBEB;
            border-radius: 20px;
            object-fit: cover;
            cursor: pointer;
          }

          /* Make the middle column image taller */
          .portfolio-col.tall .portfolio-image {
            height: 678px; /* Match the original column height */
          }

          /* Make the small images in the third column shorter */
          .portfolio-image.small {
            height: 217px;
          }

            /* Modal styles */
            .image-modal {
              display: none;
              position: fixed;
              z-index: 999;
              inset: 0;
              background-color: rgba(0, 0, 0, 0.75);
              justify-content: center;
              align-items: center;
            }

            .image-modal.active {
              display: flex;
            }

            .modal-img {
              max-width: 90%;
              max-height: 90%;
              border-radius: 10px;
              box-shadow: 0 0 20px #000;
            }

            .modal-close {
              position: absolute;
              top: 2rem;
              right: 2rem;
              font-size: 2rem;
              color: white;
              cursor: pointer;
            }

            /* Responsive */
            @media (max-width: 1024px) {
            .portfolio-columns {
              grid-template-columns: 1fr;
            }

            .portfolio-col {
              flex-direction: row;
              flex-wrap: wrap;
              height: auto;
              justify-content: center;
            }

            .portfolio-image,
            .portfolio-image.small,
            .portfolio-image.tall {
              max-width: 90vw;
              height: auto;
            }
          }

            /* Testimonials Section */
            .testimonial-section {
              padding: 4rem 5rem;
              background-color: white;
            }

            .testimonial-title {
              font-family: 'Raleway', sans-serif;
              font-size: 48px;
              font-weight: 400;
              color: #481E10;
              text-transform: uppercase;
              margin-bottom: 1rem;
            }

            .testimonial-subtitle {
              font-family: 'Inter', sans-serif;
              font-weight: 300;
              font-size: 20px;
              color: #000;
              margin-bottom: 3rem;
            }

            .testimonial-wrapper {
              display: flex;
              justify-content: center;
              gap: 2rem;
              flex-wrap: wrap;
            }

            .testimonial-card {
              background-color: #F5F1EE;
              border-radius: 20px;
              display: flex;
              max-width: 600px;
              width: 100%;
              overflow: hidden;
              text-align: left;
              flex: 1 1 45%;
            }

            .testimonial-img {
              width: 40%;
              object-fit: cover;
              height: 100%;
            }

            .testimonial-text-block {
              padding: 4rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }

            .testimonial-quote {
              font-family: 'Inter', sans-serif;
              font-size: 18px;
              font-weight: 300;
              line-height: 1.5;
              color: #000;
              margin-bottom: 1rem;
            }

            .testimonial-author {
              font-family: 'Inter', sans-serif;
              font-size: 16px;
              color: #000;
            }

            .testimonial-arrows {
              margin-top: 2rem;
              display: flex;
              justify-content: center;
              gap: 1rem;
            }

            .arrow-btn {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              border: none;
              font-size: 20px;
              cursor: pointer;
              background-color: #eee;
            }

            .arrow-btn.filled {
              background-color: #481E10;
              color: white;
            }

            /* Responsive */
            @media (max-width: 768px) {
              .testimonial-card {
                flex-direction: column;
                text-align: center;
              }

              .testimonial-img {
                width: 100%;
                height: auto;
              }

              .testimonial-text-block {
                padding: 1.5rem;
              }
            }

            /* Contact Section */
           .contact {
              padding: 6rem 5%;
              background: white;
            }

            .contact-title {
              font-family: 'Raleway', sans-serif;
              font-size: 48px;
              font-weight: 400;
              color: #481E10;
              text-transform: uppercase;
              margin-bottom: 1rem;
            }

            .contact-subtitle {
              font-family: 'Inter', sans-serif;
              font-weight: 300;
              font-size: 20px;
              color: #000;
              margin-bottom: 3rem;
            }

            .contact-container {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 4rem;
              max-width: 1200px;
              text-align: left;
            }

            .contact-info h3 {
              font-family: 'Raleway', sans-serif;
              font-size: 24px;
              color: #481E10;
              margin-bottom: 1.5rem;
            }

            .contact-info p {
              font-family: 'Inter', sans-serif;
              font-size: 16px;
              margin-bottom: 1rem;
              color: #000;
            }

            /* Responsive spacing */
            @media (max-width: 768px) {
              .contact {
                padding: 4rem 2rem;
              }

              .contact-container {
                gap: 2rem;
              }
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
