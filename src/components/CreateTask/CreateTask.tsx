import React, { useEffect, useState } from 'react'

import './CreateTask.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button/Button'
import TaskInput from '../TaskInput/TaskInput'
import CategorySelector from '../CategorySelector/CategorySelector'
import AttachmentUploader from '../AttachmentUploader/AttachementUploader'

interface CreateTaskProps {
    openModal: boolean
    closeModal: (bool: boolean) => void
}

const CreateTask = ({ openModal, closeModal }: CreateTaskProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        setIsOpen(openModal)
    }, [openModal])

    const handleClose = () => {
        closeModal(false)
        setIsOpen(false)
    }

    return (
        <>
            {isOpen &&
                <div className='CreateTaskModal'>
                    <div className="CreateTaskContainer">
                        <div className="CreateTaskHeader">
                            Create Task
                            <span onClick={() => handleClose()}><FontAwesomeIcon icon={faXmark} /></span>
                        </div>
                        <div className="CreateTaskContent">
                            <TaskInput label="Task title" placeholder="Task title" />
                            <TaskInput
                                label="Description"
                                placeholder="Description"
                                isTextArea
                                maxLength={300}
                            />
                            <div className="TaskControls">
                                <CategorySelector />
                                <TaskInput label="Due on*" placeholder="DD/MM/YYYY" isDate />
                            </div>
                            <AttachmentUploader />
                        </div>
                        <div className="CreateTaskFooter">
                            <Button variant='outline' buttonContent={'Cancel'} />
                            <Button variant='fill' buttonContent={'Create'} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default CreateTask