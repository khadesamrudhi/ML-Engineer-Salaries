import React from 'react';
import { Table } from 'antd';

const AggregatedTable = ({ yearData }) => {
  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
    },
  ];

  return (
    <div>
      <h2>Job Titles in {yearData.year}</h2>
      <Table
        columns={columns}
        dataSource={yearData.job_titles}
        rowKey="title"
      />
    </div>
  );
};

export default AggregatedTable;
