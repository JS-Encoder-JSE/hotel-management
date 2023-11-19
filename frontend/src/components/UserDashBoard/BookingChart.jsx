import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BookingChart = ({ userManager, chartData }) => {
  const [chartProps, setChartProps] = useState({
    series: [
      !userManager && chartData?.total_active_lic,
      userManager ? chartData?.total_checkin : chartData?.total_renew_lic,
      userManager ? chartData?.total_checkout : chartData?.total_expired_lic,
      userManager ? chartData?.total_booking : chartData?.total_suspended_lic,
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
        : ["New", "Renew", "Expired", "Suspended"],
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
