//****** VISUALIZATION MODULE - Handles D3 drawing and layout ******//

// IMPORTING D3 FUNCTIONS
import { select, scaleLinear, max, extent, axisLeft, axisBottom } from 'd3';

//****** DESIGN PARAMETERS - Adjust these for spacing, layout, and appearance ******//

// Margin convention PRIOR to the axes creation and used in scales in the range() - Adjust these for spacing and layout
const margin = {
  top: 80,
  right: 150,
  bottom: 100,
  left: 100,
};

// SVG canvas size - window size by default
const width = window.innerWidth;
const height = window.innerHeight;

// Circle radius
const radius = 5;

// Circle color and opacity
const circleColor = "teal";
const circleOpacity = 0.7;

// Axis labels
const xAxisLabel = "Petal Length"; // Change for your X axis
const yAxisLabel = "Sepal Length"; // Change for your Y axis
const axisLabelFontSize = "24px"; // Change font size if needed

// Title
const title = "Iris Flower";

//****** VISUALIZATION FUNCTION ******//

// Main rendering function: builds the entire scatter plot
const renderScatterPlot = (data, xValue, yValue) => {
  // SCALE to figure out where to place the circles, to convert data values into pixel values
  const xScale = scaleLinear() // gives back an object that has methods on it
    .domain([0, max(data, xValue)]) // go from 0 to the max of the data (x axes start at 0) - ***TWEAKABLE***
    .range([margin.left, width - margin.right]); // pixel values from left to right, within margins

  const yScale = scaleLinear()
    .domain(extent(data, yValue)) // y axes go from min to max of data (full extent of where the circles can go - ***TWEAKABLE***
    .range([height - margin.bottom, margin.top]); // pixel values from bottom to top, within margins

  // CREATE SVG ELEMENT
  const svg = select("body") // no need to write d3.select here as we explained in the import above
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // CREATE MARKS or CIRCLES POSITIONS for the scatter plot - mark data to circle positions. Map is a built-in array function that creates a new array by calling a function on each element of the original array called data here
  const marks = data.map((d) => ({
    x: xScale(xValue(d)),
    y: yScale(yValue(d)),
    titlePoints: `( ${xValue(d)}, ${yValue(d)} )`, // TOOLTIP text to show on hover
  }));

  // DRAW CIRCLES
  svg
    .selectAll("circle")
    .data(marks)
    .join("circle")
    .attr("cx", (d) => d.x) // center x position of the circle
    .attr("cy", (d) => d.y)
    .attr("r", radius)
    .attr("fill", circleColor)
    .attr("opacity", circleOpacity)
    .append("title") // A tooltip! x,y values on hover (a tooltip = small box that appears when you hover over a shape (here circle). Done by adding a <title> element inside each SVG shape. We cannot use it directly as an attribute. We append a title element as a child of each circle.
    .text((d) => d.titlePoints);

  // CREATE AXES
  // g element is a container used to group other SVG elements, is needed for grouping the axis elements
  // the call function calls a function on a selection, in this case we are calling the axisBottom function on the svg element
  svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(axisLeft(yScale)); // create left axis using the yScale

  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(axisBottom(xScale));

  // X axis label
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height - margin.bottom + 70)
    .attr("text-anchor", "middle")
    .attr("font-size", axisLabelFontSize)
    .text(xAxisLabel);

  // Y axis label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 35)
    .attr("text-anchor", "middle")
    .attr("font-size", axisLabelFontSize)
    .text(yAxisLabel);

  // Title
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", margin.top - 40)
    .attr("text-anchor", "middle")
    .attr("font-size", "32px")
    .attr("font-weight", "bold")
    .text(title);
};

// Export rendering function for use in other modules
export { renderScatterPlot };
