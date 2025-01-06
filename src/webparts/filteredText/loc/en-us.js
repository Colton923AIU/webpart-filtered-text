define([], function () {
  return {
    BasicGroupName: "General Properties",
    PropertyPaneDescription:
      "Filter Names are strings that can be wrapped in tags within the markdown such as: <aiu> Text here when the aiu filter is active. </aiu>. Provide a list of Filter Names that are used on this SharePoint page, and then use them in your markdown. The Filter Icon Web Part will allow you to create a clickable icon to toggle the filtered text here!",
    PropertyPaneInnerHTMLDefault: `# Markdown Example with Filter

                  <aiu>Go AIU!</aiu>

## Additional Content
Example of a link: [Live Career Ed](https://www.livecareered.sharepoint.com)
- **Bold text**
- _Italic text_`,
    PropertyPaneFilterNamesDefault: "aiu, mil",
  };
});
