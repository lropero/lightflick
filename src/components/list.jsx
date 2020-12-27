import React from 'react'
import styled from 'styled-components'
import { Table } from 'antd'
import { useHistory } from 'react-router-dom'

const Poster = styled.div`
  background-color: black;
  padding: 1px;
  width: 152px;
`

const columns = [
  {
    dataIndex: 'title',
    render: (text, record) => {
      const image = record.poster_path || record.backdrop_path
      return (
        <>
          {image && (
            <Poster>
              <img src={`http://image.tmdb.org/t/p/w185/${image}`} style={{ width: 150 }} />
            </Poster>
          )}
          <p>{text}</p>
        </>
      )
    },
    title: 'Title',
    width: 180
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

const List = ({ movies }) => {
  const history = useHistory()

  return (
    <>
      <style>
        {`
          .ant-table-cell {
            cursor: pointer;
            vertical-align: top;
          }
        `}
      </style>
      <Table
        columns={columns}
        dataSource={movies}
        onRow={record => ({
          onClick: () => history.push(`/movies/${record.id}`)
        })}
        pagination={false}
        rowKey='id'
        scroll={{ y: window.innerHeight - 188 }}
      />
    </>
  )
}

export default List
