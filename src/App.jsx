import './App.css'
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
sunakTotalCarbonEmissionsToDate = Math.round(sunakTotalCarbonEmissionsToDate)

let starmerTotalCarbonEmissionsToDate = 0;
StarmerData.forEach(entry => {
    for (let trip in entry.trips) {
        starmerTotalCarbonEmissionsToDate += entry.trips[trip];
    }
});
starmerTotalCarbonEmissionsToDate = Math.round(starmerTotalCarbonEmissionsToDate)

function App() {

    return (
        <>
            <div className='flex justify-between px-6 font-semibold mb-4 pb-6'>
                <div className='flex items-baseline gap-8'>
                    <h1>UKGE 2024</h1>
                    <h2 className='text-3xl'>Campaign Carbon Emissions Tracker</h2>
                </div>
                <div>
                    <a href=''></a>
                </div>
            </div>
            <div className='flex font-semibold items-center justify-center mb-6 gap-8'>
                <div className='flex flex-col text-4xl bg-gray-400 dark:bg-gray-700 p-4 rounded-lg gap-2'>
                    <h2 className='text-2xl text-left'>Totals to date:</h2>
                    <div className='flex justify-between'>
                        <h2 className='text-left text-blue-500'>Sunak:</h2>
                        <h2 className='text-right'>{sunakTotalCarbonEmissionsToDate} kg CO2e</h2>
                    </div>
                    <h2><span className='text-red-500'>Starmer:</span> {starmerTotalCarbonEmissionsToDate} kg CO2e</h2>
                </div>
                <div className='flex flex-col text-2xl bg-blue-500 p-4 rounded-lg gap-2 text-right'>
                    <h2>That's a combined total of</h2>
                    <h2><span className='text-4xl'>{sunakTotalCarbonEmissionsToDate + starmerTotalCarbonEmissionsToDate}</span> kg CO2e,</h2>
                    <h2>or <span className='text-4xl'>{(sunakTotalCarbonEmissionsToDate + starmerTotalCarbonEmissionsToDate) / 0.04}</span> cups of tea ☕</h2>
                </div>
            </div>
            <div>
                <CarbonPerDayBarChart />
            </div>
            <div className='flex flex-col p-4 gap-2 text-left'>
                <p className='font-semibold'>How are emissions calculated?</p>
                <p>By following Sunak & Starmer in the news, I have done the best I can to track their travel between locations.</p>
                <p>C02e is equal to the duration of each trip, multiplied by the typical fuel consumption for the vehicle in question
                    and multiplied again by a literature-determined factor for converting fuel burn to carbon emissions (3.16 for aircraft).</p>
                <p>For air travel, I have tried to identify flights in question on flightradar24. For travel overland, I have assumed (where
                    data is lacking) that if there is a direct train connection, then the candidates took the train, else they drove.</p>
            </div>
        </>
    )
}

export default App
