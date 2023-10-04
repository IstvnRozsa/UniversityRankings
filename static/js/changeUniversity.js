
var previousUniId = "ID1";

function handleClick(selectedUni) {
    previousUni = selectedUni;

    //d3.select("#selected_team").text(selectedUni);
    //d3.select("#team1list").text(selectedUni);

    let svg_map_circles = d3.select("#world-map");
    let svg_uni_chart = d3.select("#bar-chart-universities");

    let circleID = "circle#" + selectedUni;
    let rectID = "rect#" + selectedUni;

    svg_map_circles.selectAll("circle").style("fill", "#007bff").attr("r", 2);//fd6464
    svg_map_circles.select(circleID).attr("r", 8).style("fill", "#fd6464");

    svg_uni_chart.selectAll(".bar").attr("fill", "#007bff");
    svg_uni_chart.select(rectID).attr("fill", "#fd6464");
}