import { useState } from 'react'
import './App.css'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Data } from "../utils/Data";
import { BarChart } from "./CarbonPerDayBarChart";

Chart.register(CategoryScale);

const flights = Object.keys(Data.reduce((acc, day) => ({ ...acc, ...day.flights }), {}));

const totalCarbonEmissionsToDate = Data.reduce((total, day) => total + day.totalCarbonEmissions, 0);

// Prepare datasets for each flight
const datasets = flights.map((flight, index) => {
    const flightsData = Data.map(day => day.flights[flight] || 0);
    return {
        label: flight,
        data: flightsData,
        backgroundColor: `rgba(${index * 50}, ${255 - index * 50}, ${(index * 100) % 255}, 0.5)`,
        borderColor: `rgba(${index * 50}, ${255 - index * 50}, ${(index * 100) % 255}, 1)`,
        borderWidth: 1,
    };
});


function App() {
    const [chartData, setChartData] = useState({
        labels: Data.map(day => day.date),
        datasets: datasets
    });

    console.log(chartData)

    return (
        <>
            <div>
                <h1>Campaign Carbon Emissions</h1>
            </div>
            <div>
                <h2>Total to date: {totalCarbonEmissionsToDate} kg CO2e, or {totalCarbonEmissionsToDate / 0.04} cups of tea ☕</h2>
            </div>
            <div>
                <BarChart chartData={chartData} />
            </div>
        </>
    )
}

export default App
