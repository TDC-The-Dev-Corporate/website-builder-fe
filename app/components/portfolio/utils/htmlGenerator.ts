/**
 * HTML generation utilities for portfolio builder
 * Contains functions to generate complete HTML documents with scripts and styles
 */

/**
 * Generates the complete HTML document with all necessary scripts and styles
 * @param editor - The GrapesJS editor instance
 * @returns Complete HTML string ready for deployment
 */
export const generateFullHtml = (editor) => {
  if (!editor) return "";

  return `
<!DOCTYPE html>
<html>
<head>
  <style>${editor.getCss()}</style>
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
    document.getElementById('overlay')?.addEventListener('click', function() {
      document.getElementById('drawer')?.classList.remove('active');
      
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
        alert('Form submission is simulated in this template. In a real website, this would submit data to a server.');
        this.reset();
      });
    });
  </script>
</head>
<body>
  ${editor.getHtml()}
</body>
</html>
  `;
};

/**
 * Generates a minimal HTML document without interactive scripts
 * Useful for previews or static exports
 * @param editor - The GrapesJS editor instance
 * @returns Minimal HTML string
 */
export const generateMinimalHtml = (editor) => {
  if (!editor) return "";

  return `
<!DOCTYPE html>
<html>
<head>
  <style>${editor.getCss()}</style>
</head>
<body>
  ${editor.getHtml()}
</body>
</html>
  `;
};

/**
 * Generates HTML with custom scripts
 * @param editor - The GrapesJS editor instance
 * @param customScripts - Array of custom script strings to include
 * @returns HTML string with custom scripts
 */
export const generateHtmlWithCustomScripts = (editor, customScripts = []) => {
  if (!editor) return "";

  const scriptsHtml = customScripts.map(script => `<script>${script}</script>`).join('\n  ');

  return `
<!DOCTYPE html>
<html>
<head>
  <style>${editor.getCss()}</style>
  ${scriptsHtml}
</head>
<body>
  ${editor.getHtml()}
</body>
</html>
  `;
};

/**
 * Generates complete HTML for all pages in a multi-page project
 * Based on GrapesJS documentation: https://grapesjs.com/docs/modules/Storage.html#html-code-with-project-data
 * @param editor - The GrapesJS editor instance
 * @returns Array containing all pages with their HTML content
 */
export const generateAllPagesHtml = (editor) => {
  if (!editor) return [];

  // Get all pages from the editor using GrapesJS Pages API
  const pagesHtml = editor.Pages.getAll().map((page) => {
    const component = page.getMainComponent();
    const pageId = page.getId();
    const pageName = page.get('name') || `Page ${pageId}`;
    
    // Get HTML and CSS for this specific page component
    const htmlContent = editor.getHtml({ component });
    const cssContent = editor.getCss({ component });
    
    // Generate complete HTML document for this page
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageName}</title>
  <style>${cssContent}</style>
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
    document.getElementById('overlay')?.addEventListener('click', function() {
      document.getElementById('drawer')?.classList.remove('active');
      
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
        alert('Form submission is simulated in this template. In a real website, this would submit data to a server.');
        this.reset();
      });
    });
  </script>
</head>
<body>
  ${htmlContent}
</body>
</html>`;

    return {
      id: pageId,
      name: pageName,
      html: fullHtml,
      htmlContent: htmlContent,
      css: cssContent
    };
  });

  return pagesHtml;
};

/**
 * Gets the current project data including all pages
 * Following GrapesJS documentation pattern for storing project data with HTML
 * @param editor - The GrapesJS editor instance
 * @returns Project data with all pages HTML and project data
 */
export const getProjectData = (editor) => {
  if (!editor) return null;

  // Get the complete project data (includes pages structure, components, styles, etc.)
  const projectData = editor.getProjectData();
  
  // Generate HTML for all pages using the GrapesJS pattern
  const pagesHtml = generateAllPagesHtml(editor);
  
  // Get current page info
  const currentPage = editor.Pages.getSelected();
  const allPages = editor.Pages.getAll();
  
  return {
    // Store the complete GrapesJS project data for loading back into editor
    projectData: projectData,
    // Store HTML for all pages for publishing/display
    pagesHtml: pagesHtml,
    // Additional metadata
    currentPageId: currentPage?.getId(),
    totalPages: allPages.length,
    // Convert pages to array format for easier storage
    pages: pagesHtml
  };
};
