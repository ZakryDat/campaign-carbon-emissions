import './App.css'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { SunakData } from "../utils/SunakData";
import { StarmerData } from '../utils/StarmerData';
import CarbonPerDayBarChart from './carbonPerDayChart';

Chart.register(CategoryScale);

let totalCarbonEmissionsToDate = 0;
SunakData.forEach(entry => {
    for (let trip in entry.trips) {
        totalCarbonEmissionsToDate += entry.trips[trip];
    }
});
totalCarbonEmissionsToDate = Math.round(totalCarbonEmissionsToDate)

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
            <div className='flex justify-between items-center py-4 px-6 font-semibold text-left'>
                <div className='p-4'>
                    <h1>Campaign</h1>
                    <h1>Carbon</h1>
                    <h1>Emissions</h1>
                </div>
                <div className='text-4xl bg-gray-700 p-4 rounded-lg'>
                    <h2 className='text-2xl pb-4'>Totals to date:</h2>
                    <h2 className='pb-4'><span className='text-blue-500'>Sunak</span>: {totalCarbonEmissionsToDate} kg CO2e, or {totalCarbonEmissionsToDate / 0.04} cups of tea ☕</h2>
                    <h2><span className='text-red-500'>Starmer</span>: {starmerTotalCarbonEmissionsToDate} kg CO2e or {starmerTotalCarbonEmissionsToDate / 0.04} cups of tea ☕</h2>
                </div>
            </div>
            <div>
                <CarbonPerDayBarChart />
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
