import React from 'react';

const sectionHeader = (props) => {
    return (
        <div class="section_header">
            <span className="section_title">{props.text}</span>
        </div>
    )
}

export default sectionHeader