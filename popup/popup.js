document.getElementById('fileInput').addEventListener('change', handleFileSelect);

// --- Drag and Drop ---
const dropArea = document.getElementById('dropArea');

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
});

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
  dropArea.classList.add('highlight');
}

function unhighlight(e) {
  dropArea.classList.remove('highlight');
}

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;

    if (files.length > 1) {
      document.getElementById('error').textContent = "Por favor, suelta solo un archivo CSV.";
      return;
  }
  handleFiles(files);
}
// --- Fin Drag and Drop ---

function handleFiles(files) {
  const file = files[0];
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = '';

    if (!file) {
        errorDiv.textContent = "No file selected.";
        return;
    }

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
        errorDiv.textContent = "Please select a CSV file.";
        return;
    }
      const reader = new FileReader();
        reader.onload = function(event) {
          const csvData = event.target.result;
          parseCSV(csvData);
        };

        reader.onerror = function() {
          errorDiv.textContent = "Error reading the file.";
        };

        reader.readAsText(file);
}

function handleFileSelect(event) {
  const files = event.target.files;
  handleFiles(files);
}
// --- Redimensionamiento manual ---
const resizeHandle = document.getElementById('resizeHandle');
let isResizing = false;
let initialWidth;
let initialHeight;
let initialMouseX;
let initialMouseY;

resizeHandle.addEventListener('mousedown', (e) => {
  isResizing = true;
  initialWidth = document.body.offsetWidth;
  initialHeight = document.body.offsetHeight;
  initialMouseX = e.clientX;
  initialMouseY = e.clientY;

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);

  e.preventDefault(); // Evita la selección de texto
});

function handleMouseMove(e) {
    if (!isResizing) return;

    const deltaX = e.clientX - initialMouseX;
    const deltaY = e.clientY - initialMouseY;

    let newWidth = initialWidth + deltaX;
    let newHeight = initialHeight + deltaY;

    // Limita el tamaño máximo al doble del tamaño original.
    newWidth = Math.min(newWidth, initialWidth * 2);
    newHeight = Math.min(newHeight, initialHeight * 2);

    //Limita el tamaño mínimo
    newWidth = Math.max(newWidth, 500); // Mismo que min-width en CSS
    newHeight = Math.max(newHeight, 400); // Mismo que min-height en CSS

    document.body.style.width = `${newWidth}px`;
    document.body.style.height = `${newHeight}px`;
}

function handleMouseUp() {
  isResizing = false;
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
}

// --- Fin Redimensionamiento ---
// --- Abrir en nueva pestaña ---

const openInNewTabButton = document.getElementById('openInNewTab');

openInNewTabButton.addEventListener('click', () => {
    const outputContent = document.getElementById('output').innerHTML;
    if (!outputContent) { //Evitamos que se abra si está vacío
        return;
    }
  const newTab = window.open();
  newTab.document.write(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>CSV Data</title>
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
      </style>
    </head>
    <body>
      ${outputContent}
    </body>
    </html>
  `);
  newTab.document.close();
});

// --- Fin Abrir en nueva pestaña ---

function parseCSV(csvData) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = ''; // Clear previous content

  try {
        const lines = csvData.split(/\r\n|\n|\r/);
        if (lines.length === 0 || (lines.length === 1 && lines[0].trim() === "")) {
            document.getElementById('error').textContent = "The CSV file is empty.";
             // Oculta el botón si no hay datos
            openInNewTabButton.style.display = 'none';
            return;
        }

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headerRow = document.createElement('tr');
        const headers = lines[0].split(',').map(header => header.trim());
        headers.forEach(headerText => {
          const th = document.createElement('th');
          th.textContent = headerText;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        for (let i = 1; i < lines.length; i++) {
            const rowData = lines[i].split(',');
            if (rowData.length === headers.length || rowData.length > 1) {

                const row = document.createElement('tr');
                for(let j=0; j< headers.length; j++)
                {
                    const td = document.createElement('td');
                    td.textContent = rowData[j] ? rowData[j].trim() : '';
                    row.appendChild(td);

                }

                tbody.appendChild(row);
              } else if (lines[i].trim() !== "")
              {
                console.warn(`Row ${i + 1} skipped:  incorrect number of columns. Expected ${headers.length}, got ${rowData.length}`);
              }

        }
        table.appendChild(tbody);
        outputDiv.appendChild(table);
         // Muestra el botón después de parsear
        openInNewTabButton.style.display = 'inline-block';

  } catch (error) {
    document.getElementById('error').textContent = "Error parsing CSV data: " + error.message;
    console.error("Error parsing CSV:", error);
     // Oculta el botón si hay un error
    openInNewTabButton.style.display = 'none';
  }
}