console.log(universities);
console.log(uni_features);

function sortValues(feature, data) {
    //sort the dataset based on the feature
    data.sort(function (a, b) {
        return b[feature] - a[feature];
    });
    return data;
}


function drawBarchart(data, x, y, id, number_of_bars, bar_id, min_is_null = 0) {
    let universities = null;
    if (selectedContinent !== "No Selection") {
        data = data.filter(d => d["continent"] === selectedContinent);
    }
    universities = sortValues(y, data).slice(0, number_of_bars);
    let svgToRemove = d3.select(id).select("svg");
    svgToRemove.remove();


// Set the dimensions and margins of the chart .node().parentNode.clientWidth
    let width = document.getElementsByClassName("diagram-container")[0].offsetWidth - 30;

    let height = 260;
    let margin = {top: 20, right: 0, bottom: 30, left: 40};

// Calculate the inner width and height
    let innerWidth = width - margin.left - margin.right;
    let innerHeight = height - margin.top - margin.bottom;

// Create the SVG element
    let svg = d3.select(id)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

// Create the chart group and translate it to account for margins
    let chart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

// Create a scale for the x-axis
    let xScale = d3.scaleBand()
        .domain(universities.map(function (d) {
            return d[x];
        }))
        .range([0, innerWidth])
        .padding(0.2);

// Create a scale for the y-axis
    let yScale = d3.scaleLinear()
        .domain([d3.min(universities, function (d) {
            if (min_is_null === 0) {
                return d[y] - 1;
            } else {
                return 0;
            }
        })
            , d3.max(universities, function (d) {
                return d[y];
            })])
        .range([innerHeight, 0]);

// Create the bars
    let bars = chart.selectAll(".bar")
        .data(universities)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("fill", mainColor)
        .attr("id", d => "ID" + d[bar_id])
        .attr("x", d => xScale(d[x]))
        .attr("y", d => yScale(d[y]))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d[y]))
        .attr('rx', 4)
        .attr('ry', 4)
        .on("click", function (d) {
            console.log(this.id);
            handleSelectUni(this.id);
            handleSelectCountry(this.id);
        })

    chart.selectAll(".bar-label")
        .data(universities)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", d => xScale(d[x]) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d[y]) - 6) // Adjust the vertical position
        .attr("text-anchor", "middle") // Center the text horizontally
        .text(d => d[y].toFixed(1));


// Create the x-axis
    chart.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-8)");

// Create the y-axis
    chart.append("g")
        .call(d3.axisLeft(yScale));
}

function groupByLocation(id, categoryName, subcategoryName, totalPropertyName) {

    var groupedData = universities.reduce(function (acc, obj) {
        const key = obj[categoryName] + obj[subcategoryName];
        if (!acc[key]) {
            acc[key] = {
                [id]: obj[id],
                [categoryName]: obj[categoryName],
                [subcategoryName]: obj[subcategoryName],
                [totalPropertyName]: 0,
            };
        }

        acc[key][totalPropertyName] += obj[totalPropertyName];
        return acc;
    }, {});

// Convert the groupedData object back to an array
    var result = Object.values(groupedData);

    console.log("Grouped Data", result);
    return result;
}

function fillUniTable(data) {
    if (selectedContinent !== "No Selection") {
        data = data.filter(d => d["continent"] === selectedContinent);
    }
    data = sortValues(selectedUniFeature, data);
    console.log("Fill table");
    // Select the table element
    const table = d3.select("#university-table");
    table.select("thead").remove();
    table.selectAll("tbody").remove();
// Extract headers from the first object in JSON data
    const headers = Object.keys(data[0]);

// Append table headers
    table.append("thead")
        .append("tr")
        .selectAll("th")
        .data(headers)
        .enter()
        .append("th")
        .text(function (d) {
            return d.charAt(0).toUpperCase() + d.slice(1); // Capitalize the first letter of headers
        });

// Append table rows
    table.append("tbody")
        .selectAll("tr")
        .data(data)
        .enter()
        .append("tr")
        .selectAll("td")
        .data(function (d) {
            return headers.map(function (header) {
                return d[header];
            });
        })
        .enter()
        .append("td")
        .text(function (d) {
            return d;
        });
}


function drawMap(data) {
    console.log("Drawmap");
    if (selectedContinent !== "No Selection") {
        data = data.filter(d => d["continent"] === selectedContinent);
    }
    data = sortValues(selectedUniFeature, data);


    let svgToRemove = d3.select("#world-map").select("svg");
    svgToRemove.remove();

// Set the width and height of the SVG container
    const width = 860;
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

        // Draw city points
        const points = svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return projection([d.longitude, d.latitude])[0];
            })
            .attr("cy", function (d) {
                return projection([d.longitude, d.latitude])[1];
            })
            .attr("r", 2)
            .style("fill", (d, i) => {
                    return mainColor;
                }
            )
            .attr("id", function (d) {
                return "ID" + d.Rank;
            })
            .on("mouseover", function (d) {
                handleSelectUni(this.id);
                console.log(this.id);
            });
        /*
        let uni = sortValues(selectedUniFeature, data).slice(0, 3);
        uni.sort((a, b) => b[selectedUniFeature] - a[selectedUniFeature]);
        points.filter(d => uni.includes(d))
            .attr("r", 7)
            .style("fill", "#005259");
         */
    });
}


function drawCharts() {
    let scoresByLocation = groupByLocation("acode3", "location", "continent", selectedUniFeature);
    drawBarchart(scoresByLocation, "location", selectedUniFeature, "#bar-chart-location", 10, "acode3", 1);
    drawBarchart(universities, "institution", selectedUniFeature, "#bar-chart-universities", 10, "Rank");
    fillUniTable(universities);
    drawMap(universities);

}

drawCharts();


