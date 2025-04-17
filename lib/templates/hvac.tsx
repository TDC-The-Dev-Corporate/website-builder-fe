// export const hvacTemplate = {
//   id: "hvac-template",
//   name: "HVAC Services",
//   data: {
//     pages: [
//       {
//         component: `
//           <div class="site-wrapper">
//             <header class="header">
//               <nav class="navbar">
//                 <div class="nav-brand">
//                   <span class="temp-icon">❄️</span>
//                   <span class="brand-text">ClimateControl Pro</span>
//                 </div>
//                 <div class="nav-menu">
//                   <a href="#home">Home</a>
//                   <a href="#services">Services</a>
//                   <a href="#why-us">Why Us</a>
//                   <a href="#pricing">Pricing</a>
//                   <a href="#contact" class="nav-cta">Emergency Service</a>
//                 </div>
//                 <button class="mobile-toggle">☰</button>
//               </nav>
//             </header>

//             <section id="home" class="hero">
//               <div class="hero-content">
//                 <h1 class="animate-fade-up">Expert HVAC Solutions</h1>
//                 <p class="animate-fade-up-delay-1">24/7 Heating, Ventilation & Air Conditioning Services</p>
//                 <div class="hero-features animate-fade-up-delay-3">
//                   <div class="feature">
//                     <span class="feature-icon">⚡</span>
//                     <span>24/7 Emergency Service</span>
//                   </div>
//                   <div class="feature">
//                     <span class="feature-icon">🛠️</span>
//                     <span>Licensed Technicians</span>
//                   </div>
//                   <div class="feature">
//                     <span class="feature-icon">💰</span>
//                     <span>Competitive Pricing</span>
//                   </div>
//                 </div>
//               </div>
//               <div class="hero-image animate-slide-in"></div>
//             </section>

//             <div class="service-card animate-fade-up">
//               <div class="card-icon">❄️</div>
//               <h3>AC Installation & Repair</h3>
//               <p>Expert installation and maintenance of all AC brands</p>
//               <ul class="service-features">
//                 <li>New System Installation</li>
//                 <li>Emergency Repairs</li>
//                 <li>Regular Maintenance</li>
//                 <li>Energy Efficiency Upgrades</li>
//               </ul>
//               <button onclick="showServiceDetails('ac')" class="card-cta">Learn More →</button>
//             </div>

//             <div class="service-card animate-fade-up">
//                   <div class="card-icon">🔥</div>
//                   <h3>Heating Systems</h3>
//                   <p>Complete heating solutions for your comfort</p>
//                   <ul class="service-features">
//                     <li>Furnace Installation</li>
//                     <li>Heat Pump Services</li>
//                     <li>Boiler Maintenance</li>
//                     <li>Heating Repairs</li>
//                   </ul>
//                   <button onclick="showServiceDetails('ac')" class="card-cta">Learn More →</button>
//                 </div>
//                 <div class="service-card animate-fade-up">
//                   <div class="card-icon">🌪️</div>
//                   <h3>Ventilation</h3>
//                   <p>Improve your indoor air quality</p>
//                   <ul class="service-features">
//                     <li>Duct Cleaning</li>
//                     <li>Air Filter Replacement</li>
//                     <li>Ventilation Installation</li>
//                     <li>Air Quality Testing</li>
//                   </ul>
//                   <button onclick="showServiceDetails('ac')" class="card-cta">Learn More →</button>
//                 </div>

//           </div>

//           <!-- Service Details Modal -->
//           <div id="serviceModal" class="modal">
//             <div class="modal-content">
//               <span class="close-modal" onclick="closeModal('serviceModal')">&times;</span>
//               <div id="serviceDetails"></div>
//             </div>
//           </div>

//           <!-- Success Modal -->
//           <div id="successModal" class="modal">
//             <div class="modal-content">
//               <span class="close-modal" onclick="closeModal('successModal')">&times;</span>
//               <h3>Thank You!</h3>
//               <p>Your message has been sent successfully. We'll get back to you soon.</p>
//             </div>
//           </div>

//           <script>
//             // Service details content
//             const serviceInfo = {
//               ac: {
//                 title: "AC Installation & Repair",
//                 description: "Our comprehensive AC services include:",
//                 details: [
//                   "Professional installation of new AC systems",
//                   "24/7 emergency repair service",
//                   "Regular maintenance and tune-ups",
//                   "Energy efficiency assessments",
//                   "Filter replacement and cleaning",
//                   "Ductwork inspection and repair",
//                   "Smart thermostat installation",
//                   "Freon level check and refill"
//                 ],
//                 pricing: "Starting from $89 for basic service"
//               },
//               heating: {
//                 title: "Heating Systems",
//                 description: "Complete heating solutions including:",
//                 details: [
//                   "Furnace installation and replacement",
//                   "Heat pump repairs and maintenance",
//                   "Boiler services",
//                   "Emergency heating repair",
//                   "Annual heating system tune-ups",
//                   "Thermostat programming",
//                   "Energy efficiency upgrades",
//                   "Safety inspections"
//                 ],
//                 pricing: "Starting from $99 for basic service"
//               },
//               ventilation: {
//                 title: "Ventilation Services",
//                 description: "Comprehensive ventilation solutions:",
//                 details: [
//                   "Air duct cleaning and sanitization",
//                   "Ventilation system installation",
//                   "Air quality testing",
//                   "Filter replacement services",
//                   "Exhaust fan installation",
//                   "Ductwork design and installation",
//                   "Ventilation system maintenance",
//                   "Indoor air quality solutions"
//                 ],
//                 pricing: "Starting from $79 for basic service"
//               }
//             };

//             // Modal functionality
//             function showServiceDetails(service) {
//               const modal = document.getElementById('serviceModal');
//               const details = document.getElementById('serviceDetails');
//               const info = serviceInfo[service];

//               details.innerHTML = \`
//                 <h2>\${info.title}</h2>
//                 <p class="service-description">\${info.description}</p>
//                 <ul class="detailed-features">
//                   \${info.details.map(detail => \`<li>\${detail}</li>\`).join('')}
//                 </ul>
//                 <p class="service-pricing">\${info.pricing}</p>
//                 <button onclick="scrollToContact()" class="modal-cta">Schedule Service</button>
//               \`;

//               modal.style.display = 'block';
//             }

//             function closeModal(modalId) {
//               document.getElementById(modalId).style.display = 'none';
//             }

//             function scrollToContact() {
//               closeModal('serviceModal');
//               document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
//             }

//             // Form submission handling
//             document.querySelector('.contact-form').addEventListener('submit', async (e) => {
//               e.preventDefault();

//               const formData = {
//                 name: e.target.querySelector('input[type="text"]').value,
//                 email: e.target.querySelector('input[type="email"]').value,
//                 service: e.target.querySelector('select').value,
//                 message: e.target.querySelector('textarea').value
//               };

//               try {
//                 // Here you would typically send this to your backend
//                 // For demo purposes, we'll just show the success modal
//                 document.getElementById('successModal').style.display = 'block';
//                 e.target.reset();
//               } catch (error) {
//                 console.error('Error sending message:', error);
//                 alert('There was an error sending your message. Please try again.');
//               }
//             });

//             // Close modals when clicking outside
//             window.onclick = (event) => {
//               if (event.target.classList.contains('modal')) {
//                 event.target.style.display = 'none';
//               }
//             };
//           </script>

//           <style>
//              /* Base Styles */
//             :root {
//               --primary: #2563eb;
//               --primary-dark: #1d4ed8;
//               --secondary: #0ea5e9;
//               --accent: #f97316;
//               --background: #f8fafc;
//               --text: #1e293b;
//               --light: #ffffff;
//               --dark: #0f172a;
//               --gray: #64748b;
//               --border: #e2e8f0;
//               --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
//               --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
//               --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//             }

//             * {
//               margin: 0;
//               padding: 0;
//               box-sizing: border-box;
//             }

//             html {
//               scroll-behavior: smooth;
//               scroll-padding-top: 80px;
//             }

//             body {
//               font-family: 'Inter', system-ui, -apple-system, sans-serif;
//               line-height: 1.6;
//               color: var(--text);
//               background: var(--background);
//             }

//             /* Animations */
//             .animate-fade-up {
//               opacity: 0;
//               transform: translateY(30px);
//               animation: fadeUp 0.6s ease forwards;
//             }

//             .animate-fade-up-delay-1 {
//               opacity: 0;
//               transform: translateY(30px);
//               animation: fadeUp 0.6s ease 0.2s forwards;
//             }

//             .animate-fade-up-delay-2 {
//               opacity: 0;
//               transform: translateY(30px);
//               animation: fadeUp 0.6s ease 0.4s forwards;
//             }

//             .animate-fade-up-delay-3 {
//               opacity: 0;
//               transform: translateY(30px);
//               animation: fadeUp 0.6s ease 0.6s forwards;
//             }

//             .animate-slide-in {
//               opacity: 0;
//               transform: translateX(50px);
//               animation: slideIn 0.8s ease 0.6s forwards;
//             }

//             @keyframes fadeUp {
//               from {
//                 opacity: 0;
//                 transform: translateY(30px);
//               }
//               to {
//                 opacity: 1;
//                 transform: translateY(0);
//               }
//             }

//             @keyframes slideIn {
//               from {
//                 opacity: 0;
//                 transform: translateX(50px);
//               }
//               to {
//                 opacity: 1;
//                 transform: translateX(0);
//               }
//             }

//             /* Header & Navigation */
//             .header {
//               position: fixed;
//               width: 100%;
//               top: 0;
//               z-index: 1000;
//               background: rgba(255, 255, 255, 0.9);
//               backdrop-filter: blur(10px);
//               box-shadow: var(--shadow);
//             }

//             .navbar {
//               display: flex;
//               justify-content: space-between;
//               align-items: center;
//               padding: 1rem 5%;
//               max-width: 1400px;
//               margin: 0 auto;
//             }

//             .nav-brand {
//               display: flex;
//               align-items: center;
//               gap: 0.75rem;
//             }

//             .temp-icon {
//               font-size: 2rem;
//             }

//             .brand-text {
//               font-size: 1.5rem;
//               font-weight: 700;
//               background: linear-gradient(135deg, var(--primary), var(--secondary));
//               -webkit-background-clip: text;
//               -webkit-text-fill-color: transparent;
//             }

//             .nav-menu {
//               display: flex;
//               gap: 2.5rem;
//               align-items: center;
//             }

//             .nav-menu a {
//               text-decoration: none;
//               color: var(--text);
//               font-weight: 500;
//               transition: var(--transition);
//               position: relative;
//             }

//             .nav-menu a::after {
//               content: '';
//               position: absolute;
//               width: 0;
//               height: 2px;
//               bottom: -4px;
//               left: 0;
//               background: linear-gradient(135deg, var(--primary), var(--secondary));
//               transition: var(--transition);
//             }

//             .nav-menu a:hover::after {
//               width: 100%;
//             }

//             .nav-cta {
//               background: linear-gradient(135deg, var(--accent), #fb923c);
//               color: white !important;
//               padding: 0.75rem 1.5rem;
//               border-radius: 9999px;
//               transition: var(--transition);
//               box-shadow: 0 2px 4px rgba(249, 115, 22, 0.1);
//             }

//             .nav-cta:hover {
//               transform: translateY(-2px);
//               box-shadow: 0 4px 6px rgba(249, 115, 22, 0.2);
//             }

//             .mobile-toggle {
//               display: none;
//               background: none;
//               border: none;
//               font-size: 1.5rem;
//               cursor: pointer;
//               color: var(--primary);
//             }

//             /* Hero Section */
//             .hero {
//               min-height: 100vh;
//               display: flex;
//               align-items: center;
//               padding: 7rem 5% 5rem;
//               background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
//               position: relative;
//               overflow: hidden;
//             }

//             .hero-content {
//               flex: 1;
//               max-width: 600px;
//               position: relative;
//               z-index: 2;
//             }

//             .hero h1 {
//               font-size: 4rem;
//               background: linear-gradient(135deg, var(--primary), var(--secondary));
//               -webkit-background-clip: text;
//               -webkit-text-fill-color: transparent;
//               margin-bottom: 1.5rem;
//               line-height: 1.2;
//             }

//             .hero p {
//               font-size: 1.5rem;
//               color: var(--gray);
//               margin-bottom: 2rem;
//             }

//             .hero-cta {
//               display: flex;
//               gap: 1rem;
//               margin-bottom: 3rem;
//             }

//             .cta-primary, .cta-secondary {
//               padding: 1rem 2rem;
//               border-radius: 9999px;
//               font-weight: 600;
//               font-size: 1.1rem;
//               cursor: pointer;
//               transition: var(--transition);
//             }

//             .cta-primary {
//               background: linear-gradient(135deg, var(--primary), var(--secondary));
//               color: white;
//               border: none;
//               box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
//             }

//             .cta-secondary {
//               background: transparent;
//               border: 2px solid var(--primary);
//               color: var(--primary);
//             }

//             .cta-primary:hover, .cta-secondary:hover {
//               transform: translateY(-3px);
//               box-shadow: 0 6px 8px rgba(37, 99, 235, 0.3);
//             }

//             .hero-features {
//               display: flex;
//               gap: 2rem;
//             }

//             .feature {
//               display: flex;
//               align-items: center;
//               gap: 0.75rem;
//               background: white;
//               padding: 0.75rem 1.25rem;
//               border-radius: 9999px;
//               box-shadow: var(--shadow);
//             }

//             .feature-icon {
//               font-size: 1.5rem;
//             }

//             .hero-image {
//               position: absolute;
//               right: -5%;
//               top: 50%;
//               transform: translateY(-50%);
//               width: 50%;
//               height: 70%;
//               background: url('https://images.unsplash.com/photo-1581094794329-c8112c4e5190?auto=format&fit=crop&q=80&w=2070') center/cover;
//               border-radius: 30px;
//               box-shadow: var(--shadow-lg);
//             }

//             /* Services Section */
//             .services {
//               padding: 8rem 5%;
//               background: var(--light);
//             }

//             .section-title {
//               text-align: center;
//               font-size: 2.5rem;
//               background: linear-gradient(135deg, var(--primary), var(--secondary));
//               -webkit-background-clip: text;
//               -webkit-text-fill-color: transparent;
//               margin-bottom: 4rem;
//               position: relative;
//             }

//             .section-title::after {
//               content: '';
//               position: absolute;
//               bottom: -10px;
//               left: 50%;
//               transform: translateX(-50%);
//               width: 60px;
//               height: 3px;
//               background: linear-gradient(135deg, var(--primary), var(--secondary));
//               border-radius: 3px;
//             }

//             .service-grid {
//               display: grid;
//               grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//               gap: 2rem;
//               max-width: 1400px;
//               margin: 0 auto;
//             }

//             .service-card {
//               background: white;
//               padding: 2.5rem;
//               border-radius: 20px;
//               box-shadow: var(--shadow);
//               transition: var(--transition);
//               position: relative;
//               overflow: hidden;
//               border: 1px solid var(--border);
//             }

//             .service-card::before {
//               content: '';
//               position: absolute;
//               top: 0;
//               left: 0;
//               width: 100%;
//               height: 5px;
//               background: linear-gradient(135deg, var(--primary), var(--secondary));
//               transform: scaleX(0);
//               transition: var(--transition);
//             }

//             .service-card:hover {
//               transform: translateY(-10px);
//               box-shadow: var(--shadow-lg);
//             }

//             .service-card:hover::before {
//               transform: scaleX(1);
//             }

//             .card-icon {
//               font-size: 3rem;
//               margin-bottom: 1.5rem;
//             }

//             .service-card h3 {
//               color: var(--primary);
//               margin-bottom: 1rem;
//               font-size: 1.5rem;
//             }

//             .service-features {
//               list-style: none;
//               margin: 1.5rem 0;
//             }

//             .service-features li {
//               margin-bottom: 0.75rem;
//               padding-left: 1.75rem;
//               position: relative;
//             }

//             .service-features li::before {
//               content: '✓';
//               position: absolute;
//               left: 0;
//               color: var(--primary);
//               font-weight: bold;
//             }

//             .card-cta {
//               display: inline-block;
//               color: var(--primary);
//               text-decoration: none;
//               font-weight: 600;
//               transition: var(--transition);
//             }

//             .card-cta:hover {
//               transform: translateX(5px);
//             }

//             /* Why Us Section */
//             .why-us {
//               padding: 8rem 5%;
//               background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
//             }

//             .benefits-grid {
//               display: grid;
//               grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//               gap: 2rem;
//               max-width: 1200px;
//               margin: 0 auto;
//             }

//             .benefit-card {
//               background: white;
//               padding: 2.5rem;
//               border-radius: 20px;
//               text-align: center;
//               transition: var(--transition);
//               box-shadow: var(--shadow);
//               border: 1px solid var(--border);
//             }

//             .benefit-card:hover {
//               transform: translateY(-5px);
//               box-shadow: var(--shadow-lg);
//             }

//             .benefit-icon {
//               font-size: 2.5rem;
//               margin-bottom: 1.5rem;
//               display: inline-block;
//               padding: 1rem;
//               background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(14, 165, 233, 0.1));
//               border-radius: 50%;
//             }

//             /* Pricing Section */
//             .pricing {
//               padding: 8rem 5%;
//               background: var(--light);
//             }

//             .pricing-grid {
//               display: grid;
//               grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//               gap: 2rem;
//               max-width: 1200px;
//               margin: 0 auto;
//             }

//             .pricing-card {
//               background: white;
//               padding: 3rem 2rem;
//               border-radius: 20px;
//               box-shadow: var(--shadow);
//               transition: var(--transition);
//               border: 1px solid var(--border);
//               position: relative;
//               overflow: hidden;
//             }

//             .pricing-card::before {
//               content: '';
//               position: absolute;
//               top: 0;
//               left: 0;
//               width: 100%;
//               height: 5px;
//               background: linear-gradient(135deg, var(--primary), var(--secondary));
//             }

//             .pricing-card:hover {
//               transform: translateY(-10px);
//               box-shadow: var(--shadow-lg);
//             }

//             .plan-header {
//               text-align: center;
//               margin-bottom: 2rem;
//               padding-bottom: 2rem;
//               border-bottom: 1px solid var(--border);
//             }

//             .price {
//               margin-top: 1rem;
//             }

//             .amount {
//               font-size: 3rem;
//               font-weight: 700;
//               background: linear-gradient(135deg, var(--primary), var(--secondary));
//               -webkit-background-clip: text;
//               -webkit-text-fill-color: transparent;
//             }

//             .period {
//               color: var(--gray);
//             }

//             .plan-features {
//               list-style: none;
//               margin-bottom: 2rem;
//             }

//             .plan-features li {
//               margin-bottom: 0.75rem;
//               padding-left: 1.75rem;
//               position: relative;
//             }

//             .plan-features li::before {
//               content: '✓';
//               position: absolute;
//               left: 0;
//               color: var(--primary);
//               font-weight: bold;
//             }

//             .plan-cta {
//               width: 100%;
//               padding: 1rem;
//               border: none;
//               border-radius: 9999px;
//               background: linear-gradient(135deg, var(--primary), var(--secondary));
//               color: white;
//               font-weight: 600;
//               cursor: pointer;
//               transition: var(--transition);
//             }

//             .plan-cta:hover {
//               transform: translateY(-2px);
//               box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
//             }

//             /* Contact Section */
//             .contact {
//               padding: 8rem 5%;
//               background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
//             }

//             .contact-content {
//               display: grid;
//               grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//               gap: 4rem;
//               max-width: 1200px;
//               margin: 0 auto;
//             }

//             .contact-info h2 {
//               font-size: 2.5rem;
//               background: linear-gradient(135deg, var(--primary), var(--secondary));
//               -webkit-background-clip: text;
//               -webkit-text-fill-color: transparent;
//               margin-bottom: 1rem;
//             }

//             .contact-methods {
//               margin-top: 2rem;
//             }

//             .method {
//               display: flex;
//               align-items: center;
//               gap: 1.5rem;
//               margin-bottom: 2rem;
//               padding: 1.5rem;
//               background: white;
//               border-radius: 15px;
//               box-shadow: var(--shadow);
//               transition: var(--transition);
//             }

//             .method:hover {
//               transform: translateY(-2px);
//               box-shadow: var(--shadow-lg);
//             }

//             .method-icon {
//               font-size: 2rem;
//               padding: 1rem;
//               background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(14, 165, 233, 0.1));
//               border-radius: 50%;
//             }

//             .contact-form {
//               background: white;
//               padding: 3rem;
//               border-radius: 20px;
//               box-shadow: var(--shadow);
//             }

//             .form-group {
//               margin-bottom: 1.5rem;
//             }

//             .form-group input,
//             .form-group select,
//             .form-group textarea {
//               width: 100%;
//               padding: 1rem;
//               border: 2px solid var(--border);
//               border-radius: 10px;
//               font-family: inherit;
//               transition: var(--transition);
//             }

//             .form-group input:focus,
//             .form-group select:focus,
//             .form-group textarea:focus {
//               outline: none;
//               border-color: var(--primary);
//               box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
//             }

//             .form-group textarea {
//               height: 150px;
//               resize: vertical;
//             }

//             .form-submit {
//               width: 100%;
//               padding: 1rem;
//               background: linear-gradient(135deg, var(--primary), var(--secondary));
//               color: white;
//               border: none;
//               border-radius: 9999px;
//               font-weight: 600;
//               cursor: pointer;
//               transition: var(--transition);
//             }

//             .form-submit:hover {
//               transform: translateY(-2px);
//               box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
//             }

//             /* Footer */
//             .footer {
//               background: var(--dark);
//               color: white;
//               padding: 6rem 5% 2rem;
//             }

//             .footer-content {
//               display: grid;
//               grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//               gap: 3rem;
//               max-width: 1200px;
//               margin: 0  auto;
//             }

//             .footer-section h3 {
//               color: var(--primary);
//               margin-bottom: 1.5rem;
//               font-size: 1.25rem;
//             }

//             .footer-section ul {
//               list-style: none;
//             }

//             .footer-section ul li {
//               margin-bottom: 0.75rem;
//             }

//             .footer-section a {
//               color: white;
//               text-decoration: none;
//               transition: var(--transition);
//               opacity: 0.8;
//             }

//             .footer-section a:hover {
//               color: var(--primary);
//               opacity: 1;
//             }

//             .footer-bottom {
//               text-align: center;
//               margin-top: 4rem;
//               padding-top: 2rem;
//               border-top: 1px solid rgba(255,255,255,0.1);
//               color: var(--gray);
//             }

//             /* Responsive Design */
//             @media (max-width: 768px) {
//               .nav-menu {
//                 display: none;
//               }

//               .mobile-toggle {
//                 display: block;
//               }

//               .hero {
//                 text-align: center;
//                 padding-top: 6rem;
//               }

//               .hero h1 {
//                 font-size: 2.5rem;
//               }

//               .hero-features {
//                 flex-direction: column;
//                 align-items: center;
//               }

//               .hero-image {
//                 display: none;
//               }

//               .hero-cta {
//                 justify-content: center;
//               }

//               .contact-content {
//                 grid-template-columns: 1fr;
//               }

//               .section-title {
//                 font-size: 2rem;
//               }

//               .service-card,
//               .benefit-card,
//               .pricing-card {
//                 padding: 2rem;
//               }
//             }
//             /* Modal Styles */
//             .modal {
//               display: none;
//               position: fixed;
//               top: 0;
//               left: 0;
//               width: 100%;
//               height: 100%;
//               background: rgba(0, 0, 0, 0.5);
//               z-index: 1000;
//               backdrop-filter: blur(5px);
//             }

//             .modal-content {
//               position: relative;
//               background: white;
//               margin: 5% auto;
//               padding: 2rem;
//               width: 90%;
//               max-width: 600px;
//               border-radius: 20px;
//               box-shadow: var(--shadow-lg);
//               animation: modalSlideIn 0.3s ease;
//             }

//             @keyframes modalSlideIn {
//               from {
//                 transform: translateY(-50px);
//                 opacity: 0;
//               }
//               to {
//                 transform: translateY(0);
//                 opacity: 1;
//               }
//             }

//             .close-modal {
//               position: absolute;
//               right: 1.5rem;
//               top: 1rem;
//               font-size: 2rem;
//               cursor: pointer;
//               color: var(--gray);
//               transition: var(--transition);
//             }

//             .close-modal:hover {
//               color: var(--primary);
//             }

//             .service-description {
//               margin: 1.5rem 0;
//               color: var(--gray);
//               font-size: 1.1rem;
//             }

//             .detailed-features {
//               list-style: none;
//               margin: 2rem 0;
//             }

//             .detailed-features li {
//               margin-bottom: 1rem;
//               padding-left: 2rem;
//               position: relative;
//             }

//             .detailed-features li::before {
//               content: '✓';
//               position: absolute;
//               left: 0;
//               color: var(--primary);
//               font-weight: bold;
//             }

//             .service-pricing {
//               font-size: 1.2rem;
//               color: var(--primary);
//               font-weight: 600;
//               margin: 1.5rem 0;
//             }

//             .modal-cta {
//               display: inline-block;
//               padding: 1rem 2rem;
//               background: linear-gradient(135deg, var(--primary), var(--secondary));
//               color: white;
//               border: none;
//               border-radius: 9999px;
//               font-weight: 600;
//               cursor: pointer;
//               transition: var(--transition);
//             }

//             .modal-cta:hover {
//               transform: translateY(-2px);
//               box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
//             }

//             /* Form success message */
//             #successModal .modal-content {
//               text-align: center;
//             }

//             #successModal h3 {
//               color: var(--primary);
//               margin-bottom: 1rem;
//             }
//           </style>
//         `,
//       },
//     ],
//   },
// };

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
                <h1 class="animate-fade-up">Expert HVAC Solutions</h1>
                <p class="animate-fade-up-delay-1">24/7 Heating, Ventilation & Air Conditioning Services</p>    
                <div class="hero-features animate-fade-up-delay-3">
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
              <div class="hero-image animate-slide-in"></div>
            </section>

            <section id="services" class="services">
              <h2 class="section-title animate-fade-up">Our Services</h2>
              <div class="service-grid">
                <div class="service-card animate-fade-up">
                  <div class="card-icon">❄️</div>
                  <h3>AC Installation & Repair</h3>
                  <p>Expert installation and maintenance of all AC brands</p>
                  <ul class="service-features">
                    <li>New System Installation</li>
                    <li>Emergency Repairs</li>
                    <li>Regular Maintenance</li>
                    <li>Energy Efficiency Upgrades</li>
                  </ul>
                  <button onclick="showServiceDetails('ac')" class="card-cta">Learn More →</button>
                </div>
                <div class="service-card animate-fade-up-delay-1">
                  <div class="card-icon">🔥</div>
                  <h3>Heating Systems</h3>
                  <p>Complete heating solutions for your comfort</p>
                  <ul class="service-features">
                    <li>Furnace Installation</li>
                    <li>Heat Pump Services</li>
                    <li>Boiler Maintenance</li>
                    <li>Heating Repairs</li>
                  </ul>
                  <button onclick="showServiceDetails('heating')" class="card-cta">Learn More →</button>
                </div>
                <div class="service-card animate-fade-up-delay-2">
                  <div class="card-icon">🌪️</div>
                  <h3>Ventilation</h3>
                  <p>Improve your indoor air quality</p>
                  <ul class="service-features">
                    <li>Duct Cleaning</li>
                    <li>Air Filter Replacement</li>
                    <li>Ventilation Installation</li>
                    <li>Air Quality Testing</li>
                  </ul>
                  <button onclick="showServiceDetails('ventilation')" class="card-cta">Learn More →</button>
                </div>
              </div>
            </section>

            <section id="why-us" class="why-us">
              <h2 class="section-title animate-fade-up">Why Choose Us</h2>
              <div class="benefits-grid">
                <div class="benefit-card animate-fade-up">
                  <div class="benefit-icon">👨‍🔧</div>
                  <h3>Expert Technicians</h3>
                  <p>Certified professionals with years of experience</p>
                </div>
                <div class="benefit-card animate-fade-up-delay-1">
                  <div class="benefit-icon">⚡</div>
                  <h3>Fast Response</h3>
                  <p>Quick emergency response within 2 hours</p>
                </div>
                <div class="benefit-card animate-fade-up-delay-2">
                  <div class="benefit-icon">💰</div>
                  <h3>Fair Pricing</h3>
                  <p>Transparent pricing with no hidden fees</p>
                </div>
                <div class="benefit-card animate-fade-up-delay-3">
                  <div class="benefit-icon">✅</div>
                  <h3>Guaranteed Work</h3>
                  <p>100% satisfaction guarantee on all services</p>
                </div>
              </div>
            </section>

            <section id="pricing" class="pricing">
              <h2 class="section-title animate-fade-up">Service Plans</h2>
              <div class="pricing-grid">
                <div class="pricing-card basic animate-fade-up">
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
                  <button onclick="scrollToContact()" class="plan-cta">Get Started</button>
                </div>
                <div class="pricing-card premium animate-fade-up-delay-1">
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
                  <button onclick="scrollToContact()" class="plan-cta">Get Started</button>
                </div>
                <div class="pricing-card business animate-fade-up-delay-2">
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
                  <button onclick="scrollToContact()" class="plan-cta">Contact Us</button>
                </div>
              </div>
            </section>

            <section id="contact" class="contact">
              <div class="contact-content">
                <div class="contact-info animate-fade-up">
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
                <form class="contact-form animate-fade-up-delay-1" onsubmit="handleFormSubmit(event)">
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
                <div class="footer-section animate-fade-up">
                  <h3>About Us</h3>
                  <p>Professional HVAC services with over 20 years of experience in keeping homes and businesses comfortable.</p>
                </div>
                <div class="footer-section animate-fade-up-delay-1">
                  <h3>Quick Links</h3>
                  <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                    <li><a href="#contact">Contact</a></li>
                  </ul>
                </div>
                <div class="footer-section animate-fade-up-delay-2">
                  <h3>Service Areas</h3>
                  <ul>
                    <li>Cooltown</li>
                    <li>Heatville</li>
                    <li>Ventburg</li>
                    <li>Airfield</li>
                  </ul>
                </div>
                <div class="footer-section animate-fade-up-delay-3">
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

          <!-- Service Details Modal -->
          <div id="serviceModal" class="modal">
            <div class="modal-content">
              <span class="close-modal" onclick="closeModal('serviceModal')">&times;</span>
              <div id="serviceDetails"></div>
            </div>
          </div>

          <!-- Success Modal -->
          <div id="successModal" class="modal">
            <div class="modal-content">
              <span class="close-modal" onclick="closeModal('successModal')">&times;</span>
              <h3>Thank You!</h3>
              <p>Your message has been sent successfully. We'll get back to you soon.</p>
            </div>
          </div>

          <!-- Error Modal -->
          <div id="errorModal" class="modal">
            <div class="modal-content">
              <span class="close-modal" onclick="closeModal('errorModal')">&times;</span>
              <h3>Error</h3>
              <p id="errorMessage">There was an error sending your message. Please try again.</p>
            </div>
          </div>

          <script>
            // Service details content
            const serviceInfo = {
              ac: {
                title: "AC Installation & Repair",
                description: "Our comprehensive AC services include:",
                details: [
                  "Professional installation of new AC systems",
                  "24/7 emergency repair service",
                  "Regular maintenance and tune-ups",
                  "Energy efficiency assessments",
                  "Filter replacement and cleaning",
                  "Ductwork inspection and repair",
                  "Smart thermostat installation",
                  "Freon level check and refill"
                ],
                pricing: "Starting from $89 for basic service"
              },
              heating: {
                title: "Heating Systems",
                description: "Complete heating solutions including:",
                details: [
                  "Furnace installation and replacement",
                  "Heat pump repairs and maintenance",
                  "Boiler services",
                  "Emergency heating repair",
                  "Annual heating system tune-ups",
                  "Thermostat programming",
                  "Energy efficiency upgrades",
                  "Safety inspections"
                ],
                pricing: "Starting from $99 for basic service"
              },
              ventilation: {
                title: "Ventilation Services",
                description: "Comprehensive ventilation solutions:",
                details: [
                  "Air duct cleaning and sanitization",
                  "Ventilation system installation",
                  "Air quality testing",
                  "Filter replacement services",
                  "Exhaust fan installation",
                  "Ductwork design and installation",
                  "Ventilation system maintenance",
                  "Indoor air quality solutions"
                ],
                pricing: "Starting from $79 for basic service"
              }
            };

            // Modal functionality
            function showServiceDetails(service) {
              const modal = document.getElementById('serviceModal');
              const details = document.getElementById('serviceDetails');
              const info = serviceInfo[service];

              details.innerHTML = \`
                <h2>\${info.title}</h2>
                <p class="service-description">\${info.description}</p>
                <ul class="detailed-features">
                  \${info.details.map(detail => \`<li>\${detail}</li>\`).join('')}
                </ul>
                <p class="service-pricing">\${info.pricing}</p>
                <button onclick="scrollToContact()" class="modal-cta">Schedule Service</button>
              \`;

              modal.style.display = 'block';
            }

            function closeModal(modalId) {
              document.getElementById(modalId).style.display = 'none';
            }

            function scrollToContact() {
              closeModal('serviceModal');
              document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }

            // Form submission handling
            async function handleFormSubmit(e) {
              e.preventDefault();
              
              const form = e.target;
              const formData = {
                name: form.querySelector('input[type="text"]').value,
                email: form.querySelector('input[type="email"]').value,
                service: form.querySelector('select').value,
                message: form.querySelector('textarea').value
              };

              try {
                // Send email using EmailJS or your preferred email service
                const response = await emailjs.send(
                  'YOUR_SERVICE_ID',
                  'YOUR_TEMPLATE_ID',
                  formData,
                  'YOUR_PUBLIC_KEY'
                );

                if (response.status === 200) {
                  document.getElementById('successModal').style.display = 'block';
                  form.reset();
                } else {
                  throw new Error('Failed to send email');
                }
              } catch (error) {
                console.error('Error sending message:', error);
                document.getElementById('errorMessage').textContent = 'There was an error sending your message. Please try again.';
                document.getElementById('errorModal').style.display = 'block';
              }
            }

            // Mobile menu toggle
            const mobileToggle = document.querySelector('.mobile-toggle');
            const navMenu = document.querySelector('.nav-menu');

            if (mobileToggle && navMenu) {
              mobileToggle.addEventListener('click', () => {
                navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
              });
            }

            // Close modals when clicking outside
            window.onclick = (event) => {
              if (event.target.classList.contains('modal')) {
                event.target.style.display = 'none';
              }
            };

            // Smooth scroll for all anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
              anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const element = document.querySelector(this.getAttribute('href'));
                if (element) {
                  element.scrollIntoView({
                    behavior: 'smooth'
                  });
                }
                // Close mobile menu if open
                if (navMenu.style.display === 'flex') {
                  navMenu.style.display = 'none';
                }
              });
            });
          </script>

          <style>
            /* Base Styles */
            :root {
              --primary: #2563eb;
              --primary-dark: #1d4ed8;
              --secondary: #0ea5e9;
              --accent: #f97316;
              --background: #f8fafc;
              --text: #1e293b;
              --light: #ffffff;
              --dark: #0f172a;
              --gray: #64748b;
              --border: #e2e8f0;
              --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
              --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
              --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            html {
              scroll-behavior: smooth;
              scroll-padding-top: 80px;
            }

            body {
              font-family: 'Inter', system-ui, -apple-system, sans-serif;
              line-height: 1.6;
              color: var(--text);
              background: var(--background);
            }

            /* Animations */
            .animate-fade-up {
              opacity: 0;
              transform: translateY(30px);
              animation: fadeUp 0.6s ease forwards;
            }

            .animate-fade-up-delay-1 {
              opacity: 0;
              transform: translateY(30px);
              animation: fadeUp 0.6s ease 0.2s forwards;
            }

            .animate-fade-up-delay-2 {
              opacity: 0;
              transform: translateY(30px);
              animation: fadeUp 0.6s ease 0.4s forwards;
            }

            .animate-fade-up-delay-3 {
              opacity: 0;
              transform: translateY(30px);
              animation: fadeUp 0.6s ease 0.6s forwards;
            }

            .animate-slide-in {
              opacity: 0;
              transform: translateX(50px);
              animation: slideIn 0.8s ease 0.6s forwards;
            }

            @keyframes fadeUp {
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
                transform: translateX(50px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            /* Header & Navigation */
            .header {
              position: fixed;
              width: 100%;
              top: 0;
              z-index: 1000;
              background: rgba(255, 255, 255, 0.9);
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
              gap: 0.75rem;
            }

            .temp-icon {
              font-size: 2rem;
            }

            .brand-text {
              font-size: 1.5rem;
              font-weight: 700;
              background: linear-gradient(135deg, var(--primary), var(--secondary));
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }

            .nav-menu {
              display: flex;
              gap: 2.5rem;
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
              background: linear-gradient(135deg, var(--primary), var(--secondary));
              transition: var(--transition);
            }

            .nav-menu a:hover::after {
              width: 100%;
            }

            .nav-cta {
              background: linear-gradient(135deg, var(--accent), #fb923c);
              color: white !important;
              padding: 0.75rem 1.5rem;
              border-radius: 9999px;
              transition: var(--transition);
              box-shadow: 0 2px 4px rgba(249, 115, 22, 0.1);
            }

            .nav-cta:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 6px rgba(249, 115, 22, 0.2);
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
              background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
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
              background: linear-gradient(135deg, var(--primary), var(--secondary));
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 1.5rem;
              line-height: 1.2;
            }

            .hero p {
              font-size: 1.5rem;
              color: var(--gray);
              margin-bottom: 2rem;
            }

            .hero-features {
              display: flex;
              gap: 2rem;
            }

            .feature {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              background: white;
              padding: 0.75rem 1.25rem;
              border-radius: 9999px;
              box-shadow: var(--shadow);
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
              box-shadow: var(--shadow-lg);
            }

            /* Services Section */
            .services {
              padding: 8rem 5%;
              background: var(--light);
            }

            .section-title {
              text-align: center;
              font-size: 2.5rem;
              background: linear-gradient(135deg, var(--primary), var(--secondary));
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 4rem;
              position: relative;
            }

            .section-title::after {
              content: '';
              position: absolute;
              bottom: -10px;
              left: 50%;
              transform: translateX(-50%);
              width: 60px;
              height: 3px;
              background: linear-gradient(135deg, var(--primary), var(--secondary));
              border-radius: 3px;
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
              border-radius: 20px;
              box-shadow: var(--shadow);
              transition: var(--transition);
              position: relative;
              overflow: hidden;
              border: 1px solid var(--border);
            }

            .service-card::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 5px;
              background: linear-gradient(135deg, var(--primary), var(--secondary));
              transform: scaleX(0);
              transition: var(--transition);
            }

            .service-card:hover {
              transform: translateY(-10px);
              box-shadow: var(--shadow-lg);
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
              margin-bottom: 0.75rem;
              padding-left: 1.75rem;
              position: relative;
            }

            .service-features li::before {
              content: '✓';
              position: absolute;
              left: 0;
              color: var(--primary);
              font-weight: bold;
            }

            .card-cta {
              display: inline-block;
              color: var(--primary);
              text-decoration: none;
              font-weight: 600;
              transition: var(--transition);
              background: none;
              border: none;
              cursor: pointer;
              padding: 0;
            }

            .card-cta:hover {
              transform: translateX(5px);
            }

            /* Why Us Section */
            .why-us {
              padding: 8rem 5%;
              background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
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
              padding: 2.5rem;
              border-radius: 20px;
              text-align: center;
              transition: var(--transition);
              box-shadow: var(--shadow);
              border: 1px solid var(--border);
            }

            .benefit-card:hover {
              transform: translateY(-5px);
              box-shadow: var(--shadow-lg);
            }

            .benefit-icon {
              font-size: 2.5rem;
              margin-bottom: 1.5rem;
              display: inline-block;
              padding: 1rem;
              background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(14, 165, 233, 0.1));
              border-radius: 50%;
            }

            /* Pricing Section */
            .pricing {
              padding: 8rem 5%;
              background: var(--light);
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
              padding: 3rem 2rem;
              border-radius: 20px;
              box-shadow: var(--shadow);
              transition: var(--transition);
              border: 1px solid var(--border);
              position: relative;
              overflow: hidden;
            }

            .pricing-card::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 5px;
              background: linear-gradient(135deg, var(--primary), var(--secondary));
            }

            .pricing-card:hover {
              transform: translateY(-10px);
              box-shadow: var(--shadow-lg);
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
              font-size: 3rem;
              
              font-weight: 700;
              background: linear-gradient(135deg, var(--primary), var(--secondary));
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }

            .period {
              color: var(--gray);
            }

            .plan-features {
              list-style: none;
              margin-bottom: 2rem;
            }

            .plan-features li {
              margin-bottom: 0.75rem;
              padding-left: 1.75rem;
              position: relative;
            }

            .plan-features li::before {
              content: '✓';
              position: absolute;
              left: 0;
              color: var(--primary);
              font-weight: bold;
            }

            .plan-cta {
              width: 100%;
              padding: 1rem;
              border: none;
              border-radius: 9999px;
              background: linear-gradient(135deg, var(--primary), var(--secondary));
              color: white;
              font-weight: 600;
              cursor: pointer;
              transition: var(--transition);
            }

            .plan-cta:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
            }

            /* Contact Section */
            .contact {
              padding: 8rem 5%;
              background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
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
              background: linear-gradient(135deg, var(--primary), var(--secondary));
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 1rem;
            }

            .contact-methods {
              margin-top: 2rem;
            }

            .method {
              display: flex;
              align-items: center;
              gap: 1.5rem;
              margin-bottom: 2rem;
              padding: 1.5rem;
              background: white;
              border-radius: 15px;
              box-shadow: var(--shadow);
              transition: var(--transition);
            }

            .method:hover {
              transform: translateY(-2px);
              box-shadow: var(--shadow-lg);
            }

            .method-icon {
              font-size: 2rem;
              padding: 1rem;
              background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(14, 165, 233, 0.1));
              border-radius: 50%;
            }

            .contact-form {
              background: white;
              padding: 3rem;
              border-radius: 20px;
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
              border: 2px solid var(--border);
              border-radius: 10px;
              font-family: inherit;
              transition: var(--transition);
            }

            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
              outline: none;
              border-color: var(--primary);
              box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
            }

            .form-group textarea {
              height: 150px;
              resize: vertical;
            }

            .form-submit {
              width: 100%;
              padding: 1rem;
              background: linear-gradient(135deg, var(--primary), var(--secondary));
              color: white;
              border: none;
              border-radius: 9999px;
              font-weight: 600;
              cursor: pointer;
              transition: var(--transition);
            }

            .form-submit:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
            }

            /* Footer */
            .footer {
              background: var(--dark);
              color: white;
              padding: 6rem 5% 2rem;
            }

            .footer-content {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 3rem;
              max-width: 1200px;
              margin: 0 auto;
            }

            .footer-section h3 {
              color: var(--primary);
              margin-bottom: 1.5rem;
              font-size: 1.25rem;
            }

            .footer-section ul {
              list-style: none;
            }

            .footer-section ul li {
              margin-bottom: 0.75rem;
            }

            .footer-section a {
              color: white;
              text-decoration: none;
              transition: var(--transition);
              opacity: 0.8;
            }

            .footer-section a:hover {
              color: var(--primary);
              opacity: 1;
            }

            .footer-bottom {
              text-align: center;
              margin-top: 4rem;
              padding-top: 2rem;
              border-top: 1px solid rgba(255,255,255,0.1);
              color: var(--gray);
            }

            /* Modal Styles */
            .modal {
              display: none;
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.5);
              z-index: 1000;
              backdrop-filter: blur(5px);
            }

            .modal-content {
              position: relative;
              background: white;
              margin: 5% auto;
              padding: 2rem;
              width: 90%;
              max-width: 600px;
              border-radius: 20px;
              box-shadow: var(--shadow-lg);
              animation: modalSlideIn 0.3s ease;
            }

            @keyframes modalSlideIn {
              from {
                transform: translateY(-50px);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }

            .close-modal {
              position: absolute;
              right: 1.5rem;
              top: 1rem;
              font-size: 2rem;
              cursor: pointer;
              color: var(--gray);
              transition: var(--transition);
            }

            .close-modal:hover {
              color: var(--primary);
            }

            .service-description {
              margin: 1.5rem 0;
              color: var(--gray);
              font-size: 1.1rem;
            }

            .detailed-features {
              list-style: none;
              margin: 2rem 0;
            }

            .detailed-features li {
              margin-bottom: 1rem;
              padding-left: 2rem;
              position: relative;
            }

            .detailed-features li::before {
              content: '✓';
              position: absolute;
              left: 0;
              color: var(--primary);
              font-weight: bold;
            }

            .service-pricing {
              font-size: 1.2rem;
              color: var(--primary);
              font-weight: 600;
              margin: 1.5rem 0;
            }

            .modal-cta {
              display: inline-block;
              padding: 1rem 2rem;
              background: linear-gradient(135deg, var(--primary), var(--secondary));
              color: white;
              border: none;
              border-radius: 9999px;
              font-weight: 600;
              cursor: pointer;
              transition: var(--transition);
            }

            .modal-cta:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
            }

            /* Form success message */
            #successModal .modal-content,
            #errorModal .modal-content {
              text-align: center;
            }

            #successModal h3,
            #errorModal h3 {
              color: var(--primary);
              margin-bottom: 1rem;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
              .nav-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: white;
                padding: 1rem;
                flex-direction: column;
                align-items: center;
                box-shadow: var(--shadow);
              }

              .nav-menu.active {
                display: flex;
              }

              .mobile-toggle {
                display: block;
              }

              .hero {
                text-align: center;
                padding-top: 6rem;
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

              .contact-content {
                grid-template-columns: 1fr;
              }

              .section-title {
                font-size: 2rem;
              }

              .service-card,
              .benefit-card,
              .pricing-card {
                padding: 2rem;
              }

              .contact-form {
                padding: 2rem;
              }
            }
          </style>
        `,
      },
    ],
  },
};
