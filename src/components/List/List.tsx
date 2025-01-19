import React from 'react'
import ListCard from './ListCard'

const List = () => {
  return (
    <div className='ListWrapper'>
        <div className="listTableHeader"></div>
        <div className="listContainer">
            <ListCard />
        </div>
    </div>
  )
}

export default List