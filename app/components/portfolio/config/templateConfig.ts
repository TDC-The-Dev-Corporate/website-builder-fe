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
export const loadSelectedTemplate = (editor, selectedTemplate) => {
  if (selectedTemplate) {
    console.log('Loading template:', selectedTemplate);
    
    // Check if this is a saved portfolio with project data
    if (selectedTemplate.projectData && typeof selectedTemplate.projectData === 'string') {
      console.log('Loading saved portfolio with project data');
      
      try {
        // Parse the project data
        const projectData = JSON.parse(selectedTemplate.projectData);
        console.log('Parsed project data:', projectData);
        
        // Load the complete project data into GrapesJS
        editor.loadProjectData(projectData);
        
        console.log('Project data loaded successfully');
      } catch (error) {
        console.error('Failed to parse project data:', error);
        console.log('Falling back to htmlContent');
        
        // Fallback to loading from htmlContent
        if (selectedTemplate.htmlContent) {
          editor.DomComponents.clear();
          editor.CssComposer.clear();
          editor.setComponents(selectedTemplate.htmlContent);
        }
      }
    } 
    // Check if this is a saved portfolio with pages data but no project data
    else if (selectedTemplate.pagesData && typeof selectedTemplate.pagesData === 'string') {
      console.log('Loading saved portfolio with pages data');
      
      try {
        const pagesData = JSON.parse(selectedTemplate.pagesData);
        console.log('Parsed pages data:', pagesData);
        
        // Clear existing content
        editor.DomComponents.clear();
        editor.CssComposer.clear();
        
        // Get the first page or find a home page
        const pageIds = Object.keys(pagesData);
        if (pageIds.length > 0) {
          const firstPage = pagesData[pageIds[0]];
          if (firstPage.htmlContent) {
            editor.setComponents(firstPage.htmlContent);
          }
          if (firstPage.cssContent) {
            editor.setStyle(firstPage.cssContent);
          }
        }
      } catch (error) {
        console.error('Failed to parse pages data:', error);
        
        // Fallback to loading from htmlContent
        if (selectedTemplate.htmlContent) {
          editor.DomComponents.clear();
          editor.CssComposer.clear();
          editor.setComponents(selectedTemplate.htmlContent);
        }
      }
    }
    // Check if this is a saved portfolio with only htmlContent
    else if (selectedTemplate.htmlContent) {
      console.log('Loading saved portfolio with htmlContent only');
      editor.DomComponents.clear();
      editor.CssComposer.clear();
      editor.setComponents(selectedTemplate.htmlContent);
    }
    // This is a new template (carpenter, HVAC, etc.)
    else if (selectedTemplate.data && selectedTemplate.data.pages) {
      console.log('Loading template from template library');
      editor.DomComponents.clear();
      editor.CssComposer.clear();
      editor.setComponents(selectedTemplate.data.pages[0].component);
    }
    
    // Studio SDK handles link editing automatically with built-in capabilities
    console.log('Template loaded - Studio SDK will handle all editing features');
  }
};
