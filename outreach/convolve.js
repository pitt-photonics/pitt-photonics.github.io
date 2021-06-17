// Create initial tetris blocks and matrices:
var tableData = Array.from(Array(16+1), () => new Array(16+1).fill(0));
var kernelData = Array.from(Array(3), () => new Array(3).fill(0));
var convData = Array.from(Array(16+1), () => new Array(16+1).fill(0));

var jblock = [[0, 0, 0],
			  [1, 0, 0],
			  [1, 1, 1]]

var lblock = [[0, 0, 0],
			  [0, 0, 2],
			  [2, 2, 2]]
			  
var oblock = [[0, 0, 0],
			  [0, 3, 3],
			  [0, 3, 3]]

var sblock = [[0, 0, 0],
			  [0, 4, 4],
			  [4, 4, 0]]
			  
var tblock = [[0, 0, 0],
			  [0, 5, 0],
			  [5, 5, 5]]

var zblock = [[0, 0, 0],
			  [6, 6, 0],
			  [0, 6, 6]]
		  

function createTable() {
  for(var i = 0; i < Math.floor(tableData.length/4); i++) {
	for(var j = 0; j < Math.floor(tableData[0].length/4); j++) {
		switch(Math.floor(Math.random() * 6)){
			case 0:
				var temp = jblock;
				break;
			case 1:
				var temp = lblock;
				break;
			case 2:
				var temp = oblock;
				break;
			case 3:
				var temp = sblock;
				break;
			case 4:
				var temp = tblock;
				break;
			case 5:
				var temp = zblock;
				break;
		}
	
		// Replace subarray with random tetris block
		switch(Math.floor(Math.random() * 2)){
			case 0:
				tableData[i*4+1].splice(j*4+1, 3, temp[0][0], temp[0][1], temp[0][2]);
				tableData[i*4+2].splice(j*4+1, 3, temp[1][0], temp[1][1], temp[1][2]);
				tableData[i*4+3].splice(j*4+1, 3, temp[2][0], temp[2][1], temp[2][2]);
				break;
			case 1:
				tableData[i*4+1].splice(j*4+1, 3, temp[0][0], temp[1][0], temp[2][0]);
				tableData[i*4+2].splice(j*4+1, 3, temp[0][1], temp[1][1], temp[2][1]);
				tableData[i*4+3].splice(j*4+1, 3, temp[0][2], temp[1][2], temp[2][2]);
				break;
		}

	}
  }

  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  var i = 0;
  tableData.forEach(function(rowData) {
	// Create row header for pixel labels
	var header_row = document.createElement('tr');
	
	// Add the pixel data from tableData array
	var row = document.createElement('tr');
	var j = 0;
	rowData.forEach(function(cellData) {
	
	  // Add header labels
	  if (i == 0) {
		if ( j == 0 ) {
			var empty_cell = document.createElement('td');
			empty_cell.appendChild(document.createTextNode(" "));
			header_row.appendChild(empty_cell); 
		}
		var header_cell = document.createElement('th');
		header_cell.setAttribute('class','header_cell');
		header_cell.appendChild(document.createTextNode(j));
		header_row.appendChild(header_cell);
	  }
	  
	  if ( j == 0 ) { 
		var header_cell = document.createElement('th');
		header_cell.setAttribute('class','header_cell');
		header_cell.appendChild(document.createTextNode(i));
		row.appendChild(header_cell);
	  }
	  
	  var cell = document.createElement('td');
	  
	  if(cellData == 0) { 
		cell.setAttribute('class', 'zero');
		cell.appendChild(document.createTextNode("0"));
	  } else { 
		switch(cellData) {
			case 1:
				cell.setAttribute('class', 'jblock');
				break;
			case 2:
				cell.setAttribute('class', 'lblock');
				break;
			case 3:
				cell.setAttribute('class', 'oblock');
				break;
			case 4:
				cell.setAttribute('class', 'sblock');
				break;
			case 5:
				cell.setAttribute('class', 'tblock');
				break;
			case 6:
				cell.setAttribute('class', 'zblock');
				break;						
		}
		cell.appendChild(document.createTextNode("1"));
		tableData[i][j] = 1;
	  }
	  row.appendChild(cell);
	  j++;
	});
	if (i == 0) { tableBody.appendChild(header_row); }
	i++;
	tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  
  var div = document.getElementById('tetris_table');
  div.replaceChild(table, div.childNodes[0]);		  
}


function readTable() {
	document.getElementById('info').innerHTML = "";
	var myTab = document.getElementById('kernel');

	// LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
	for (i = 0; i < myTab.rows.length; i++) {

		// GET THE CELLS COLLECTION OF THE CURRENT ROW.
		var objCells = myTab.rows.item(i).cells;

		// LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
		for (var j = 0; j < objCells.length; j++) {
			if (isNaN(parseFloat(objCells.item(j).childNodes[0].value))) {
				kernelData[i][j] = 0;
			} else {
				kernelData[i][j] = parseFloat(objCells.item(j).childNodes[0].value);
			}
		}
		convolve(tableData, kernelData);
	}
}

function convolve(imageArray, kernel) {
  // Compute convolution and update convData
  var maxVal = 0; var minVal = 0;
  for(var i = 1; i < imageArray.length - 1; i++) {
	var imageVector = imageArray[i];
	for(var j = 1; j < imageVector.length - 1; j++) {
	  // Kernel sum
	  convData[i][j] = 0;
	  for(var m = 0; m < kernel.length; m++) {
		for(var n = 0; n < kernel.length; n++) {
		  convData[i][j] = convData[i][j] + kernel[m][n] * imageArray[i - 1 + m][j - 1 + n];
		  //if(i == 2 && j == 1) {
		   //console.log("i = " + i + ", j = " + j + ", m = " + m + ", n = " + n + ", convData = " + kernel[m][n] + " * " + imageArray[i - 1 + m][j - 1 + n]);
		  //}
		}
	  }
	  if(convData[i][j] > maxVal) { maxVal = convData[i][j]; }
	  if(convData[i][j] < minVal) { minVal = convData[i][j]; }
	}
  }
  //console.log(maxVal + " " + minVal);
  // Update convolution table
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');
  var i = 0;
  convData.forEach(function(rowData) {
	// Create row header for pixel labels
	var header_row = document.createElement('tr');
	
	// Add the pixel data from kernelData array
	var row = document.createElement('tr');
	var j = 0;
	rowData.forEach(function(cellData) {
	
	  // Add header labels
	  if (i == 0) {
		if ( j == 0 ) {
			var empty_cell = document.createElement('td');
			empty_cell.appendChild(document.createTextNode(" "));
			header_row.appendChild(empty_cell); 
		}
		var header_cell = document.createElement('th');
		header_cell.setAttribute('class','header_cell');
		header_cell.appendChild(document.createTextNode(j));
		header_row.appendChild(header_cell);
	  }
	  
	  if ( j == 0 ) { 
		var header_cell = document.createElement('th');
		header_cell.setAttribute('class','header_cell');
		header_cell.appendChild(document.createTextNode(i));
		row.appendChild(header_cell);
	  }			
	
	  var cell = document.createElement('td');
	  if ( j == rowData.length - 1 || j == 0 || i == 0 || i == rowData.length - 1) {
		cell.appendChild(document.createTextNode(" "));
		cell.setAttribute('style', 'background-color: #000000;');
	  } else {
	  var hexVal = Math.round(255 * (cellData - minVal) / (maxVal - minVal));
	  if (hexVal == 255) {
		cell.setAttribute('style', 'background-color: #' + ("0" + hexVal.toString(16)).slice(-2).repeat(3) + "; color: #FF3213; font-weight: bold;");
	  } else if (hexVal >= 150) {
		cell.setAttribute('style', 'background-color: #' + ("0" + hexVal.toString(16)).slice(-2).repeat(3) + "; color: #222222;");
	  } else {
		cell.setAttribute('style', 'background-color: #' + ("0" + hexVal.toString(16)).slice(-2).repeat(3) + "; color: #EEEEEE;");
	  }
	  cell.appendChild(document.createTextNode(cellData));
	  }
	  row.appendChild(cell);
	  j++;
	});
	if (i == 0) { tableBody.appendChild(header_row); }
	tableBody.appendChild(row);
	i++;
  });
  table.appendChild(tableBody);
  
  var div = document.getElementById('conv_table');
  div.replaceChild(table, div.childNodes[0]);		  
}

function pageLoad() {
	createTable();
	convolve(tableData, kernelData);
}