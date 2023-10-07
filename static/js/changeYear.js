// Get a reference to the combobox element
let combobox_year = d3.select('#combobox-year');

// Populate the combobox with values from the list
combobox_year.selectAll('option')
    .data(years)
    .enter()
    .append('option')
    .text(function (d) {
        return d;
    });

// Handle the change event of the combobox
combobox_year.on('change', function () {
    // Get the selected value
    let selectedYear = d3.select(this).property('value');
    drawCountryScatterPlot("#country-scatter-plot", selectedFeature1, selectedFeature2, selectedYear);

});
