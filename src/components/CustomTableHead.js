import React from 'react'

const CustomTableHead = (props) => {

    return (
        <thead>
            <tr>
                {props.headers.map((header) => {
                    return <th key={header}>{header}</th>
                })}
            </tr>
        </thead>
    )
}

export default CustomTableHead