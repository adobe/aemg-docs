window.addEventListener('DOMContentLoaded', function () {
    var parent = document.querySelector(".chart-container");
    if (document.querySelector(".chart-container canvas.eligible-categories-bar")) return;
  
    var canvas = document.createElement("canvas");
    canvas.classList.add("eligible-categories-bar");
  
    var ctx = canvas.getContext('2d');
  
    // Get the table data dynamically
    var table = document.querySelector('.eligibility-bar-table') || document.createElement("div");
    var rows = table.querySelectorAll('tbody .row');

    // Arrays to hold chart data
    var labels = [];
    var assetsEvaluationData = [];
    var selectionProcessData = [];
  
    rows.forEach(function(row) {
      var cells = row.querySelectorAll('td');
      labels.push(cells[0].innerText); // Year
      assetsEvaluationData.push(parseInt(cells[1].innerText)); // Assets Evaluation
      selectionProcessData.push(parseInt(cells[2].innerText)); // Selection Process
    });
  
    if(!labels.length) {
      return;
    }
 
    parent.appendChild(canvas);
    
    const asisColor = "#87A3FB";
  
    // Create the chart
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Assets Evaluation',
            data: assetsEvaluationData,
            backgroundColor: '#FFD700',
            borderColor: '#FFD700',  // Use the CSS variable for border color
            borderWidth: 1
          },
          {
            label: 'Selection Process',
            data: selectionProcessData,
            backgroundColor: '#01EA57',
            borderColor: '#01EA57',  // Use the CSS variable for border color
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          x: {
            grid: {
              color: asisColor, // Grid line color
              borderColor: asisColor,  // Border color for x-axis
              borderWidth: 1 // Optional: Set width of the axis border
            },
            ticks: {
              color: asisColor, // Tick label color for x-axis
              font: {
                size: 16,  // Set font size for x-axis labels
                weight: 'bold' // Optional: Set font weight for x-axis labels
              }
            }
          },
          y: {
            grid: {
              color: asisColor, // Grid line color
              borderColor: asisColor, // Border color for y-axis
              borderWidth: 1 // Optional: Set width of the axis border
            },
            ticks: {
              beginAtZero: true,
              color: asisColor, // Tick label color for y-axis
              font: {
                size: 14,  // Set font size for y-axis labels
                weight: 'bold' // Optional: Set font weight for y-axis labels
              }
            }
          }
        },
        legend: {
          labels: {
            color: asisColor  // Change the color of the legend labels (dataset label colors)
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: asisColor,  // Dataset label color (legend label)
              font: {
                size: 14  // Optional: Set the font size for the legend
              }
            }
          }
        }
      }
    });
  });


  window.addEventListener('DOMContentLoaded', function () {
  // Check if the chart already exists to prevent multiple creations
  if (document.querySelector(".chart-container .assets-evaluation-polar")) {
    return; // Exit if a canvas already exists
  }

  // Create a canvas element
  var canvas = document.createElement("canvas");
  canvas.classList.add('assets-evaluation-polar');

  // Ensure the chart container exists before appending
  var chartContainer = document.querySelector(".chart-container");
  if (!chartContainer) {
    console.warn("Chart container not found");
    return;
  }

  // Append the canvas to the ".chart-container" element
  chartContainer.appendChild(canvas);

  // Get the 2D context of the canvas
  var ctx = canvas.getContext('2d');


  var tableObj = getTableData();
  renderChart(ctx, tableObj)
});

function renderChart(ctx, tableObj) {
  // Create the chart
  var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: tableObj.col1,
      datasets: [{
        label: 'Eligible Assets Evaluation',
        data: tableObj.col2,  // Data values for the chart
        backgroundColor: [
          '#2C2C2E',
          '#DE6D00',
          '#07635E',
          '#04C2C7',
          '#013220'
        ],
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        legend: {
          display: true,
          position: "left",
          align: "start",
          labels: {
            font: {
              size: 14,
              family: 'Manrope, sans-serif',
              color: '#2C343B'
            }
          }
        }
      },
      layout: {
        padding: {
          top: 40,
          bottom: 20,
          left: 10,
          right: 10
        }
      }
    }
  });

}

function getTableData() {
  // Get the table by ID
  var table = document.querySelector('.eligbility-cat-table .tgroup');

  // Initialize two empty arrays for the columns
  var column1Data = [];
  var column2Data = [];

  // Loop through each row of the table
  for (var i = 1; i < table.rows.length; i++) {
    // Get the cells of the current row
    var cells = table.rows[i].cells;

    // Push the data of the columns into their respective arrays
    if (cells.length > 1) {
      column1Data.push(cells[0].textContent); // Column 1 data
      column2Data.push(cells[1].textContent); // Column 2 data
    }
  }

  // Return the arrays containing the column data
  return { col1: column1Data, col2: column2Data };
}