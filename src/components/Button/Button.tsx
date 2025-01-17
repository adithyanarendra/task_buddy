import React from 'react'

import './Button.css'

interface ButtonProps {
    variant: string
    buttonContent: any
    onClick: () => void
}

const Button = ({ variant, buttonContent, onClick }: ButtonProps) => {
    return (
        <button className={`buddyButtonClass ${variant}`} onClick={onClick}>
            {buttonContent}
        </button>
    )
}

export default Button