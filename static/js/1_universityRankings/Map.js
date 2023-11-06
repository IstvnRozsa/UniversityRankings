var mapWidth = document.getElementsByClassName("diagram-container")[0].offsetWidth - 50;
var uniMap = document.getElementById("uni-map");
uniMap.style.width = mapWidth + "px";
uniMap.style.height = "500px";

var mydata = universities; //var data = universities.filter(d => d["continent"] === "Africa");
mydata = mydata.sort(function (a, b) {
    return b["ar score"] - a["ar score"];
});
var uniMap = L.map('uni-map').setView([0, 0], 2);

var uniTiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(uniMap);

var popups = [];
universities.forEach(function (obj) {
    console.log("Bajos:", obj);
    if (obj.latitude != null || obj.longitude != null) {

        var html = `
                    <h3>${obj.institution}</h3>
                    <p>
                    
                    <ul>
                      <li><b>Academic Reputation score:</b> ${obj["ar score"]}</li>
                      <li><b>Employer Reputation score</b> ${obj["er score"]}</li>
                      <li><b>Faculty Student score</b> ${obj["fsr score"]}</li>
                      <li><b>Citations per faculty score:</b> ${obj["cpf score"]}</li>
                      <li><b>International Faculty score:</b> ${obj["ifr score"]}</li>
                      <li><b>International Students score:</b> ${obj["isr score"]}</li>
                      <li><b>International Research Network score:</b> ${obj["irn score"]}</li>
                      <li><b>Employment Outcome score:</b> ${obj["ger score"]}</li>
                      <li><b>Overall:</b> ${obj["score scaled"]}</li>
                    </ul>
                    </p>
                `;
        var iconName = "";
        var iconSize = [];
        if (obj<10){
            iconName = "pin1.png"
            iconSize = [10, 10];
        }else if(10 <= obj["ar score"] && obj["ar score"] <20){
            iconName = "pin2.png";
            iconSize = [10, 10];
        }else if(20 <= obj["ar score"] && obj["ar score"] <30){
            iconName = "pin3.png";
            iconSize = [15, 15];
        }else if(30 <= obj["ar score"] && obj["ar score"] <40){
            iconName = "pin4.png";
            iconSize = [15, 15];
        }else if(40 <= obj["ar score"] && obj["ar score"] <50){
            iconName = "pin5.png"
            iconSize = [20, 20];
        }else if(50 <= obj["ar score"] && obj["ar score"] <60){
            iconName = "pin6.png";
            iconSize = [20, 20];
        }else if(60 <= obj["ar score"] && obj["ar score"] <70){
            iconName = "pin7.png";
            iconSize = [25, 25];
        }else if(70 <= obj["ar score"] && obj["ar score"] <80){
            iconName = "pin8.png";
            iconSize = [30, 30];
        }else if(80 <= obj["ar score"] && obj["ar score"] <90){
            iconName = "pin9.png";
            iconSize = [30, 30];
        }else if(90 <= obj["ar score"] && obj["ar score"] <100){
            iconName = "pin10.png";
            iconSize = [35, 35];
        }else{
            iconName = "pin1.png";
            iconSize = [10, 10];
        }
        var customIcon = L.icon({
            iconUrl: '../static/imgs/'+iconName,
            iconSize: iconSize
        });
        var myMarker = L.marker([obj.latitude, obj.longitude],{icon: customIcon}).bindPopup(html);
        popups["ID" + obj.Rank] = myMarker;
        //myMarker.setStyle({fillColor: 'green'});
        myMarker.addTo(uniMap);
    }



});



function getColorUni(d) {
    return d > 90 ? '#184e77' :
           d > 80 ? '#1e6091' :
           d > 70 ? '#1a759f' :
           d > 60  ? '#168aad' :
           d > 50  ? '#34a0a4' :
           d > 40  ? '#52b69a' :
           d > 30   ? '#76c893' :
           d > 20   ? '#99d98c' :
           d > 10   ? '#b5e48c' :
                      '#d9ed92';
}


var uniLegend = L.control({position: 'bottomright'});

uniLegend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorUni(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

uniLegend.addTo(uniMap);
