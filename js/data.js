//****** DATA MODULE - Handles data fetching and parsing ******//

// IMPORTING CSV FUNCTION FROM D3
import { csv } from 'd3';

// Fetch CSV data source URL
const csvUrl = [
  "https://gist.githubusercontent.com/",
  "curran/", // Gist user (change for your own data)
  "a08a1080b88344b0c8a7/", // Gist ID
  "raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/", // Commit hash
  "iris.csv", // CSV file name
].join("");

// Data parsing function to parse string into numbers - Edit this to match your CSV column names and types
const parseRow = (d) => {
  d.sepal_length = +d.sepal_length;
  d.sepal_width = +d.sepal_width;
  d.petal_length = +d.petal_length;
  d.petal_width = +d.petal_width;
  return d;
};

// Accessor functions for X and Y axes (determines which properties for each datapoint (d) to plot for X and Y)
const xValue = (d) => d.petal_length; // X axis: petal_length
const yValue = (d) => d.sepal_length; // Y axis: sepal_length

// Fetch and parse CSV data asynchronously
const loadData = async () => {
  const data = await csv(csvUrl, parseRow); // await makes the code wait until the data is loaded
  console.log(data); // Remove or keep for debugging
  return data;
};

// Export functions and variables for use in other modules
export { loadData, xValue, yValue };
