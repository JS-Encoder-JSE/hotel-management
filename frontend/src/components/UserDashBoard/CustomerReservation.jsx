import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts'

const CustomerReservation = () => {
    const [chartProps, setChartProps] = useState(
        {

            series: [{
                name: 'Booking Confirmed',
                type: 'column',
                data: [23, 24, 40, 27, 13, 22, 37, 21, 44, 22, 30],
                color: '#fe9302'
            }, {
                name: 'Booking Pending',
                type: 'line',
                data: [27, 25, 22, 27, 13, 22, 37, 25, 26],
                color: '#5c44ab'
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    stacked: true,
                    zoom: {
                        enabled: false
                    }
                },
                stroke: {
                    width: [0, 5],
                    curve: 'smooth'
                },
                plotOptions: {
                    bar: {
                        columnWidth: '70%'
                    }
                },
                fill: {
                    opacity: [1, 1],
                    gradient: {
                        inverseColors: false,
                        shade: 'light',
                        type: "vertical",
                        opacityFrom: 0.85,
                        opacityTo: 0.55,
                        stops: [0, 100, 100, 100]
                    }
                },
                labels: ['01/01/2023', '02/01/2023', '03/01/2023', '04/01/2023', '05/01/2023', '06/01/2023', '07/01/2023',
                    '08/01/2023', '09/01/2023', '10/01/2023', '11/01/2023'],
                markers: {
                    size: 0
                },
                xaxis: {
                    type: 'datetime'
                },
                yaxis: {
                    title: {
                        text: 'Booking Confirmed',
                    },
                    min: 0
                },
                tooltip: {
                    shared: true,
                    intersect: false,
                    y: {
                        formatter: function (y) {
                            if (typeof y !== "undefined") {
                                return y.toFixed(0) + " bookings";
                            }
                            return y;

                        }
                    }
                }
            },
        }
    )

    return (
        <ReactApexChart options={chartProps.options} series={chartProps.series} type="line" height={350} />
    );
};

export default CustomerReservation;