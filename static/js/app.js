

function buildPlot(SubjectID) {
    // Use D3 fetch to read the JSON file
    d3.json("data/samples.json").then((importedData) => {
        // Store the imported data to a variable
        var data = importedData;
        console.log(data);

        /* Data is a object with keys "metadata", "names", "samples"
         Create variable to each object key values */
        var metadataInfoArray = data.metadata;
        var namesArray = data.names;
        var samplesArray = data.samples;

        /* Data binding with the enter function to populate 
        the dropdown menu with subject ids available */
        d3.select('#selDataset')
            .selectAll('option')
            .data(namesArray)
            .enter()
            .append('option')
            .attr("value", function (data, index) {
                return data;
            })
            .text(function (data, index) {
                return data;
            });


        // Retrieve the metada based on the subject selected
        metadataKeys = [];
        var metadataKeys = metadataInfoArray.filter(function (element) {
            if (element.id === SubjectID) {
                return element
            };
        });

        // Remove the metada
        d3.select("#sample-metadata")
            .selectAll('p')
            .remove()

        // Load the metadata painel with the selected metadata
        selecteMetadatavalues = Object.values(metadataKeys[0]);
        metadataKeys = [`id: ${selecteMetadatavalues[0]}`,
        `ethnicity: ${selecteMetadatavalues[1]}`,
        `gender: ${selecteMetadatavalues[2]}`,
        `age: ${selecteMetadatavalues[3]}`,
        `location: ${selecteMetadatavalues[4]}`,
        `bbtype: ${selecteMetadatavalues[5]}`,
        `wfreq: ${selecteMetadatavalues[6]}`];
        d3.select("#sample-metadata")
            .selectAll('p')
            .data(metadataKeys)
            .enter()
            .append('p')
            .text(function (data, index) {
                return data;
            });


        // Retrieve the samples based on the subject selected
        var selecteSampleObject = samplesArray.filter(function (element) {
            if (parseInt(element.id) === SubjectID) {
                return element
            };
        });
        selecteSample = Object.values(selecteSampleObject[0]);



        // Create an object with sample ids and values to sort the values
        var list_samples = [];
        for (var j = 0; j < selecteSample[1].length; j++)
            list_samples.push({ 'otu_ids': selecteSample[1][j], 'sample_values': selecteSample[2][j], 'otu_labels': selecteSample[3][j] });



        // Sort the samples in descending order of sample values
        list_samples.sort((a, b) => b.sample_values - a.sample_values);

        // To retrieve the first 10 items
        var top10SelSamples = list_samples.slice(0, 10);

        // Reverse the list due to the Plotly requeriments
        top10SelSamples.reverse()

        // Trace1 to display the top 10 OTUs found in that individual
        var trace1 = {
            x: top10SelSamples.map(element => element.sample_values),
            y: top10SelSamples.map(element => `OTU ${element.otu_ids}`),
            text: top10SelSamples.map(element => element.otu_labels),
            type: "bar",
            orientation: "h"
        };

        // create an array to be plotted
        var chartData = [trace1];

        // Render the plot to the div tag id "plot"
        Plotly.newPlot("bar", chartData);
    });
};


buildPlot(940)



// Event listen to update page based on the dropdown selection
function updatePage() {

    var dropdown = d3.select('#selDataset');
    var dropdownValue = dropdown.property('value');
    console.log(dropdownValue);

    var SubjectID = parseInt(dropdownValue);

    // Build the plot with the new stock
    buildPlot(SubjectID);
};


d3.select('#selDataset').on('change', updatePage);



// // Submit Button handler
// function handleSubmit() {
//     // Prevent the page from refreshing
//     d3.event.preventDefault();

//     // Select the input value from the form
//     var stock = d3.select("#stockInput").node().value;
//     console.log(stock);

//     // clear the input value
//     d3.select("#stockInput").node().value = "";

//     // Build the plot with the new stock
//     buildPlot(stock);
// }

// // Add event listener for submit button
// d3.select("#selDataset").on("change", SubjectID);
