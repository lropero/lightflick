import React from 'react'
import styled from 'styled-components'
import { Table } from 'antd'

const Poster = styled.div`
  background-color: black;
  padding: 1px;
`

const columns = [
  {
    dataIndex: 'title',
    render: (text, record, index) => {
      const image = record.poster_path || record.backdrop_path
      return (
        <>
          {image && (
            <Poster>
              <img
                src={`http://image.tmdb.org/t/p/w185/${image}`}
                style={{ width: 120 }}
              />
            </Poster>
          )}
          <p>{text}</p>
        </>
      )
    },
    title: 'Title',
    width: 154
  },
  {
    dataIndex: 'overview',
    title: 'Overview'
  },
  {
    align: 'center',
    dataIndex: 'vote_average',
    title: 'Vote Average',
    width: 120
  }
]

const List = ({ movies }) => (
  <>
    <style>
      {`
        .ant-table-cell {
          vertical-align: top;
        }
      `}
    </style>
    <Table
      columns={columns}
      dataSource={movies}
      pagination={false}
      rowKey='id'
      scroll={{ y: window.innerHeight - 188 }}
    />
  </>
)

export default List
