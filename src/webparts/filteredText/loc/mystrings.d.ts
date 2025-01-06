declare interface IFilteredTextWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  PropertyPaneInnerHTMLDefault: string;
  PropertyPaneFilterNamesDefault: string;
}

declare module "FilteredTextWebPartStrings" {
  const strings: IFilteredTextWebPartStrings;
  export = strings;
}
