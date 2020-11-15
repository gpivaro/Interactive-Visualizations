// Use D3 fetch to read the JSON file
d3.json("data/samples.json").then((importedData) => {
    // Store the imported data to a variable
    var data = importedData;
    console.log(data);


    // Data is a object with keys "metadata", "names", "samples"
    // Create variable to each object key values
    var metadataInfoArray = data.metadata;
    var namesArray = data.names;
    var samplesArray = data.samples;


    console.log(namesArray);

    // Data binding with the enter function to populate the dropdown menu with subject ids available
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
        })
        .attr('value = 1');



    // console.log(d3.select('#selDataset').selectAll('option').data())


    samplesArray.forEach(element => {
        // console.log(Object.entries(element));
    });

    selectSubject = {}
    samplesArray.forEach(element => {
        if (element.id == 940) {
            // console.log(element);
            // console.log(element.otu_ids);
            element.otu_ids.forEach(otu => {
                // console.log(otu);
                selectSubject['otu_ids'] = otu;

            })
        }
    });
    // console.log(selectSubject);
    // console.log(metadataInfoArray);
    // console.log(metadataInfoArray[1]);
    // console.log(namesArray);
    // console.log(samplesArray[1]);
    // console.log(samplesArray[1].otu_ids);
    // console.log(samplesArray[1].otu_labels);
    // console.log(samplesArray[1].sample_values);
    // var arraySamples = samplesArray[1].map(datapoint => datapoint)

    // Slice the individual data array
    var top10outIDS = samplesArray[1].otu_ids.slice(0, 10);
    var top10samples = samplesArray[1].sample_values.slice(0, 10);

    // Create the label for the otu_ids
    var top10outIDSLabel = top10outIDS.map(element => 'OTU ' + element);



    // Trace1 to display the top 10 OTUs found in that individual
    var trace1 = {
        x: top10samples,
        y: top10outIDSLabel,
        type: "bar",
        orientation: "h"
    };

    // create an array to be plotted
    var chartData = [trace1];

    // Render the plot to the div tag id "plot"
    Plotly.newPlot("bar", chartData);
});


var dropdown = d3.select('#selDataset');
var dropdownValue = dropdown.property('value');
// dropdownValue.on('change', console.log(dropdownValue))



/* <select id="selDataset" onchange="optionChanged(this.value)"></select> */


// function optionChanged(this.value) { };

{/* <option value="940">940</option> */ }