// components/BarChart.js
import { Bar } from "react-chartjs-2";
export const BarChart = ({ chartData }) => {
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <Bar
                data={chartData}
                options={{
                    // responsive: true,
                    // maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: "Estimated carbon emissions per day on the campaign trail",
                            font: {
                                size: 20, // Increase the title font size
                                weight: 'bold', // Make the title bold
                            },

                        },
                        legend: {
                            display: false
                        },
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
                        },
                    },
                }}
            />
        </div>
    );
};
