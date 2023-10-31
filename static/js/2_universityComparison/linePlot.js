function drawLinePlot(id) {
    d3.select("#country1-text").text(selectedCountry1).style("color",mainColor);
    d3.select("#country2-text").text(selectedCountry2).style("color",secondaryColor);

    let country1 = edu_spendings.filter(d => d["country"] === selectedCountry1).sort((a, b) => b["year"] - a["year"]);
    let country2 = edu_spendings.filter(d => d["country"] === selectedCountry2).sort((a, b) => b["year"] - a["year"]);
    country1 = country1.filter(d => d["year"] >= 1990)
    country2 = country2.filter(d => d["year"] >= 1990)
    console.log("Country1", country1);
    console.log("Country2", country2);


    let margin = {top: 20, right: 30, bottom: 60, left: 60};
    let width = 800 - margin.left - margin.right;
    let height = 400 - margin.top - margin.bottom;

    let svgToRemove = d3.select("#uni-spendings-lineplot").select("svg");
    svgToRemove.remove();

    let linePlotSvg = d3.select("#uni-spendings-lineplot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Initialise X axis:
    const x = d3.scaleLinear().range([0, width]);
    const xAxis = d3.axisBottom().scale(x);


    linePlotSvg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .attr("class", "myXaxis")
        .attr("ticks", '7')


    // Initialize Y axis
    const y = d3.scaleLinear().range([height, 0]);
    const yAxis = d3.axisLeft().scale(y);
    linePlotSvg.append("g")
        .attr("class", "myYaxis")

    // Create the X axis:
    x1_min = d3.min(country1, function (d) {
        return d["year"];
    });
    x2_min = d3.min(country2, function (d) {
        return d["year"];
    });
    x1_max = d3.max(country1, function (d) {
        return d["year"];
    });
    x2_max = d3.max(country2, function (d) {
        return d["year"];
    });

    x.domain([d3.min([x1_min, x2_min]), d3.max([x1_max, x2_max])]);
    linePlotSvg.selectAll(".myXaxis").transition()
        .duration(500)
        .call(xAxis);


    // create the Y axis
    y1_max = d3.max(country1, function (d) {
        return d["spending_per_gdp"];
    });
    y2_max = d3.max(country2, function (d) {
        return d["spending_per_gdp"];
    });
    y.domain([0, d3.max([y1_max, y2_max])]);
    linePlotSvg.selectAll(".myYaxis")
        .transition()
        .duration(500)
        .call(yAxis);

    // Create an update selection: bind to the new data
    const u = linePlotSvg.selectAll(".lineTest")
        .data([country1], function (d) {
            return d["year"];
        });

    // Updata the line
    u
        .join("path")
        .attr("class", "lineTest")
        .transition()
        .duration(500)
        .attr("d", d3.line()
            .x(function (d) {
                return x(d["year"]);
            })
            .y(function (d) {
                return y(d["spending_per_gdp"]);
            }))
        .attr("fill", "none")
        .attr("stroke", mainColor)
        .attr("stroke-width", 2.5)


    // Create an update selection: bind to the new data
    const u2 = linePlotSvg.selectAll(".lineTest2")
        .data([country2], function (d) {
            return d["year"];
        });

    // Updata the line
    u2
        .join("path")
        .attr("class", "lineTest2")
        .transition()
        .duration(500)
        .attr("d", d3.line()
            .x(function (d) {
                return x(d["year"]);
            })
            .y(function (d) {
                return y(d["spending_per_gdp"]);
            }))
        .attr("fill", "none")
        .attr("stroke", secondaryColor)
        .style("stroke-dasharray", ("3, 3"))
        .attr("stroke-width", 2.5)
}

// At the beginning, I run the update function on the first dataset:
drawLinePlot();