// Use D3 fetch to read the JSON file
d3.json("data/samples.json").then((importedData) => {
    // Store the imported data to a variable
    var data = importedData;
    console.log(data);

    // Data is a object with keys "metadata", "names", "samples"
    // Create variable to each object key values
    var metadataInfoArray = data.metadata;
    var nameArray = data.names;
    var samplesArray = data.samples;

    // console.log(metadataInfoArray);
    // console.log(metadataInfoArray[1]);
    // console.log(nameArray[1]);
    // console.log(samplesArray[1]);
    // console.log(samplesArray[1].otu_ids)
    // console.log(samplesArray[1].otu_labels)
    // console.log(samplesArray[1].sample_values)



});

