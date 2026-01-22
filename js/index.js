//****** MAIN ENTRY POINT - Imports and orchestrates modules ******//

// Import data loading function and accessor functions from data module
import { loadData, xValue, yValue } from "./data.js";

// Import visualization rendering function from viz module
import { renderScatterPlot } from "./viz.js";

// Main function: orchestrates data loading and visualization rendering
const main = async () => {
  // Load and parse the data asynchronously
  const data = await loadData();

  // Render the scatter plot with the loaded data and accessor functions
  renderScatterPlot(data, xValue, yValue);
};

// Call the main function to render the scatter plot
main();
