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
