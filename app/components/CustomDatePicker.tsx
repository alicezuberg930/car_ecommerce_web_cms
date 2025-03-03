'use client'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css'

const CustomDatePicker: React.FC<{ name: string }> = ({ name }) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())

    const CustomInput = React.forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>(({ value, onClick }, ref) => {
        return (
            <input value={value} onClick={onClick} ref={ref} readOnly name={name}
                className='outline-none rounded-md border p-2 border-gray-300 focus:border-blue-500 w-full'
            />
        )
    })

    const getFormattedDate = (date: Date | null): string => {
        if (!date) return '01/01/1970'
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    return (
        <DatePicker dateFormat={"dd/MM/YYYY"} selected={startDate} onChange={(date) => setStartDate(date)} customInput={<CustomInput />} />
    )
}

export default CustomDatePicker