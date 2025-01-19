import React from 'react'

const ListCard = () => {
    const listHeaders = [
        'Task Name',
        'Due On',
        'Task Status',
        'Task Category',
        ''
    ]
    return (
        <div className='ListCardContainer'>
            <div className="listHeader">
                {listHeaders?.map((header, index) => (
                    <span className="listHeaderItem" key={index}>{header}</span>
                ))}
            </div>
            <div className="addListItem"></div>
            <div className="listItem">
                <span></span>
            </div>
        </div>
    )
}

export default ListCard