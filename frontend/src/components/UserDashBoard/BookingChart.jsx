import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const BookingChart = () => {
    const [chartProps, setChartProps] = useState(
        {

            series: [44, 55, 41, 0],
            options: {
                chart: {
                    type: 'donut',
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