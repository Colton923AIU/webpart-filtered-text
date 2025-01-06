import * as React from "react";
import type { IFilteredTextProps } from "../types/IFilteredTextProps";
import { marked } from "marked";

const FilteredText: React.FC<IFilteredTextProps> = (props) => {
  const { innerHTML } = { ...props };
  const [editedHTML, setEditedHTML] = React.useState<string>(innerHTML);
  const [, setFilterState] = React.useState<Record<string, boolean>>({});

  const markHTML = async (html: string) => {
    const res = await marked(html);
    setEditedHTML(res); // Update the state with the modified HTML
  };

  const updateHTML = (filter: Record<string, boolean>) => {
    let html = innerHTML; // Start with the original HTML

    // Loop through all the filters and process the HTML accordingly
    Object.keys(filter).forEach((key) => {
      const filterTagRegex = new RegExp(
        `(<${key}[^>]*>)([\\s\\S]*?)(</${key}>)`, // Capture elements, excluding comments
        "g"
      );

      if (filter[key]) {
        // Show content: Keep the element and its content
        html = html.replace(filterTagRegex, "$1$2$3");
      } else {
        // Hide content: Remove the element and its content
        html = html.replace(filterTagRegex, "");
      }
    });

    void markHTML(html); // Call markHTML to process the HTML content
  };

  // Function to update filter state and innerHTML
  const handleFilterStateChange = (filterName: string) => {
    setFilterState((prevState) => {
      if (prevState[filterName] !== undefined) {
        const newFilterState = {
          ...prevState,
          [filterName]: !prevState[filterName],
        };
        updateHTML(newFilterState);
        return newFilterState;
      } else {
        const newFilterState = {
          ...prevState,
          [filterName]: true,
        };
        return newFilterState;
      }
    });
  };
  // Event handler for filter toggling
  const onFilterToggled = (event: any) => {
    const filterName = event.detail.filterName;
    handleFilterStateChange(filterName);
  };

  // Register the `filterToggled` event listener
  React.useEffect(() => {
    if (editedHTML === "") {
      void markHTML(innerHTML);
    }
    window.addEventListener("filterToggled", onFilterToggled);
    return () => {
      window.removeEventListener("filterToggled", onFilterToggled);
    };
  }, [innerHTML]);

  return (
    <section>
      <div dangerouslySetInnerHTML={{ __html: editedHTML }} key={editedHTML} />
    </section>
  );
};

export default FilteredText;
