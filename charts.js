function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var metadata_1 = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampArray = metadata_1.filter(sampleObj => sampleObj.id == sample);

    //  5. Create a variable that holds the first sample in the array.
    var firstSample = sampArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids_ = firstSample['otu_ids'];
    var otu_labels_ = firstSample['otu_labels'];
    var sample_values = firstSample['sample_values'];

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 


    var yticks = sampArray.map(sample_values => sample_values.otu_ids_).slice(0, 10).reverse();

    console.log(yticks);

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      text: otu_labels_.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h'
    } ];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {title: "Bacteria Sample Value" },
      yaxis: {title: yticks}
    };
    // 10. Use Plotly to plot the data with the layout. 

//Deliverable 2
// Bar and Bubble charts
// Create the buildCharts function.
// function buildCharts(sample) {
//   // Use d3.json to load and retrieve the samples.json file 
//   d3.json("samples.json").then((data) => {
//     var metadata_1 = data.samples;
//     // 4. Create a variable that filters the samples for the object with the desired sample number.
//     var sampArray = metadata_1.filter(sampleObj => sampleObj.id == sample);

//     //  5. Create a variable that holds the first sample in the array.
//     var firstSample = sampArray[0];


     // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids_1 = firstSample['otu_ids'];
    var otu_labels_1 = firstSample['otu_labels'];
    var sample_values1 = firstSample['sample_values'];

    var yticks_ = sample_values1.map(sample_values1 => parseInt(sample_values1));
    console.log(yticks_);

    // 1. Create the trace for the bubble chart.

    var bubbleData = [
      { y: yticks_,
        x: otu_ids_1,
        text: otu_labels_1,
        type: 'scatterplot',
        mode: 'markers',
        marker: {
          size: yticks_,
          sizemode: 'area',
          color: otu_ids_1,
          hover_data: [yticks_, otu_labels_1],
        }
      } ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures per Sample",
      xaxis: {title: "OTU ID" },
      yaxis: {title: "Sample Values"},
      property: 'hovermode'
    };

    // 3. Use Plotly to plot the data with the layout.
  

// // Create the buildChart function.
// function buildCharts(sample) {
//   // Use d3.json to load the samples.json file 
//   d3.json("samples.json").then((data) => {
//     console.log(data);
 
  var washFrequency = firstSample['wfreq'];

    // 3. Create a variable that holds the washing frequency.
    // Create the yticks for the bar chart.

  var yticks_2 = parseInt(washFrequency);
  
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: yticks_2,
        title: { text: "Wash Frequency" },
        type: "indicator",
        mode: "gauge+number",
        delta: {reference: 2},
        gauge: {axis: {range: [null, 10]}}

      }
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
        paper_bgcolor: "white",
        width: 600,
        height: 400,
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
    Plotly.newPlot('bubble',bubbleData, bubbleLayout); 
    Plotly.newPlot('bar', barData, barLayout);
  });
}
