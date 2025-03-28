document.getElementById('numTrees').addEventListener('input', function() {
    const numTrees = this.value;
    const treeData = document.getElementById('treeData');
    treeData.innerHTML = '';

    for (let i = 0; i < numTrees; i++) {
        treeData.innerHTML += `
            <fieldset>
                <legend>Tree ${i + 1}</legend>
                <label for="height1_${i}">Height (Month 1):</label>
                <input type="number" id="height1_${i}" name="height1_${i}" required>
                <label for="height2_${i}">Height (Month 2):</label>
                <input type="number" id="height2_${i}" name="height2_${i}" required>
                <label for="height3_${i}">Height (Month 3):</label>
                <input type="number" id="height3_${i}" name="height3_${i}" required>

                <label for="tilt1_${i}">Tilt (Month 1):</label>
                <input type="number" id="tilt1_${i}" name="tilt1_${i}" required>
                <label for="tilt2_${i}">Tilt (Month 2):</label>
                <input type="number" id="tilt2_${i}" name="tilt2_${i}" required>
                <label for="tilt3_${i}">Tilt (Month 3):</label>
                <input type="number" id="tilt3_${i}" name="tilt3_${i}" required>

                <label for="canopy1_${i}">Canopy Area (Month 1):</label>
                <input type="number" id="canopy1_${i}" name="canopy1_${i}" required>
                <label for="canopy2_${i}">Canopy Area (Month 2):</label>
                <input type="number" id="canopy2_${i}" name="canopy2_${i}" required>
                <label for="canopy3_${i}">Canopy Area (Month 3):</label>
                <input type="number" id="canopy3_${i}" name="canopy3_${i}" required>
            </fieldset>
        `;
    }
});

document.getElementById('treeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const numTrees = document.getElementById('numTrees').value;
    const data = [];

    for (let i = 0; i < numTrees; i++) {
        const tree = {
            height: [
                document.getElementById(`height1_${i}`).value,
                document.getElementById(`height2_${i}`).value,
                document.getElementById(`height3_${i}`).value
            ],
            tilt: [
                document.getElementById(`tilt1_${i}`).value,
                document.getElementById(`tilt2_${i}`).value,
                document.getElementById(`tilt3_${i}`).value
            ],
            canopy: [
                document.getElementById(`canopy1_${i}`).value,
                document.getElementById(`canopy2_${i}`).value,
                document.getElementById(`canopy3_${i}`).value
            ]
        };
        data.push(tree);
    }

    const results = assessHealth(data);
    displayResults(results);
});

function displayResults(results) {
    const chartContainer = document.getElementById('chartContainer');
    const warning = document.getElementById('warning');

    // Clear previous results
    chartContainer.innerHTML = '';
    warning.innerHTML = '';

    // Display chart (for example, using Chart.js)
    const ctx = document.createElement('canvas');
    chartContainer.appendChild(ctx);
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: results.labels,
            datasets: results.datasets
        },
        options: {
            title: {
                display: true,
                text: 'Tree Health Assessment'
            }
        }
    });

    // Display warnings
    results.warnings.forEach(warn => {
        const p = document.createElement('p');
        p.textContent = warn;
        warning.appendChild(p);
    });
}
