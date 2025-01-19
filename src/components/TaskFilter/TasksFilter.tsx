import React, { useEffect, useState } from 'react'
import './TaskFilter.css'
import Button from '../Button/Button'
import Search from '../Search/Search'
import DropDownMenu from '../DropDownMenu/DropDownMenu'
import CreateTask from '../CreateTask/CreateTask'

interface TasksFilterProps {
    onFilter: (filters: {}) => void
}

const TasksFilter = ({ onFilter }: TasksFilterProps) => {
    const [filterChoices, setFilterChoices] = useState<object>({})

    const handleFilterSelection = (filter: string, val: string) => {
        setFilterChoices((prev) => ({ ...prev, [filter]: val }))
    }

    useEffect(() => {
        onFilter && onFilter(filterChoices)
    }, [])


    const [createTaskOpen, setCreateTaskOpen] = useState<boolean>(false)
    console.log("modal ... ", createTaskOpen);


    return (
        <div className='TasksFilterContainer'>
            <div className="filters">
                <span className="filterTitle">Filter By</span>
                <DropDownMenu id='filterByCategory' title='Category' theme='light' options={['WORK', 'PERSONAL']} onChoice={(val) => handleFilterSelection('category', val)} />
                <DropDownMenu id='filterByDueDate' title='Due Date' theme='light' options={['PAST', 'TODAY', 'FUTURE']} onChoice={(val) => handleFilterSelection('dueDate', val)} />
            </div>
            <div className="actions">
                <div className="filterSearchContainer">
                    <Search />
                </div>
                <div>
                    <Button variant='fill' buttonContent={'Add Task'} onClick={() => setCreateTaskOpen(true)} />
                </div>
            </div>
            <CreateTask openModal={createTaskOpen} closeModal={(val) => setCreateTaskOpen(val)} />
        </div>
    )
}

export default TasksFilter