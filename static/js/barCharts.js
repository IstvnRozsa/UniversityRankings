console.log(universities);
console.log(features);


function drawBarchart(universities, x, y, id) {
    let svgToRemove = d3.select(id).select("svg");
    svgToRemove.remove();


// Set the dimensions and margins of the chart
    let width = 500;
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
        .domain([0, d3.max(universities, function (d) {
            return d[y];
        })])
        .range([innerHeight, 0]);

// Create the bars
    let bars = chart.selectAll(".bar")
        .data(universities)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("fill", "#007bff")
        .attr("id", d => "ID" + d["Rank"])
        .attr("x", d => xScale(d[x]))
        .attr("y", d => yScale(d[y]))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d[y]))
        .on("click", function (d) {
            console.log(this.id);
            handleClick(this.id);
        })

    chart.selectAll(".bar-label")
        .data(universities)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", d => xScale(d[x]) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d[y]) - 5) // Adjust the vertical position
        .attr("text-anchor", "middle") // Center the text horizontally
        .text(d => d[y]);


// Create the x-axis
    chart.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-7)");

// Create the y-axis
    chart.append("g")
        .call(d3.axisLeft(yScale));
}

function sortValues(feature, universities) {
    //sort the dataset based on the feature
    universities.sort(function (a, b) {
        return b[feature] - a[feature];
    });
    return universities;
}


let topUniversities = sortValues("score scaled", universities).slice(0,5);
drawBarchart(topUniversities, "institution", "score scaled", "#bar-chart-universities");

function groupByLocation(categoryName, totalPropertyName) {

    var groupedData = universities.reduce(function(acc, obj) {
    var key = obj[categoryName];
    if (!acc[key]) {
        acc[key] = {};
        acc[key][categoryName] = key;
        acc[key][totalPropertyName] = 0;
    }
    acc[key][totalPropertyName] += obj[totalPropertyName];
    return acc;
}, {});

// Convert the groupedData object back to an array
var result = Object.values(groupedData);

    console.log(result);
    return result;
}

let scoresByLocation = groupByLocation("location","score scaled");
let scoresByLocationSorted = sortValues("score scaled", scoresByLocation).slice(0,5);
drawBarchart(scoresByLocationSorted, "location", "score scaled", "#bar-chart-location");


