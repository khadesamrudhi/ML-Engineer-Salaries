import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.year),
    datasets: [
      {
        label: 'Number of Jobs',
        data: data.map((item) => item.total_jobs),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };

  return (
    <div>
      <h2>Job Trends (2020-2024)</h2>
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;
