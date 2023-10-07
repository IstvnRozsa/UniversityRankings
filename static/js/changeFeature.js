// Get a reference to the combobox element
let combobox = d3.select('#combobox-uni-feature');

// Populate the combobox with values from the list
combobox.selectAll('option')
    .data(uni_features)
    .enter()
    .append('option')
    .text(function (d) {
        return d;
    });

// Handle the change event of the combobox
combobox.on('change', function () {
    // Get the selected value
    let selectedUniFeature = d3.select(this).property('value');
    d3.select("#score-text").text(selectedUniFeature);



    drawBarchart(universities, "institution", selectedUniFeature, "#bar-chart-universities", 8);

    let scoresByLocation = groupByLocation("location", selectedUniFeature);
    drawBarchart(scoresByLocation, "location", selectedUniFeature, "#bar-chart-location", 15, 1);


});

