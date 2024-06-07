import { Bar } from 'react-chartjs-2';
import { SunakData } from '../utils/SunakData';
import { StarmerData } from '../utils/StarmerData';

const prepareChartData = (starmerData, sunakData) => {
    const labels = [...new Set([...starmerData.map(entry => entry.date), ...sunakData.map(entry => entry.date)])];

    const datasets = [];

    const addData = (data, candidate, color) => {
        data.forEach(entry => {
            Object.entries(entry.trips).forEach(([tripName, tripValue]) => {
                if (tripValue !== 0) { // Only include non-zero values
                    const dataset = datasets.find(d => d.label === ` ${candidate}: ${tripName}`);
                    if (dataset) {
                        const index = labels.indexOf(entry.date);
                        dataset.data[index] = tripValue;
                    } else {
                        const newDataset = {
                            label: ` ${candidate}: ${tripName}`,
                            data: Array(labels.length).fill(null),
                            backgroundColor: color,
                            borderColor: color.replace('0.2', '1'),
                            borderWidth: 1,
                            stack: candidate,
                        };
                        newDataset.data[labels.indexOf(entry.date)] = tripValue;
                        datasets.push(newDataset);
                    }
                }
            });
        });
    };

    addData(starmerData, 'Starmer', 'rgba(255, 99, 132, 0.2)');
    addData(sunakData, 'Sunak', 'rgba(54, 162, 235, 0.2)');

    return {
        labels,
        datasets
    };
};

const CarbonPerDayBarChart = () => {
    const chartData = prepareChartData(StarmerData, SunakData);

    const options = {
        plugins: {
            legend: {
                display: false // Disable the legend
            },
            title: {
                display: true,
                text: "Estimated carbon emissions per day on the campaign trail",
                font: {
                    size: 20, // Increase the title font size
                    weight: 'bold', // Make the title bold
                },
            },
            tooltip: {
                mode: 'nearest'
            }
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'kg CO2e',
                    font: {
                        size: 18, // Increase the title font size
                        weight: 'bold', // Make the title bold
                    },
                },
            }
        }
    };

    return <Bar data={chartData} options={options} />;
};

export default CarbonPerDayBarChart;
