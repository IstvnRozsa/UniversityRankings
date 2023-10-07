// Get a reference to the combobox element
let combobox = d3.select('#combobox');

// Populate the combobox with values from the list
combobox.selectAll('option')
    .data(features)
    .enter()
    .append('option')
    .text(function (d) {
        return d;
    });

// Handle the change event of the combobox
combobox.on('change', function () {
    // Get the selected value
    let selectedFeature = d3.select(this).property('value');


    drawBarchart(universities, "institution", selectedFeature, "#bar-chart-universities", 8);

    let scoresByLocation = groupByLocation("location", selectedFeature);
    drawBarchart(scoresByLocation, "location", selectedFeature, "#bar-chart-location", 8, 1);


});

