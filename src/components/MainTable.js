// src/components/MainTable.js
import React from 'react';
import { Table } from 'antd';

const MainTable = ({ data, onRowClick }) => {
  const columns = [
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: 'Total Jobs',
      dataIndex: 'total_jobs',
      key: 'total_jobs',
      sorter: (a, b) => a.total_jobs - b.total_jobs,
    },
    {
      title: 'Total Salary',
      dataIndex: 'total_salary',
      key: 'total_salary',
      sorter: (a, b) => a.total_salary - b.total_salary,
    },
    {
      title: 'Average Salary',
      dataIndex: 'average_salary',
      key: 'average_salary',
      sorter: (a, b) => a.average_salary - b.average_salary,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="year"
      onRow={(record) => ({
        onClick: () => {
          onRowClick(record);
        },
      })}
    />
  );
};

export default MainTable;
