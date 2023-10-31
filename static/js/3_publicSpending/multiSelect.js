let comboboxMulti = d3.select('#combo-multi');
var labels = d3.select("#labels-div");

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Populate the comboboxScoreType with values from the list
comboboxMulti.selectAll('option')
    .data(locations)
    .enter()
    .append('option')
    .text(function (d) {
        return d;
    });

// Handle the change event of the comboboxScoreType
comboboxMulti.on('change', function () {
    var selectedItems = d3.selectAll("#combo-multi option:checked").nodes().map(function(option) {
        return option.value;
      });
    console.log(selectedItems);

    d3.select("#labels-div").selectAll("li").remove();
    var myColors = [];
    for (let i = 0; i < selectedItems.length; i++) {
        var color = getRandomColor();
        var liElement = labels.append("li").text(selectedItems[i]);

        // Set the color of the <p> element
        liElement.style("color", color);
        myColors.push(color);
    }
    drawMultiLinePlot(selectedItems, myColors);
});