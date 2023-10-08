
let selectedUni = "ID1";

function handleSelectUni(uniId) {
    selectedUni = uniId;

    let svg_map_circles = d3.select("#world-map");
    let svg_uni_chart = d3.select("#bar-chart-universities");

    let circleID = "circle#" + selectedUni;
    let rectID = "rect#" + selectedUni;

    svg_map_circles.selectAll("circle").style("fill", secondaryColor).attr("r", 2);
    svg_map_circles.select(circleID).attr("r", 8).style("fill", highlightColor);

    svg_uni_chart.selectAll(".bar").attr("fill", mainColor);
    svg_uni_chart.select(rectID).attr("fill", highlightColor);
}


let selectedUniFeature = "ar score";
let comboboxScoreType = d3.select('#combobox-uni-feature');

// Populate the comboboxScoreType with values from the list
comboboxScoreType.selectAll('option')
    .data(uni_features)
    .enter()
    .append('option')
    .text(function (d) {
        return d;
    });

// Handle the change event of the comboboxScoreType
comboboxScoreType.on('change', function () {
    selectedUniFeature = d3.select(this).property('value');
    drawBarcharts();
});


let selectedContinent = "No Selection";
let comboboxContinent = d3.select('#combobox-continent');

// Populate the comboboxScoreType with values from the list
comboboxContinent.selectAll('option')
    .data(continents)
    .enter()
    .append('option')
    .text(function (d) {
        return d;
    });

// Handle the change event of the comboboxScoreType
comboboxContinent.on('change', function () {
    selectedContinent = d3.select(this).property('value');
    drawBarcharts();
    drawMap(universities);
});



function handleSelectCountry(countryId) {
    let data = universities.filter(d => d["acode3"] === countryId.slice(2));
    if (data.length !== 0) {
        console.log(selectedUniFeature);
        let svg_country_chart = d3.select("#bar-chart-location");
        let rectID = "rect#" + countryId;
        svg_country_chart.selectAll(".bar").attr("fill", mainColor);
        svg_country_chart.select(rectID).attr("fill", highlightColor);
        drawBarchart(data, "institution", selectedUniFeature, "#bar-chart-universities", 8, "Rank");
        fillUniTable(data);
    }


}
