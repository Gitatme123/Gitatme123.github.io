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
    var firstSample_1 = sampArray[0];


    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids_ = firstSample_1['otu_ids']
    var otu_labels_ = firstSample_1['otu_labels']
    var sample_values = firstSample_1['sample_values']



    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otu_ids_.map(otu_ids_ => 'OTU ${otu_ids_}').slice(0,10).reverse();

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
      title: "Most Bacteria per otu label",
      xaxis: {title: "Bacteria Sample Value" },
      yaxis: {title: "OTU Label"}
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar', barData, barLayout);
  });
}


//Deliverable 2
// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    var metadata_1 = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampArray = metadata_1.filter(sampleObj => sampleObj.id == sample);

    //  5. Create a variable that holds the first sample in the array.
    var firstSample_2 = sampArray[0];


    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids_1 = firstSample_2['otu_ids']
    var otu_labels_1 = firstSample_2['otu_labels']
    var sample_values1 = firstSample_2['sample_values']

    

    // 1. Create the trace for the bubble chart.
    var bubbleData = [
      { y: sample_values1,
        x: otu_ids_1,
        text: otu_labels_1,
        type: 'bubble',
        mode: 'markers',
        marker: {
          size: [sample_values1],
          color: 'rivercolor',
          colorscale: [[0, 'rgb(0,0,255)'], [1, 'rgb(255,0,0)']],
          hover_data: [otu_ids_1],
        }
      } ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Bubble",
      xaxis: {title: "otu IDs" },
      yaxis: {title: "Sample Values"},
      property: 'hovermode'
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble',bubbleData, bubbleLayout); 
  });
}

// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 

    // Create a variable that filters the samples for the object with the desired sample number.

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.

    // Create a variable that holds the first sample in the array.
  

    // 2. Create a variable that holds the first sample in the metadata array.
    

    // Create variables that hold the otu_ids, otu_labels, and sample_values.


    // 3. Create a variable that holds the washing frequency.
   
    // Create the yticks for the bar chart.

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot();
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot();
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot();
  });
}
