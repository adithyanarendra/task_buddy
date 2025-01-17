import React from 'react'
import './TaskFilter.css'
import Button from '../Button/Button'

const TasksFilter = () => {
    return (
        <div className='TasksFilterContainer'>
            <div className="filters">
                <span className="filterTitle">Filter By</span>
                <span className="filterSelect"><select></select></span>
                <span className="filterSelect"><select></select></span>
            </div>
            <div className="actions">
                <div className="filterSearchContainer">
                    <input className='filterSearch' placeholder='Search' />
                </div>
                <div>
                    <Button variant='fill' buttonContent={'Add Task'} />
                </div>
            </div>
        </div>
    )
}

export default TasksFilter