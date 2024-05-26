import React, { useState, useEffect } from 'react';
import MainTable from './components/MainTable';
import AggregatedTable from './components/AggregatedTable';
import LineGraph from './components/LineGraph';
import Chat from './components/Chat';
import './App.css';
// import 'antd/dist/reset.css';

const App = () => {
  const [data, setData] = useState([]);
  const [selectedYearData, setSelectedYearData] = useState(null);

  useEffect(() => {
    fetch('./data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        const aggregatedData = data.reduce((acc, row) => {
          const year = row.work_year;
          if (!acc[year]) {
            acc[year] = {
              year,
              total_jobs: 0,
              total_salary: 0,
              count: 0,
            };
          }
          acc[year].total_jobs += 1;
          acc[year].total_salary += row.salary_in_usd;
          acc[year].count += 1;
          return acc;
        }, {});
        const aggregatedDataArray = Object.values(aggregatedData).map((item) => ({
          ...item,
          average_salary: item.total_salary / item.count,
        }));
        setData(aggregatedDataArray);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleRowClick = (row) => {
    const year = row.year;

    fetch("./data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const yearData = {
          year,
          job_titles: data
            .filter((item) => item.work_year === year)
            .reduce((acc, item) => {
              const existingJob = acc.find(
                (job) => job.title === item.job_title
              );
              if (existingJob) {
                existingJob.count++;
              } else {
                acc.push({ title: item.job_title, count: 1 });
              }
              return acc;
            }, []),
        };
        setSelectedYearData(yearData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div className="App">
      <h1>ML Engineer Salaries</h1>
      <MainTable data={data} onRowClick={handleRowClick} />
      {selectedYearData && <AggregatedTable yearData={selectedYearData} />}
      <LineGraph data={data} />
      <Chat />
    </div>
  );
};

export default App;
