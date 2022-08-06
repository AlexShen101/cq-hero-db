import React from 'react';

const SectionHeader = (props) => {
    return (
        <div className="section_header">
            <span className="section_title">{props.text}</span>
        </div>
    )
}

export default SectionHeader