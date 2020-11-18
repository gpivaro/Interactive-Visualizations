
// Create the main function to get the data and generate the plots
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
        metadataKeys = [
            `id: ${selecteMetadatavalues[0]}`,
            `ethnicity: ${selecteMetadatavalues[1]}`,
            `gender: ${selecteMetadatavalues[2]}`,
            `age: ${selecteMetadatavalues[3]}`,
            `location: ${selecteMetadatavalues[4]}`,
            `bbtype: ${selecteMetadatavalues[5]}`,
            `wfreq: ${selecteMetadatavalues[6]}`
        ];
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
            list_samples.push({
                'otu_ids': selecteSample[1][j],
                'sample_values': selecteSample[2][j],
                'otu_labels': selecteSample[3][j]
            });


        // Sort the samples in descending order of sample values
        list_samples.sort((a, b) => b.sample_values - a.sample_values);

        // To retrieve the first 10 items
        var top10SelSamples = list_samples;
        top10SelSamples = top10SelSamples.slice(0, 10)

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

        // Responsive chart
        var config = { responsive: true }

        // Render the plot to the div tag id "plot"
        Plotly.newPlot("bar", chartData, config);

        // Create a bubble chart that displays each sample.
        var trace2 = {
            x: list_samples.map(element => element.otu_ids),
            y: list_samples.map(element => element.sample_values),
            mode: 'markers',
            marker: {
                size: list_samples.map(element => element.sample_values),
                color: list_samples.map(element => element.otu_ids),
                type: "scatter",
            },
            text: list_samples.map(element => element.otu_labels)
        };

        // create an array to be plotted
        var chartData2 = [trace2];

        var layout = {
            xaxis: { title: 'OTU ID' },
            yaxis: { title: 'Sample Values' }
        }

        // Responsive chart
        var config = { responsive: true }

        // Render the plot to the div tag id "bubble"
        Plotly.newPlot("bubble", chartData2, layout, config);


        // Adapt the Gauge Chart to plot the weekly washing frequency of the individual.
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: selecteMetadatavalues[6],
                gauge: {
                    axis: { visible: true, range: [0, 9] },
                    bar: { color: "darkblue" },
                    steps: [
                        { range: [0, 1], color: 'rgb(255, 255, 0)' },
                        { range: [1, 2], color: 'rgb(239, 255, 0)' },
                        { range: [2, 3], color: 'rgb(223, 255, 0)' },
                        { range: [3, 4], color: 'rgb(207, 255, 0)' },
                        { range: [4, 5], color: 'rgb(191, 255, 0)' },
                        { range: [5, 6], color: 'rgb(175, 255, 0)' },
                        { range: [6, 7], color: 'rgb(159, 255, 0)' },
                        { range: [7, 8], color: 'rgb(143, 255, 0)' },
                        { range: [8, 9], color: 'rgb(127, 255, 0)' },
                    ]
                },
                title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week" },
                type: "indicator",
                mode: "gauge+number",
            }
        ];

        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };

        var config = { responsive: true }




        // d3.select('#gauge')
        //     .selectAll('div')
        //     .remove('h2')

        Plotly.newPlot('gauge', data, layout, config);


        // d3.select("main-svg")
        //     .selectAll('p')
        //     .append('p')
        //     .html('<h2>Belly Button Washing Frequency</h2>');




    });
};


// Event listen to update page based on the dropdown selection
function updatePage() {

    var dropdown = d3.select('#selDataset');
    var dropdownValue = dropdown.property('value');
    // console.log(dropdownValue);

    // Parse the dropdown values as integer
    var SubjectID = parseInt(dropdownValue);

    // Build the plot with the new stock
    buildPlot(SubjectID);
};


// Load the page for the first time with SubjectID = 940
buildPlot(940);


// Handler for the dropdown change
d3.select('#selDataset').on('change', updatePage);