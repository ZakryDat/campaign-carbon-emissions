import './App.css';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { SunakData } from "../utils/SunakData";
import { StarmerData } from '../utils/StarmerData';
import CarbonPerDayBarChart from './carbonPerDayChart';

Chart.register(CategoryScale);

let sunakTotalCarbonEmissionsToDate = 0;
SunakData.forEach(entry => {
    for (let trip in entry.trips) {
        sunakTotalCarbonEmissionsToDate += entry.trips[trip];
    }
});
sunakTotalCarbonEmissionsToDate = Math.round(sunakTotalCarbonEmissionsToDate);

let starmerTotalCarbonEmissionsToDate = 0;
StarmerData.forEach(entry => {
    for (let trip in entry.trips) {
        starmerTotalCarbonEmissionsToDate += entry.trips[trip];
    }
});
starmerTotalCarbonEmissionsToDate = Math.round(starmerTotalCarbonEmissionsToDate);

function App() {
    return (
        <>
            <div className="container mx-auto md:1rem">
                <div className='flex justify-between md:px-6 px-2 font-semibold mb-4 pb-6 items-center gap-4'>
                    <h1>UKGE 2024</h1>
                    <h2 className='text-xl md:text-3xl text-pretty'>Campaign Carbon Emissions Tracker</h2>
                </div>
                <div className='flex flex-col md:flex-row font-semibold items-center justify-center mb-6 gap-8'>
                    <div className='flex flex-col text-3xl md:text-4xl bg-gray-400 dark:bg-gray-700 p-4 rounded-lg gap-2'>
                        <h2 className='text-2xl text-left'>Totals to date:</h2>
                        <div className='flex justify-between gap-2'>
                            <h2 className='text-left text-blue-500'>Sunak:</h2>
                            <h2 className='md:text-right'>{sunakTotalCarbonEmissionsToDate} kg CO2e</h2>
                        </div>
                        <div className='flex justify-between gap-2'>
                            <h2 className='text-left text-red-500'>Starmer:</h2>
                            <h2 className='md:text-right text-nowrap'>{starmerTotalCarbonEmissionsToDate} kg CO2e</h2>
                        </div>
                    </div>
                    <div className='flex flex-col text-2xl bg-blue-500 p-4 rounded-lg gap-2 text-balance md:text-right'>
                        <h2>That's a combined total of</h2>
                        <h2><span className='text-3xl md:text-4xl'>{sunakTotalCarbonEmissionsToDate + starmerTotalCarbonEmissionsToDate}</span> kg CO2e,</h2>
                        <h2>or <span className='text-3xl md:text-4xl'>{(sunakTotalCarbonEmissionsToDate + starmerTotalCarbonEmissionsToDate) / 0.04}</span> cups of tea ☕</h2>
                    </div>
                </div>
                <div>
                    <CarbonPerDayBarChart />
                </div>
                <div className='flex flex-col p-4 gap-2 text-justify'>
                    <div className='font-semibold italic'>
                        <p>"[...on Sunak's frequent flying] That's not going to make a massive difference when it comes to carbon emissions, let's be serious"</p>
                        <p> - Claire Coutinho, Energy Secretary</p>
                    </div>
                    <p className='font-semibold mt-2'>How are emissions calculated?</p>
                    <p>I have done the best I can to track both Sunak and Starmer's movements between campaign locations.</p>
                    <p>CO2e is equal to the duration of each trip, multiplied by the typical fuel consumption for the vehicle in question
                        and multiplied again by a literature-determined factor for converting fuel burn to carbon emissions (3.16 for aircraft).</p>
                    <p>For air travel, I have tried to identify flights in question on flightradar24. For travel overland, I have assumed (where
                        data is lacking) that if there is a direct train connection, then the candidates took the train, else they drove.</p>
                </div>
            </div>
        </>
    );
}

export default App;
