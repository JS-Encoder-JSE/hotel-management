import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const BookingChart = () => {

    // Here series data will be taken from props or context api which will be an Array.
    const [chartProps, setChartProps] = useState(
        {

            series: [44, 55, 41, 0],
            options: {
                chart: {
                    type: 'donut',
                },
                title: {
                    text: 'Total Booking History',
                    align: 'left',
                },
                labels: ['Checkin', 'Checkout', 'Pending', 'Canceled'],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            }
        }
    )

    return (
        <ReactApexChart options={chartProps.options} series={chartProps.series} type="donut" />

    );
};

export default BookingChart;