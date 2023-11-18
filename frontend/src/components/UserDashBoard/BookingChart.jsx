import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BookingChart = ({ userManager, chartData }) => {
  const [chartProps, setChartProps] = useState({
    series: [
      chartData?.total_checkin,
      chartData?.total_checkout,
      chartData?.total_booking,
    ],
    options: {
      chart: {
        type: "donut",
      },
      title: {
        text: "Total History",
        align: "left",
      },
      labels: userManager
        ? ["Check in", "Checkout", "Booking"]
        : ["Renew", "Expired", "Active", "Suspended"],
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
