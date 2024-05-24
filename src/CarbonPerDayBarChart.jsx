// components/BarChart.js
import { Bar } from "react-chartjs-2";
export const BarChart = ({ chartData }) => {
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>CO2e per day</h2>
            <Bar
                data={chartData}
                options={{
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
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'CO2e',
                            },
                        },
                    }
                }}
            />
        </div>
    );
};
