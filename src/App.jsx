import { useState } from 'react'
import './App.css'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Data } from "../utils/Data";
import { BarChart } from "./CarbonPerDayBarChart";

Chart.register(CategoryScale);

function App() {
    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.day),
        datasets: [
            {
                label: "Carbon Emissions",
                data: Data.map((data) => data.totalCarbonEmissions),
                borderColor: "black",
                borderWidth: 2
            }
        ]
    });

    return (
        <>
            <div>
                <h1>Campaign Carbon Emissions</h1>
            </div>
            <div>
                <BarChart chartData={chartData} />
            </div>
        </>
    )
}

export default App
