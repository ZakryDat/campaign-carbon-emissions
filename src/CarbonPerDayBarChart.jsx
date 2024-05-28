// components/BarChart.js
import { LogarithmicScale } from "chart.js";
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
                            text: "Estimated carbon emissions per day on the campaign trail"
                        },
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Day',
                            },
                            stacked: true
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'CO2e',
                            },
                            stacked: true
                        },
                    }
                }}
            />
        </div>
    );
};
