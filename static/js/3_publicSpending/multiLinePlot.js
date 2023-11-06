function drawMultiLinePlot(selectedLocations, myColors) {
    let margin = {top: 5, right: 30, bottom: 60, left: 60};
    let width = document.getElementsByClassName("diagram-container")[0].offsetWidth - margin.left - margin.right - 30;
    let height = 400 - margin.top - margin.bottom;

    let svgToRemove = d3.select("#countries-line-plot").select("svg");
    svgToRemove.remove();

    let linePlotSvg = d3.select("#countries-line-plot")
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


    x.domain([1990, 2016]);
    linePlotSvg.selectAll(".myXaxis").transition()
        .duration(500)
        .call(xAxis);


    y.domain([0, 10]);
    linePlotSvg.selectAll(".myYaxis")
        .transition()
        .duration(500)
        .call(yAxis);

    const numScaleLines = 10; // Number of scale lines you want

    for (let i = 0; i < numScaleLines; i++) {
        linePlotSvg.append("line")
            .attr("x1", 0)
            .attr("y1", y(i))
            .attr("x2", width)
            .attr("y2", y(i))
            .attr("stroke", "lightgray")
            .attr("stroke-dasharray", "2,2"); // Optional dashed lines
    }

    for (let i = 0; i < selectedLocations.length; i++) {
        var items = edu_spendings.filter(d => d["country"] === selectedLocations[i]).sort((a, b) => b["year"] - a["year"]);
        items = items.filter(d => d["year"] >= 1990);
        items = items.filter(d => d["year"] <= 2016);
        // Create an update selection: bind to the new data
        const u = linePlotSvg.selectAll(".myLine" + i.toString())
            .data([items], function (d) {
                return d["year"];
            });

        // Updata the line
        u
            .join("path")
            .attr("class", "myLine" + i.toString())
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
            .attr("stroke", myColors[i])
            .attr("stroke-width", 2.5)

    }
}

// At the beginning, I run the update function on the first dataset:
drawMultiLinePlot();