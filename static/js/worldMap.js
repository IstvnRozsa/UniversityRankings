function drawMap() {
    let svgToRemove = d3.select("#world-map").select("svg");
    svgToRemove.remove();

// Set the width and height of the SVG container
    const width = 900;
    const height = 500;
// Create an SVG container
    const svg = d3.select("#world-map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

// Load the map data (e.g., GeoJSON)
    d3.json("https://raw.githubusercontent.com/iamspruce/intro-d3/main/data/countries-110m.geojson").then(function (mapData) {
        // Create a projection

        let projection = d3.geoMercator()
            .center([0, 28])
            .scale(150)
            .translate([width / 2, (height - 100) / 2]);

        // Create a path generator
        const path = d3.geoPath()
            .projection(projection);

        // Draw the map
        svg.selectAll("path")
            .data(mapData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", "lightgray");

        // Draw city points
        svg.selectAll("circle")
            .data(universities)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return projection([d.longitude, d.latitude])[0];
            })
            .attr("cy", function (d) {
                return projection([d.longitude, d.latitude])[1];
            })
            .attr("r", 2)
            .attr("fill", "#007bff")
            .attr("id", function (d) {
                return "ID" + d.Rank;
            })
            .on("mouseover", function (d) {
                handleClick(this.id);
            })
    });
}

drawMap();