import { useState } from 'react'
import './App.css'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Data } from "../utils/Data";
import { BarChart } from "./CarbonPerDayBarChart";

Chart.register(CategoryScale);

const trips = Object.keys(Data.reduce((acc, day) => ({ ...acc, ...day.trips }), {}));

let totalCarbonEmissionsToDate = 0;
Data.forEach(entry => {
    for (let trip in entry.trips) {
        totalCarbonEmissionsToDate += entry.trips[trip];
    }
});
totalCarbonEmissionsToDate = Math.round(totalCarbonEmissionsToDate)

// Prepare datasets for each flight
const datasets = trips.map((trip, index) => {
    const tripsData = Data.map(day => day.trips[trip] || 0);
    return {
        label: trip,
        data: tripsData,
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
                <h1>Sunak's Campaign Carbon Emissions</h1>
            </div>
            <div>
                <h2>Total to date: {totalCarbonEmissionsToDate} kg CO2e, or {totalCarbonEmissionsToDate / 0.04} cups of tea ☕</h2>
            </div>
            <div>
                <BarChart chartData={chartData} />
            </div>
            <div>
                <p>How are emissions calculated?</p>
                <p>By following Sunak's campaign in the news, I have done the best I can to track his travel between locations.
                    C02e is equal to the duration of each trip, multiplied by the typical fuel consumption for the vehicle in question
                    and multiplied again by a literature-determined factor for converting fuel burn to carbon emissions (3.16 for aircraft).</p>
            </div>
        </>
    )
}

export default App
