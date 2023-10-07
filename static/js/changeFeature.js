let selectedUniFeature = "ar score";
// Get a reference to the comboboxScoreType element
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
    // Get the selected value
    selectedUniFeature = d3.select(this).property('value');
    d3.select("#score-text").text(selectedUniFeature);


    let scoresByLocation = groupByLocation("location", 'continent', selectedUniFeature);
    drawBarchart(scoresByLocation, "location", selectedUniFeature, "#bar-chart-location", 15, 1);

    drawBarchart(universities, "institution", selectedUniFeature, "#bar-chart-universities", 8);


});


let selectedContinent = "No Selection";
// Get a reference to the comboboxScoreType element
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
    // Get the selected value
    selectedContinent = d3.select(this).property('value');
    let scoresByLocation = groupByLocation("location", 'continent', selectedUniFeature);
    drawBarchart(scoresByLocation, "location", selectedUniFeature, "#bar-chart-location", 15, 1);

    drawBarchart(universities, "institution", selectedUniFeature, "#bar-chart-universities", 8);


});
