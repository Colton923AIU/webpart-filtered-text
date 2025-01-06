import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import {
  BaseClientSideWebPart,
  IWebPartPropertiesMetadata,
} from "@microsoft/sp-webpart-base";

import * as strings from "FilteredTextWebPartStrings";
import FilteredText from "./components/FilteredText";
import { IFilteredTextProps } from "./types/IFilteredTextProps";
import { DynamicProperty } from "@microsoft/sp-component-base";

export interface IFilteredTextWebPartProps {
  filterState: DynamicProperty<{ [key: string]: boolean }>;
  innerHTML: string;
}

export default class FilteredTextWebPart extends BaseClientSideWebPart<IFilteredTextWebPartProps> {
  protected onInit(): Promise<void> {
    return super.onInit();
  }
  public render(): void {
    const element: React.ReactElement<IFilteredTextProps> = React.createElement(
      FilteredText,
      {
        innerHTML: this.properties.innerHTML ?? "",
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      filterState: {
        dynamicPropertyType: "object",
      },
    };
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("innerHTML", {
                  label: "Inner HTML",
                  multiline: true,
                  resizable: true,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
