import { useState } from 'react'
import './App.css'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Data } from "../utils/Data";
import { KeirData } from '../utils/KeirData';
import { BarChart } from "./CarbonPerDayBarChart";

Chart.register(CategoryScale);

const trips = Object.keys(Data.reduce((acc, day) => ({ ...acc, ...day.trips }), {}));
const keirtrips = Object.keys(KeirData.reduce((acc, day) => ({ ...acc, ...day.trips }), {}));

let totalCarbonEmissionsToDate = 0;
Data.forEach(entry => {
    for (let trip in entry.trips) {
        totalCarbonEmissionsToDate += entry.trips[trip];
    }
});
totalCarbonEmissionsToDate = Math.round(totalCarbonEmissionsToDate)

let keirtotalCarbonEmissionsToDate = 0;
KeirData.forEach(entry => {
    for (let trip in entry.trips) {
        keirtotalCarbonEmissionsToDate += entry.trips[trip];
    }
});
keirtotalCarbonEmissionsToDate = Math.round(keirtotalCarbonEmissionsToDate)

// Prepare datasets for each trip
const datasets = trips.map((trip, index) => {
    const tripsData = Data.map(day => day.trips[trip] || null);

    const hue = 220; // Hue for blue
    const lightness = 50 + (index * 5) % 20; // Vary lightness for different shades

    const backgroundColor = `hsl(${hue}, 100%, ${lightness + 20}%)`; // Slightly lighter shade
    const borderColor = `hsl(${hue}, 100%, ${lightness}%)`; // Original shade



    return {
        label: trip,
        data: tripsData,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        stack: 'Sunak'
    };
});

// Prepare datasets for each trip
const datasetsKeir = keirtrips.map((trip, index) => {
    const tripsData = KeirData.map(day => day.trips[trip] || null);

    const hue = 0; // Hue for red
    const lightness = 50 + (index * 5) % 20; // Vary lightness for different shades

    const backgroundColor = `hsl(${hue}, 100%, ${lightness + 20}%)`; // Slightly lighter shade
    const borderColor = `hsl(${hue}, 100%, ${lightness}%)`; // Original shade

    return {
        label: trip,
        data: tripsData,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        stack: 'Starmer'
    };
});

function App() {
    const [chartData, setChartData] = useState({
        labels: Data.map(day => day.date),
        datasets: [...datasets, ...datasetsKeir]
    });

    console.log(chartData)

    return (
        <>
            <div className='flex justify-between items-center py-4 px-6 font-semibold text-left'>
                <div className='p-4'>
                    <h1>Campaign</h1>
                    <h1>Carbon</h1>
                    <h1>Emissions</h1>
                </div>
                <div className='text-4xl bg-gray-700 p-4 rounded-lg'>
                    <h2 className='text-2xl pb-4'>Totals to date:</h2>
                    <h2 className='pb-4'><span className='text-blue-500'>Sunak</span>: {totalCarbonEmissionsToDate} kg CO2e, or {totalCarbonEmissionsToDate / 0.04} cups of tea ☕</h2>
                    <h2><span className='text-red-500'>Starmer</span>: {keirtotalCarbonEmissionsToDate} kg CO2e or {keirtotalCarbonEmissionsToDate / 0.04} cups of tea ☕</h2>
                </div>
            </div>
            <div>
                <BarChart chartData={chartData} />
            </div>
            <div className='p-4'>
                <p className='font-semibold'>How are emissions calculated?</p>
                <ul className='text-left pl-4 pt-2'>
                    <li className='p-2'>
                        By following Sunak & Starmer in the news, I have done the best I can to track their travel between locations.
                    </li>
                    <li className='p-2'>
                        C02e is equal to the duration of each trip, multiplied by the typical fuel consumption for the vehicle in question
                        and multiplied again by a literature-determined factor for converting fuel burn to carbon emissions (3.16 for aircraft).
                    </li>
                    <li className='p-2'>
                        For air travel, I have tried to identify flights in question on flightradar24. For travel overland, I have assumed (where
                        data is lacking) that if there is a direct train connection, then the candidates took the train, else they drove.
                    </li>
                </ul>
            </div>
        </>
    )
}

export default App
