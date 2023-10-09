
let selectedCountry1 = "United States";
let comboboxCountry1 = d3.select('#combobox-country1');

// Populate the comboboxScoreType with values from the list
comboboxCountry1.selectAll('option')
    .data(locations)
    .enter()
    .append('option')
    .text(function (d) {
        return d;
    });

// Handle the change event of the comboboxScoreType
comboboxCountry1.on('change', function () {
    selectedCountry1 = d3.select(this).property('value');
    drawHorizontalBarcharts(selectedCountry1, selectedCountry2);
    drawLinePlot();
});




let selectedCountry2 = "United States";
let comboboxCountry2 = d3.select('#combobox-country2');

// Populate the comboboxScoreType with values from the list
comboboxCountry2.selectAll('option')
    .data(locations)
    .enter()
    .append('option')
    .text(function (d) {
        return d;
    });

// Handle the change event of the comboboxScoreType
comboboxCountry2.on('change', function () {
    selectedCountry2 = d3.select(this).property('value');
    drawHorizontalBarcharts(selectedCountry1, selectedCountry2);
    drawLinePlot();
});

let selectedUniFeature2 = "ar score";
let comboboxScoreType2 = d3.select('#combobox-uni-feature2');

// Populate the comboboxScoreType with values from the list
comboboxScoreType2.selectAll('option')
    .data(uni_features)
    .enter()
    .append('option')
    .text(function (d) {
        return d;
    });

// Handle the change event of the comboboxScoreType
comboboxScoreType2.on('change', function () {
    selectedUniFeature2 = d3.select(this).property('value');
    drawHorizontalBarcharts(selectedCountry1, selectedCountry2);
});