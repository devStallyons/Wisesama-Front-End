import React, { useEffect } from 'react'
import { registerables, Chart } from "chart.js";

import { Bar, Line, Pie, Doughnut, PolarArea, Radar, Scatter, Bubble } from "react-chartjs-2";
// import { useLocation } from 'react-router-dom';

Chart.register(...registerables);

export default function Charts({ widget, label, data: givenData, variant = "line", sortYear }) {
    const [newUsersArr, setData] = React.useState([]);

    // const { state } = useLocation();
    // const { widget, label, data: userData } = state;

    const currentYear = new Date().getFullYear();

    const filterData = () => {
        const year = sortYear === 0 ? 1 : 0

        if (!givenData.length) return;

        const filteredArray = givenData?.filter(obj => {
            const date = new Date(obj.date);
            return date.getFullYear() === currentYear - year;
        });

        // Create array of 12 items init'd at 0
        // increment the count of each month
        const monthCountArr = new Array(12).fill(0);
        filteredArray.forEach(({ date, price }) => monthCountArr[new Date(date).getMonth()] += widget === "totalDeposits" ? price : 1);

        setData(monthCountArr);

    };

    const LABLES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const softColors = [
        'rgb(66, 190, 254)',  // pale violet
        'rgb(248, 187, 208)',  // medium violet red
        'rgb(255, 153, 102)',  // light salmon
        'rgb(255, 224, 178)',  // navajo white
        'rgb(255, 255, 153)',  // lemon chiffon
        'rgb(204, 255, 204)',  // pale green
        'rgb(178, 255, 229)',  // light blue
        'rgb(153, 204, 255)',  // light steel blue
        'rgb(229, 229, 255)',  // lavender
        'rgb(204, 204, 255)',  // light slate blue
        'rgb(224, 224, 224)',  // light grey
        'rgb(250, 250, 210)'   // light goldenrod yellow
    ];

    const data = {
        labels: LABLES,
        datasets: [
            {
                label: label,
                backgroundColor: "rgb(41, 206, 254)",
                backgroundColor: variant === "polarArea" || variant === "doughnut" ?
                    softColors : "rgb(66, 190, 254)",
                data: newUsersArr,
            },
        ],
    };


    useEffect(() => {
        filterData();
    }, [givenData])

    useEffect(() => {
        filterData();
    }, [sortYear])

    return (
        <div>
            {
                // Doughnut, PolarArea, Radar, Scatter, Bubble 
                variant.toLowerCase() === "bar".toLowerCase() ?
                    <Bar data={data} /> :
                    variant.toLowerCase() === "pie".toLowerCase() ?
                        <Pie data={data} /> :
                        variant.toLowerCase() === "Doughnut".toLowerCase() ?
                            <Doughnut data={data} /> :
                            variant.toLowerCase() === "PolarArea".toLowerCase() ?
                                <PolarArea data={data} /> :
                                variant.toLowerCase() === "Radar".toLowerCase() ?
                                    <Radar data={data} /> :
                                    <Line data={data} />
            }
        </div>
    )
}
