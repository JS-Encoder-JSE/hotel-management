import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ReservationChart = () => {

    // Here series data will be taken from props or context api which will be an Array.
    const [chartProps, setChartProps] = useState(
        {
            series: [{
                name: "Desktops",
                data: [10, 41, 35, 71, 49, 39, 53, 33 ,23],
                color: "#359b00",
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                title: {
                    text: 'Total Reservation',
                    align: 'left'
                },
                grid: {
                    row: {
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                }
            }
        }
    )

    return (
        <ReactApexChart options={chartProps.options} series={chartProps.series} type="line" height={350} />
    );
};

export default ReservationChart;