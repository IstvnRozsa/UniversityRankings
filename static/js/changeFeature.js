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


    let topUniversities = sortValues(selectedFeature, universities).slice(0, 5);
    drawBarchart(topUniversities, "institution", selectedFeature, "#bar-chart-universities");

    let scoresByLocation = groupByLocation("location", selectedFeature);
    let scoresByLocationSorted = sortValues(selectedFeature, scoresByLocation).slice(0, 5);
    drawBarchart(scoresByLocationSorted, "location", selectedFeature, "#bar-chart-location");


});

