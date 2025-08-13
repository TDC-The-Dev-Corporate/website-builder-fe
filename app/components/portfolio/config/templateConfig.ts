/**
 * Template configuration and loading utilities
 * Contains template definitions and loading logic
 */

/**
 * Template configuration for the editor
 */
export const createTemplatesConfig = (
  carpenterTemplate,
  hvacTemplate,
  plumberTemplate,
  electricianTemplate,
  landscaperTemplate,
  painterTemplate
) => ({
  onLoad: async () => [
    carpenterTemplate,
    hvacTemplate,
    plumberTemplate,
    electricianTemplate,
    landscaperTemplate,
    painterTemplate,
  ],
});

/**
 * Load selected template into the editor
 */
export const loadSelectedTemplate = (editor, selectedTemplate, processTemplateLinks, createLinkEditor) => {
  if (selectedTemplate) {
    editor.DomComponents.clear();
    editor.CssComposer.clear();
    editor.setComponents(selectedTemplate.data.pages[0].component);
    
    // Use the imported processTemplateLinks function instead of defining it inline
    const processLinks = () => processTemplateLinks(editor, (e, el, model) => createLinkEditor(e, el, model, editor));
    
    // Process immediately and then again after a delay to catch any late-loading links
    setTimeout(processLinks, 500);
    setTimeout(processLinks, 2000); // Try again later in case some components load late
  }
};
