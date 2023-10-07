function drawCountryScatterPlot(plotId, x_axes, y_axes, year) {
    let countriesFilteredByYear = countries.filter(d => d["NF_Year"] === Number(year));
    console.log("-----------------", year);
    console.log(countriesFilteredByYear);

    let svgToRemove = d3.select(plotId).select("svg");
    svgToRemove.remove();


    // Set the dimensions of the canvas
    var margin = {top: 20, right: 30, bottom: 50, left: 60},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

// Append the SVG canvas to the body of the page
    var svg = d3.select(plotId)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Set the ranges for x and y scales
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

// Define the x and y domains
    x.domain([
        d3.min(countriesFilteredByYear, function (d) {
            return d[x_axes];
        })
        ,
        d3.max(countriesFilteredByYear, function (d) {
            return d[x_axes];
        })]);
    y.domain([
        d3.min(countriesFilteredByYear, function (d) {
            return d[y_axes];
        }), d3.max(countriesFilteredByYear, function (d) {
            return d[y_axes];
        })]);

// Add dots to the scatter plot
    svg.selectAll("circle")
        .data(countriesFilteredByYear)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return x(d[x_axes]);
        })
        .attr("cy", function (d) {
            return y(d[y_axes]);
        })
        .attr("r", 2) // radius of the circle;
        .attr("fill", "blue")
        .append("title")
        .text(d => d["NF_Country_Name"])

    ;

// Add x-axis with label
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .append("text")
        .attr("x", width / 2)
        .attr("y", margin.bottom - 10)
        .attr("dy", "0.71em")
        .attr("fill", "#000")
        .text(x_axes);

// Add y-axis with label
    svg.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - height / 2)
        .attr("dy", "0.71em")
        .attr("fill", "#000")
        .text(y_axes);
}

drawCountryScatterPlot("#country-scatter-plot", "Agricultural land (% of land area)", "Agricultural land (% of land area)", 2016);
drawCountryScatterPlot("#country-scatter-plot2", "Agricultural land (% of land area)", "Agricultural land (% of land area)", 2016);
drawCountryScatterPlot("#country-scatter-plot3", "Agricultural land (% of land area)", "Agricultural land (% of land area)", 2016);
