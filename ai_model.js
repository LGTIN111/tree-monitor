function assessHealth(data) {
    const labels = [];
    const healthData = {
        height: [],
        tilt: [],
        canopy: []
    };
    const warnings = [];

    data.forEach((tree, index) => {
        labels.push(`Tree ${index + 1}`);
        const heightDiff = Math.abs(tree.height[2] - tree.height[0]);
        const tiltDiff = Math.abs(tree.tilt[2] - tree.tilt[0]);
        const canopyDiff = Math.abs(tree.canopy[2] - tree.canopy[0]);

        healthData.height.push(heightDiff);
        healthData.tilt.push(tiltDiff);
        healthData.canopy.push(canopyDiff);

        if (tiltDiff > 10) {
            warnings.push(`Tree ${index + 1} has a high tilt difference and may fall.`);
        }
    });

    return {
        labels,
        datasets: [
            {
                label: 'Height Difference',
                data: healthData.height,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Tilt Difference',
                data: healthData.tilt,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Canopy Area Difference',
                data: healthData.canopy,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ],
        warnings
    };
}
