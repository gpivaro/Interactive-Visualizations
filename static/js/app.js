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

    // Define the subject ID to load the page
    SubjectID = 940;

    // Retrieve the metada based on the subject selected
    var metadataKeys = metadataInfoArray.filter(function (element) {
        if (element.id === SubjectID) {
            return element
        };
    });

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
    console.log(selecteSample);


    // Create an object with sample ids and values to sort the values
    var list_samples = [];
    for (var j = 0; j < selecteSample[1].length; j++)
        list_samples.push({ 'otu_ids': selecteSample[1][j], 'sample_values': selecteSample[2][j] });

    console.log(list_samples);

    // Sort the samples in descending order of sample values
    list_samples.sort((a, b) => b.sample_values - a.sample_values);
    console.log(list_samples);

    // To retrieve the first 10 items
    var top10SelSamples = list_samples.slice(0, 10);
    console.log("First 10 values: ", top10SelSamples);

    // Reverse the list due to the Plotly requeriments
    console.log(top10SelSamples.reverse());

    // Trace1 to display the top 10 OTUs found in that individual
    var trace1 = {
        x: top10SelSamples.map(element => element.sample_values),
        y: top10SelSamples.map(element => `OTU ${element.otu_ids}`),
        type: "bar",
        orientation: "h"
    };



    /* *********************************Working already*************************** */


    // console.log(metadataInfoArray.map(element => element.id === SubjectID));

    // console.log(metadataInfoArray.forEach(filterMetada));
    // console.log(selectedMetadata);



    // function selectSubjectID(element, SubjectID) {
    //     return element.id === SubjectID
    // };

    // var selectedMetadata = metadataInfoArray.filter(selectSubjectID(SubjectID));
    // console.log(selectedMetadata);




    // console.log(metadataInfoArray[0].id)

    // function filterSubject(key, findValue) {
    //     element.key === findValue
    // };

    // metadataInfoArray.filter(filterSubject(key, 940))




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
    // var trace1 = {
    //     x: top10samples,
    //     y: top10outIDSLabel,
    //     type: "bar",
    //     orientation: "h"
    // };

    // create an array to be plotted
    var chartData = [trace1];

    // Render the plot to the div tag id "plot"
    Plotly.newPlot("bar", chartData);
});



d3.select('#selDataset').on('change', updatePage);

// Event listen to update page based on the dropdown selection
function updatePage() {

    var dropdown = d3.select('#selDataset');
    var dropdownValue = dropdown.property('value');
    console.log(dropdownValue);

    var SubjectID = parseInt(dropdownValue);



};

function filterSubject(key, findValue) {
    element => element.key === findValue
};

