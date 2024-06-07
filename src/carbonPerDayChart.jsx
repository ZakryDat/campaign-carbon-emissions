import { Bar } from 'react-chartjs-2';
import { SunakData } from '../utils/SunakData';
import { StarmerData } from '../utils/StarmerData';

const prepareChartData = (starmerData, sunakData) => {
    const labels = starmerData.map(entry => entry.date);

    // Get all trip types
    const starmerTripTypes = [...new Set(starmerData.flatMap(entry => Object.keys(entry.trips)))];
    const sunakTripTypes = [...new Set(sunakData.flatMap(entry => Object.keys(entry.trips)))];
    const allTripTypes = [...new Set([...starmerTripTypes, ...sunakTripTypes])];

    const datasets = [];

    allTripTypes.forEach(tripType => {
        // Starmers data for this trip type
        datasets.push({
            label: `${tripType}`,
            data: labels.map(date => {
                const entry = starmerData.find(e => e.date === date);
                return entry && entry.trips[tripType] ? entry.trips[tripType] : 0;
            }),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            stack: 'Starmer'
        });

        // Sunaks data for this trip type
        datasets.push({
            label: `${tripType}`,
            data: labels.map(date => {
                const entry = sunakData.find(e => e.date === date);
                return entry && entry.trips[tripType] ? entry.trips[tripType] : 0;
            }),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            stack: 'Sunak'
        });
    });

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
                display: false
            },
            title: {
                display: true,
                text: "Estimated carbon emissions per day on the campaign trail",
                font: {
                    size: 20, // Increase the title font size
                    weight: 'bold', // Make the title bold
                },
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Day',
                    font: {
                        size: 18, // Increase the title font size
                        weight: 'bold', // Make the title bold
                    },
                },
                stacked: true
            },
            y: {
                title: {
                    display: true,
                    text: 'kg CO2e',
                    font: {
                        size: 18, // Increase the title font size
                        weight: 'bold', // Make the title bold
                    },
                },
                stacked: true
            }
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default CarbonPerDayBarChart;
