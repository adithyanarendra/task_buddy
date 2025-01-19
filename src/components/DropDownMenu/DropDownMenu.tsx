import React, { useEffect, useState } from 'react'

import './DropDownMenu.css'

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface DropDownMenuProps {
    id: string;
    title?: string
    theme: 'dark' | 'light';
    hasBorder?: boolean;
    initialSelected?: string;
    options: string[]
    onChoice: (selected: string) => void
}

const DropDownMenu = ({ id, theme, hasBorder = true, initialSelected, options, onChoice, title = 'Select' }: DropDownMenuProps) => {
    const [selectedOption, setSelectedOptions] = useState<string>(initialSelected ? initialSelected : '');
    const [isDDOpen, setIsDDOpen] = useState<boolean>(false)

    const handleCLickedOption = (option: string) => {
        setSelectedOptions(option)
        setIsDDOpen(false)
    }

    const handleDDOpen = () => {
        setIsDDOpen(!isDDOpen)
    }

    useEffect(() => {
        onChoice && onChoice(selectedOption)
    }, [selectedOption])


    return (
        <div className='DropDownContainer'>
            <div className={`DropDownMenuTitle ${hasBorder ? 'titleBorder' : ''}`} onClick={() => handleDDOpen()}>
                {title}
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
            {isDDOpen && (
                <div id={`Select_${theme}_${id}`} className={`DropDownMenuContainer ${theme} ${isDDOpen}`}>
                    <ul className='dropDownMenuListContainer'>
                        {options?.map((opt, index) => (
                            <li
                                className={`dropDownMenuListItem ${selectedOption === opt && 'selectedDropDownMenuListItem'}`}
                                key={index}
                                onClick={() => handleCLickedOption(opt)}
                            >
                                {opt}
                            </li>
                        ))}
                    </ul>
                </div>)
            }
        </div>
    )
}

export default DropDownMenu