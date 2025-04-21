export const multiPageTemplate = {
  id: "multi-page-template",
  name: "Multi Page Portfolio",
  data: {
    pages: [
      {
        id: "home",
        name: "Home",
        component: `
            <div class="electrician-home" style="padding: 20px; font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto;">
              <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
                <h1 style="color: #2c3e50;">⚡ BrightSpark Electric</h1>
                <nav style="display: flex; gap: 20px;">
                  <a href="#!" data-gjs-nav="home" style="color: #3498db; text-decoration: none;">Home</a>
                  <a href="#!" data-gjs-nav="services" style="color: #3498db; text-decoration: none;">Services</a>
                  <a href="#!" data-gjs-nav="contact" style="color: #3498db; text-decoration: none;">Contact</a>
                </nav>
              </header>
              
              <section style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 60px;">
                <div>
                  <h2 style="color: #2c3e50;">Professional Electrical Services</h2>
                  <p style="line-height: 1.6; color: #7f8c8d;">24/7 emergency electrical services for residential and commercial properties. Fully licensed and insured.</p>
                  <button style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Free Estimate</button>
                </div>
                <img src="https://via.placeholder.com/600x400?text=Electrician+at+Work" alt="Electrician" style="max-width: 100%; border-radius: 8px;">
              </section>
              
              <section>
                <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Our Promise</h3>
                <p style="line-height: 1.6; color: #7f8c8d;">Quality workmanship, transparent pricing, and 100% satisfaction guarantee on all our electrical services.</p>
              </section>
            </div>
          `,
        styles: `
            .electrician-home {
              background-color: #f9f9f9;
              min-height: 100vh;
              padding: 20px;
            }
            [data-gjs-nav]:hover {
              text-decoration: underline;
            }
          `,
      },
      {
        id: "services",
        name: "Services",
        component: `
            <div class="electrician-services" style="padding: 20px; font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto;">
              <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
                <h1 style="color: #2c3e50;">⚡ Our Services</h1>
                <nav style="display: flex; gap: 20px;">
                  <a href="#!" data-gjs-nav="home" style="color: #3498db; text-decoration: none;">Home</a>
                  <a href="#!" data-gjs-nav="services" style="color: #3498db; text-decoration: none; font-weight: bold;">Services</a>
                  <a href="#!" data-gjs-nav="contact" style="color: #3498db; text-decoration: none;">Contact</a>
                </nav>
              </header>
              
              <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                  <h3 style="color: #2c3e50;">Residential Wiring</h3>
                  <p style="line-height: 1.6; color: #7f8c8d;">Complete home wiring, panel upgrades, and electrical inspections.</p>
                </div>
                
                <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                  <h3 style="color: #2c3e50;">Lighting Installation</h3>
                  <p style="line-height: 1.6; color: #7f8c8d;">Indoor, outdoor, and decorative lighting solutions.</p>
                </div>
                
                <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                  <h3 style="color: #2c3e50;">Emergency Repairs</h3>
                  <p style="line-height: 1.6; color: #7f8c8d;">24/7 service for electrical emergencies and outages.</p>
                </div>
              </section>
            </div>
          `,
        styles: `
            .electrician-services {
              background-color: #f9f9f9;
              min-height: 100vh;
            }
          `,
      },
      {
        id: "contact",
        name: "Contact",
        component: `
            <div class="electrician-contact" style="padding: 20px; font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto;">
              <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
                <h1 style="color: #2c3e50;">⚡ Contact Us</h1>
                <nav style="display: flex; gap: 20px;">
                  <a href="#!" data-gjs-nav="home" style="color: #3498db; text-decoration: none;">Home</a>
                  <a href="#!" data-gjs-nav="services" style="color: #3498db; text-decoration: none;">Services</a>
                  <a href="#!" data-gjs-nav="contact" style="color: #3498db; text-decoration: none; font-weight: bold;">Contact</a>
                </nav>
              </header>
              
              <section style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
                <div>
                  <h2 style="color: #2c3e50;">Get in Touch</h2>
                  <form style="display: grid; gap: 15px;">
                    <input type="text" placeholder="Your Name" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                    <input type="email" placeholder="Your Email" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                    <textarea placeholder="Your Message" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px; min-height: 100px;"></textarea>
                    <button type="submit" style="background: #3498db; color: white; border: none; padding: 12px 20px; border-radius: 4px; cursor: pointer;">Send Message</button>
                  </form>
                </div>
                
                <div>
                  <h3 style="color: #2c3e50;">Contact Info</h3>
                  <p style="line-height: 1.6; color: #7f8c8d;">
                    <strong>Phone:</strong> (555) 123-4567<br>
                    <strong>Email:</strong> contact@brightspark.com<br>
                    <strong>Address:</strong> 123 Electric Ave, Current City
                  </p>
                  
                  <h3 style="color: #2c3e50; margin-top: 30px;">Business Hours</h3>
                  <p style="line-height: 1.6; color: #7f8c8d;">
                    Monday-Friday: 8am - 6pm<br>
                    Saturday: 9am - 2pm<br>
                    Emergency: 24/7
                  </p>
                </div>
              </section>
            </div>
          `,
        styles: `
            .electrician-contact {
              background-color: #f9f9f9;
              min-height: 100vh;
            }
            form input, form textarea {
              width: 100%;
            }
          `,
      },
    ],
  },
};
