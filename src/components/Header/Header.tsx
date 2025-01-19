import React, { useState } from 'react'
import button from '../Button/Button'
import './Header.css'
import Button from '../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderAll, faClipboard, faList } from '@fortawesome/free-solid-svg-icons'

interface HeaderProps {
    onSelectedTab: (tab: 'list' | 'board') => void
}

const Header = ({ onSelectedTab }: HeaderProps) => {
    const [selectedTab, setSelectedTab] = useState<'list' | 'board'>('list')

    const handleTabChange = (tab: 'list' | 'board') => {
        setSelectedTab(tab)
        onSelectedTab(tab)
    }

    return (
        <div className='headerContainer'>
            <div className="headerItemContainer">
                <div className='appName'>
                    <span className='appIcon'><FontAwesomeIcon icon={faClipboard} /></span>
                    <span className='appNameText'>Task Buddy</span>
                </div>
                <div className="tabs">
                    <div className={`tab ${selectedTab === 'list' && 'selectedTab'}`} onClick={() => handleTabChange('list')}>
                        <div className='tabIcon'>
                            <FontAwesomeIcon icon={faList} />                        </div>
                        <div className="tabText">List</div>
                    </div>
                    <div className={`tab ${selectedTab === 'board' && 'selectedTab'}`} onClick={() => handleTabChange('board')}>
                        <div className='tabIcon'>
                            <FontAwesomeIcon icon={faBorderAll} />
                        </div>
                        <div className="tabText">Board</div>
                    </div>
                </div>
            </div>
            <div className="headerItemContainer">
                <div className='headerUserContainer'>
                    <span className='headerUserImg'></span>
                    <span className='headerUserName'>User Name</span>
                </div>
                <div className='logoutContainer'>
                    <Button variant='outline' buttonContent='Logout' />
                </div>
            </div>
        </div>
    )
}

export default Header