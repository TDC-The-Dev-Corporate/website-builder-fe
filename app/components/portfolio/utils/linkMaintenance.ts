/**
 * Link processing and maintenance utilities
 * Contains functions to fix, validate, and maintain link integrity
 */

/**
 * Fixes all links in the editor before save/publish operations
 * Ensures href values are properly set and maintained
 * @param editor - The GrapesJS editor instance
 */
export const fixAllLinksBeforeOperation = (editor) => {
  if (!editor) return;

  console.log("Ensuring all links are properly updated before operation...");
  
  // Get all link components
  const links = editor.DomComponents.getWrapper().find('a');
  console.log(`Found ${links.length} links to check`);

  // Process each link to ensure href is correctly set
  links.forEach((link, index) => {
    try {
      const href = link.get('href') || link.getAttributes().href || '';
      console.log(`Pre-operation check link ${index + 1}:`, { href });

      // Set href on both model and attributes to ensure it's saved
      link.set('href', href);
      link.setAttributes({ href });

      // Update DOM element directly
      if (link.view && link.view.el) {
        link.view.el.setAttribute('href', href);
      }
    } catch (err) {
      console.error("Error fixing link before operation:", err);
    }
  });

  // Store changes
  editor.store();
};

/**
 * Validates all links in the editor
 * @param editor - The GrapesJS editor instance
 * @returns Array of validation results
 */
export const validateAllLinks = (editor) => {
  if (!editor) return [];

  const links = editor.DomComponents.getWrapper().find('a');
  const validationResults = [];

  links.forEach((link, index) => {
    const href = link.get('href') || link.getAttributes().href || '';
    const content = link.get('content') || link.view?.el?.textContent || '';
    
    validationResults.push({
      index: index + 1,
      href,
      content,
      hasHref: !!href.trim(),
      hasContent: !!content.trim(),
      isValid: !!(href.trim() && content.trim())
    });
  });

  return validationResults;
};

/**
 * Repairs broken or malformed links
 * @param editor - The GrapesJS editor instance
 * @returns Number of links repaired
 */
export const repairBrokenLinks = (editor) => {
  if (!editor) return 0;

  const links = editor.DomComponents.getWrapper().find('a');
  let repairedCount = 0;

  links.forEach((link) => {
    try {
      const href = link.get('href') || link.getAttributes().href || '';
      const content = link.get('content') || link.view?.el?.textContent || '';

      // Repair missing href
      if (!href.trim() && content.trim()) {
        link.set('href', '#');
        link.setAttributes({ href: '#' });
        repairedCount++;
      }

      // Repair missing content
      if (!content.trim() && href.trim()) {
        link.set('content', href);
        repairedCount++;
      }

      // Ensure DOM element is updated
      if (link.view && link.view.el) {
        const finalHref = link.get('href') || '#';
        link.view.el.setAttribute('href', finalHref);
      }
    } catch (err) {
      console.error("Error repairing link:", err);
    }
  });

  if (repairedCount > 0) {
    editor.store();
    console.log(`Repaired ${repairedCount} broken links`);
  }

  return repairedCount;
};
