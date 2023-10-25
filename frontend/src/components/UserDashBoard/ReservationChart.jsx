import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ReservationChart = () => {
    const [chartProps, setChartProps] = useState(
        {
            series: [{
                name: "Desktops",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 23, 23 ,23],
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
                    text: 'Product Trends by Month',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
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