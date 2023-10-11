function drawMap(data) {
    let svgToRemove = d3.select("#world-map-spending").select("svg");
    svgToRemove.remove();

// Set the width and height of the SVG container
    const width = 860;
    const height = 500;

    var colorScale = d3.scaleThreshold()
        .domain([1, 3, 5, 7, 9, 10])
        .range(d3.schemeBlues[7]);


// Create an SVG container
    const svg = d3.select("#world-map-spending")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

// Load the map data (e.g., GeoJSON)
    d3.json("https://raw.githubusercontent.com/iamspruce/intro-d3/main/data/countries-110m.geojson").then(function (mapData) {
        // Create a projection

        let projection = d3.geoMercator()
            .center([20, 30])
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
            .attr("fill", secondaryColor2);


    });
}

drawMap(universities);