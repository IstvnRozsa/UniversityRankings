let selectedFeature1 = "Agricultural land (% of land area)";
let selectedFeature2 = "Agricultural land (% of land area)";

function handleChangeFeature(){
    console.log(selectedFeature1);
    console.log(selectedFeature2);
    drawCountryScatterPlot("#country-scatter-plot",selectedFeature1,selectedFeature2, 2016)
}



// Get a reference to the combobox element
let combobox_f1 = d3.select('#combobox-feature1');

// Populate the combobox with values from the list
combobox_f1.selectAll('option')
    .data(country_features)
    .enter()
    .append('option')
    .text(function (d) {
        return d;
    });

// Handle the change event of the combobox
combobox_f1.on('change', function () {
    // Get the selected value
    selectedFeature1 = d3.select(this).property('value');
    handleChangeFeature();
});

// Get a reference to the combobox element
let combobox_f2 = d3.select('#combobox-feature2');

// Populate the combobox with values from the list
combobox_f2.selectAll('option')
    .data(country_features)
    .enter()
    .append('option')
    .text(function (d) {
        return d;
    });

// Handle the change event of the combobox
combobox_f2.on('change', function () {
    // Get the selected value
    selectedFeature2 = d3.select(this).property('value');
    handleChangeFeature();
});
