import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const CustomerReservation = ({ userHotel, monthlyData }) => {
  const [chartProps, setChartProps] = useState({
    series: [
      {
        name: userHotel ? "Checkin Confirmed" : "Total Expired",
        type: "column",
        data: [23, 24, 40, 27, 13, 22, 37, 21, 44, 22, 30],
        color: "#fe9302",
      },
      {
        name: userHotel ? "Booking" : "Total Renew",
        type: "line",
        data: [27, 25, 22, 27, 13, 22, 37, 25, 26],
        color: "#5c44ab",
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        stacked: true,
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        width: [0, 5],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "70%",
        },
      },
      fill: {
        opacity: [1, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: [],
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        title: {
          text: userHotel ? "Checkin Confirmed" : "Total Expired",
        },
        min: 0,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + (userHotel ? " bookings" : " renew");
            }
            return y;
          },
        },
      },
    },
  });

  console.log("chartProps", chartProps);

  useEffect(() => {
    const sortedData = monthlyData.sort((a, b) => {
      const aDate = new Date(`${a.year}-${a.month_name}`);
      const bDate = new Date(`${b.year}-${b.month_name}`);
      return aDate - bDate;
    });
    const last12Data = sortedData.slice(-12);
    console.log("last 12 data", last12Data);
    const convertedDate = [
      ...new Set(
        last12Data.map((data) => {
          const formattedDate = new Date(
            `${data.year}-${data.month_name}-01`
          ).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          });
          return formattedDate;
        })
      ),
    ];
    // Extracting data for "Checkin Confirmed" and "Booking"
    const checkinData = last12Data.map((data) => data.total_checkin);
    const bookingData = last12Data.map((data) => data.total_booking);
    console.log("sorted", sortedData);
    // Update state
    setChartProps((prevProps) => ({
      ...prevProps,
      series: [
        {
          ...prevProps.series[0],
          data: [
            // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ...checkinData,
          ],
        },
        {
          ...prevProps.series[1],
          data: [
            // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ...bookingData,
          ],
        },
      ],
      options: {
        ...prevProps.options,
        labels: [
          // "01/01/2023",
          // "02/01/2023",
          // "03/01/2023",
          // "04/01/2023",
          // "05/01/2023",
          // "06/01/2023",
          // "07/01/2023",
          // "08/01/2023",
          // "09/01/2023",
          // "10/01/2023",
          ...convertedDate,
        ],
      },
    }));
  }, [monthlyData]);

  return (
    <ReactApexChart
      options={chartProps.options}
      series={chartProps.series}
      type="line"
      height={350}
    />
  );
};

export default CustomerReservation;
