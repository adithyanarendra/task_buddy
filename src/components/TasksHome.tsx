import React, { useState } from 'react'
import Header from './Header/Header'
import TasksFilter from './TaskFilter/TasksFilter'

const TasksHome = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'board'>('list')

  const handleActiveTabChange = (tab: 'list' | 'board') => {
    setActiveTab(tab)
  }

  return (
    <div>
      <Header onSelectedTab={handleActiveTabChange} />
      <TasksFilter />
      {activeTab === 'list' && <div></div>}
      {activeTab === 'board' && <div></div>}
    </div>
  )
}

export default TasksHome