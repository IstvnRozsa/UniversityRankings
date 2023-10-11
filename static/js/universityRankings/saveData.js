// Sample JSON data (list of objects)
var jsonData = [
    {name: "John", age: 30, city: "New York"},
    {name: "Alice", age: 25, city: "Chicago"},
    {name: "Bob", age: 35, city: "Los Angeles"}
];

function saveAs(jsonData) {

// Convert JSON data to a JSON string
    var jsonString = JSON.stringify(jsonData, null, 2);

// Create a Blob with the JSON data
    var blob = new Blob([jsonString], {type: "application/json"});

// Create a download link
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'data.json'; // Specify the file name
    document.body.appendChild(a);
    a.click();

// Clean up
    window.URL.revokeObjectURL(url);
}

// Event listener for the export button click
document.getElementById('export-button').addEventListener('click', function () {
    saveAs(jsonData); // Save the blob as a file
});
