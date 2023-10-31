import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BookingChart = ({ userManager }) => {
  const [chartProps, setChartProps] = useState({
    series: [44, 55, 41, 0],
    options: {
      chart: {
        type: "donut",
      },
      title: {
        text: "Total History",
        align: "left",
      },
      labels: userManager ? ["Check in", "Checkout", "Booking", "Canceled"] : ["Renew", "Expired", "Active", "Not Extend"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <ReactApexChart
      options={chartProps.options}
      series={chartProps.series}
      type="donut"
    />
  );
};

export default BookingChart;
