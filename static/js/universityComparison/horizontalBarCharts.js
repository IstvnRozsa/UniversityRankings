// Sample data
const data = [
    {name: "A", value: 10},
    {name: "B", value: 20},
    {name: "C", value: 15},
    {name: "D", value: 25},
];

function drawHorizontalBarChart(id, data, name, value, country) {
    let svgToRemove = d3.select(id).select("svg");
    svgToRemove.remove();

    data = data.filter(d => d["location"] === country).sort((a, b) => b[value] - a[value]).slice(0, 20);
// Set the dimensions and margins for the chart
    const margin = {top: 20, right: 30, bottom: 30, left: 200};
    const width = 600;
    const height = 400 - margin.top - margin.bottom;

// Create a scale for X and Y axes
    const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
    const yScale = d3.scaleBand().domain(data.map(d => d[name])).range([0, height]).padding(0.1);

// Create the SVG element
    const svg = d3
        .select(id)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

// Create horizontal bars
    svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", d => yScale(d[name]))
        .attr("width", d => xScale(d[value]))
        .attr("height", yScale.bandwidth())
        .attr("fill", mainColor);

// Add X and Y axes
    svg.append("g").call(d3.axisLeft(yScale));
    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(xScale));

// Add labels to bars
    svg
        .selectAll(".label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", d => xScale(d[value]) + 5) // Offset the labels a bit from the bars
        .attr("y", d => yScale(d[name]) + yScale.bandwidth() / 2)
        .text(d => d[value]);
}

function drawHorizontalBarcharts(country1, country2) {
    d3.select("#header-country1").text(country1);
    d3.select("#header-country2").text(country2);
    drawHorizontalBarChart("#top-unis-chart1", universities, "institution", selectedUniFeature2, country1);
    drawHorizontalBarChart("#top-unis-chart2", universities, "institution", selectedUniFeature2, country2);
}

drawHorizontalBarcharts(selectedCountry1, selectedCountry2);